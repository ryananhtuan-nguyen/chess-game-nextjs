'use client';
import { useAppState } from '@/hooks/state-provider';
import { cn } from '@/lib/utils';
import {
  DragDropContext,
  DragStart,
  Draggable,
  DropResult,
  Droppable,
} from '@hello-pangea/dnd';
import Image from 'next/image';
import React from 'react';

export const ChessBoard = () => {
  const { dispatch, state: board } = useAppState();

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
    console.log('check current piece');
    if (!currentPiece) return;

    //same destination
    console.log('check same place');
    if (draggableId == destination.droppableId) return;

    //check valid Moves
    const possibleMoves = currentPiece.validMoves(board);
    console.log('🚀 ~ handleDragEnd ~ possibleMoves:', possibleMoves);
    const isValidMove = possibleMoves.some(
      (item) => item[0] == destX && item[1] == destY
    );
    console.log('🚀 ~ handleDragEnd ~ isValidMove:', isValidMove);

    if (!isValidMove) return;

    //if the move is valid
    console.log('Valid move');
    dispatch({
      type: 'move_chesspiece',
      payload: {
        currentPiece,
        currentTileId: draggableId,
        destinationId,
        currentBoard: board,
      },
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <div className="grid grid-cols-8 grid-flow-row border-2 border-black w-[800px] h-[800px]">
        <React.Fragment>
          {board.map((row) => {
            return row.map((tile) => (
              <Droppable droppableId={tile.id} key={tile.id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={cn('border-2 border-black w-[100px] h-[100px]', {
                      'bg-black bg-opacity-40': tile.color == 'black',
                      'bg-white': tile.color == 'white',
                      'bg-green-500 bg-opacity-80': tile.isCurrentPossible,
                    })}
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
    </DragDropContext>
  );
};

const currentAvailable = (id: string, availableMoves: number[][]) => {
  let [x, y] = id.split(' ').map(Number);
  const current = availableMoves.find(([moveX, moveY]) => {
    if (moveX == x && moveY == y) return true;
  });
  if (current) return true;

  return false;
};
