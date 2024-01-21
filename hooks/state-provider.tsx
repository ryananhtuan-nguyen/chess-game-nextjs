'use client';
import { ChessPiece } from '@/lib/game-logics/classes';
import { initialBoard } from '@/lib/game-logics/initialBoard';
import { ChessTileWithColor } from '@/lib/game-logics/types';
import { Dispatch, createContext, useContext, useReducer } from 'react';

export interface BoardUI extends ChessTileWithColor {
  isCurrentPossible: boolean;
}

type Action =
  | {
      type: 'check_valid_moves';
      payload: { currentPiece: ChessPiece; currentBoard: BoardUI[][] };
    }
  | {
      type: 'move_chesspiece';
      payload: {
        currentPiece: ChessPiece;
        currentTileId: string;
        destinationId: string;
        currentBoard: BoardUI[][];
      };
    };

const currentAvailable = (id: string, availableMoves: number[][]) => {
  let [x, y] = id.split(' ').map(Number);
  const current = availableMoves.find(([moveX, moveY]) => {
    if (moveX == x && moveY == y) return true;
  });
  if (current) return true;

  return false;
};

const initialState: BoardUI[][] = initialBoard.map((item) =>
  item.map((tile) => ({ ...tile, isCurrentPossible: false }))
);

const appReducer = (state: BoardUI[][] = initialState, action: Action) => {
  switch (action.type) {
    case 'check_valid_moves': {
      const possibleMoves = action.payload.currentPiece.validMoves(state);

      return state.map((item) =>
        item.map((tile) => {
          if (currentAvailable(tile.id, possibleMoves)) {
            return { ...tile, isCurrentPossible: true };
          }
          return { ...tile, isCurrentPossible: false };
        })
      );
    }
    case 'move_chesspiece': {
      //get new id
      const [newX, newY] = action.payload.destinationId.split(' ').map(Number);
      //change piece coord
      action.payload.currentPiece.setCoordinate(
        { x: newX, y: newY },
        action.payload.currentBoard
      );
      //new state
      return state.map((item) =>
        item.map((tile) => {
          //set source chesspiece to null
          if (tile.id == action.payload.currentTileId) {
            return { ...tile, chessPiece: null, isCurrentPossible: false };
          }
          // move chess piece to new tile
          if (tile.id == action.payload.destinationId) {
            return {
              ...tile,
              chessPiece: action.payload.currentPiece,
              isCurrentPossible: false,
            };
          }
          //not moving, but un-highlight tile
          return { ...tile, isCurrentPossible: false };
        })
      );
    }
  }
};

const AppStateContext = createContext<
  { state: BoardUI[][]; dispatch: Dispatch<Action> } | undefined
>(undefined);

interface AppStateProviderProps {
  children: React.ReactNode;
}

const AppStateProvider: React.FC<AppStateProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateProvider;

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }

  return context;
};
