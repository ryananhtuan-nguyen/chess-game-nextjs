'use client';
import { useAppState } from '@/hooks/state-provider';
import { ChessColor } from '@/lib/game-logics/types';
import { cn } from '@/lib/utils';
import {
  DragDropContext,
  DragStart,
  Draggable,
  DropResult,
  Droppable,
} from '@hello-pangea/dnd';
import Image from 'next/image';
import React, { useRef, useState } from 'react';

export const ChessBoard = () => {
  const { dispatch, state: board } = useAppState();
  const turn = useRef<ChessColor>('white');
  const [gameOver, setGameOver] = useState(false);

  //Handle drag start: high-light all possible moves
  const handleDragStart = (e: DragStart) => {
    const { draggableId } = e;
    const [x, y] = draggableId.split(' ').map(Number);
    const currentPiece = board[x][y].chessPiece;
    if (!currentPiece) return;
    dispatch({
      type: 'check_valid_moves',
      payload: { currentPiece, currentBoard: board },
    });
  };

  //Handle drag end:

  const handleDragEnd = (e: DropResult) => {
    const { draggableId, destination } = e;
    //no destination
    console.log('Check destination');
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
    console.log('Valid move');
    const destinationPiece = board[destX][destY].chessPiece;
    if (destinationPiece && destinationPiece.getRole() == 'king') {
      setGameOver(true);
    }
    console.log('continue');
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
    turn.current = turn.current === 'white' ? 'black' : 'white';
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      {!gameOver && (
        <div className="grid grid-cols-8 grid-flow-row border-2 border-black w-[800px] h-[800px]">
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
                        {
                          'bg-black bg-opacity-40': tile.color == 'black',
                          'bg-white': tile.color == 'white',
                          'bg-green-500 bg-opacity-80': tile.isCurrentPossible,
                        }
                      )}
                    >
                      {tile.chessPiece && (
                        <Draggable draggableId={tile.id} index={0}>
                          {(provided1) => (
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
      )}
      {gameOver && (
        <div className="flex items-center justify-center">
          <h1 className="text-4xl text-center">GAME OVER!</h1>
        </div>
      )}
    </DragDropContext>
  );
};
