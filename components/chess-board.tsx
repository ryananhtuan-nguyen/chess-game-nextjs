'use client';
import { initialBoard } from '@/lib/game-logics/initialBoard';
import { ChessTileWithColor } from '@/lib/game-logics/types';
import { cn } from '@/lib/utils';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import Image from 'next/image';
import React from 'react';
import { useState } from 'react';

interface BoardUI extends ChessTileWithColor {
  isCurrentPossible: boolean;
}

export const ChessBoard = () => {
  const [board, setBoard] = useState<BoardUI[][]>(
    initialBoard.map((item) =>
      item.map((tile) => ({ ...tile, isCurrentPossible: false }))
    )
  );

  const handleClick = (tile: ChessTileWithColor) => {
    if (!tile.chessPiece) return;
    const currentPiece = tile.chessPiece;
    const [x, y] = tile.id.split(' ').map(Number);
    const possibleMoves = currentPiece.validMoves({ x, y }, board);
    console.log(possibleMoves);
    const newBoard = board.map((item) =>
      item.map((tile) => {
        if (currentAvailable(tile.id, possibleMoves)) {
          return { ...tile, isCurrentPossible: true };
        }
        return { ...tile, isCurrentPossible: false };
      })
    );
    // console.log(
    //   board[5][0],
    //   board[5][1],
    //   board[5][2],
    //   board[5][3],
    //   board[5][4]
    // );
    setBoard(newBoard);
  };

  return (
    <DragDropContext onDragEnd={(e) => console.log(e)}>
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
                            onClick={() => handleClick(tile)}
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
