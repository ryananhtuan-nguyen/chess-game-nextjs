'use client';
import { useAppState } from '@/hooks/state-provider';
import { ChessColor } from '@/lib/game-logics/types';
import { PawnEvolveOptions, cn } from '@/lib/utils';
import {
  DragDropContext,
  DragStart,
  Draggable,
  DropResult,
  Droppable,
} from '@hello-pangea/dnd';
import { DialogContent } from '@radix-ui/react-dialog';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { Button } from './ui/button';
import { Dialog } from './ui/dialog';

export const ChessBoard = () => {
  const { dispatch, state: board } = useAppState();
  const [gameOver, setGameOver] = useState(false);
  const [pawnEvolving, setPawnEvolving] = useState(false);
  //ref
  const turn = useRef<ChessColor>('white');
  const lastMove = useRef<string>('');
  //Handle drag start: high-light all possible moves
  const handleDragStart = (e: DragStart) => {
    const { draggableId } = e;
    const [x, y] = draggableId.split(' ').map(Number);
    const currentPiece = board[x][y].chessPiece;
    if (!currentPiece) return;
    if (currentPiece.getColor() !== turn.current) return;
    dispatch({
      type: 'check_valid_moves',
      payload: { currentPiece, currentBoard: board },
    });
  };

  //Handle drag end:

  const handleDragEnd = (e: DropResult) => {
    const { draggableId, destination } = e;
    //no destination
    if (!destination || !destination.droppableId) return;

    const [x, y] = draggableId.split(' ').map(Number);
    const currentPiece = board[x][y].chessPiece;
    const destinationId = destination.droppableId;
    const [destX, destY] = destinationId.split(' ').map(Number);

    //no current chess piece
    if (!currentPiece || currentPiece.getColor() !== turn.current) return;

    //same destination
    if (draggableId == destination.droppableId) return;

    //check valid Moves
    const possibleMoves = currentPiece.validMoves(board);
    const isValidMove = possibleMoves.some(
      (item) => item[0] == destX && item[1] == destY
    );

    if (!isValidMove) return;

    //if the move is valid

    const destinationPiece = board[destX][destY].chessPiece;
    if (destinationPiece && destinationPiece.getRole() == 'king') {
      setGameOver(true);
    }

    //check pawn evolving
    let isPawnEvolving = false;
    if (currentPiece.getRole() == 'pawn' && (destX == 0 || destX == 7)) {
      isPawnEvolving = true;
      lastMove.current = destinationId;
      setPawnEvolving(isPawnEvolving);
    }
    //game continue
    dispatch({
      type: 'move_chesspiece',
      payload: {
        currentPiece,
        currentTileId: draggableId,
        destinationId,
        currentBoard: board,
      },
    });

    //pawn is not evolving or done evolving
    if (!isPawnEvolving) {
      turn.current = turn.current === 'white' ? 'black' : 'white';
    }
  };

  const handleClick = (item: string) => {
    dispatch({
      type: 'pawn_evolve',
      payload: {
        newRole: item,
        currentBoard: board,
        currentId: lastMove.current,
        color: turn.current,
      },
    });
    turn.current = turn.current == 'black' ? 'white' : 'black';
    lastMove.current = '';
    setPawnEvolving(false);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      {!gameOver && (
        <div className="hidden sm:flex justify-center items-center min-h-[90vh]">
          <div className="sm:grid grid-cols-8 grid-flow-row border-2 border-black">
            <React.Fragment>
              {board.map((row) => {
                return row.map((tile) => (
                  <Droppable droppableId={tile.id} key={tile.id}>
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={cn(
                          'border-2 border-black w-[100px] h-[100px]',
                          'w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20',
                          {
                            'bg-black bg-opacity-40': tile.color == 'black',
                            'bg-white': tile.color == 'white',
                            'bg-green-500 bg-opacity-80':
                              tile.isCurrentPossible,
                          }
                        )}
                      >
                        {tile.chessPiece !== null && (
                          <Draggable draggableId={tile.id} index={0}>
                            {(provided1) => (
                              <>
                                <Image
                                  src={
                                    tile.chessPiece
                                      ? tile.chessPiece.getImageUrl()
                                      : ''
                                  }
                                  width={100}
                                  height={100}
                                  alt="king"
                                  className=" object-cover rounded-lg"
                                  ref={provided1.innerRef}
                                  {...provided1.draggableProps}
                                  {...provided1.dragHandleProps}
                                />
                                <Dialog open={pawnEvolving}>
                                  <div className="absolute top-[220px] left-[150px]">
                                    <DialogContent>
                                      <div className="flex flex-col justify-center items-center gap-4">
                                        <h3>Choose from</h3>
                                        {PawnEvolveOptions.map((item) => (
                                          <Button
                                            key={item}
                                            onClick={() => handleClick(item)}
                                          >
                                            {item.toUpperCase()}
                                          </Button>
                                        ))}
                                      </div>
                                    </DialogContent>
                                  </div>
                                </Dialog>
                              </>
                            )}
                          </Draggable>
                        )}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                ));
              })}
            </React.Fragment>
          </div>
        </div>
      )}
      {gameOver && (
        <div className="flex items-center justify-center">
          <h1 className="text-4xl text-center">GAME OVER!</h1>
        </div>
      )}
    </DragDropContext>
  );
};
