'use client';
import { initialBoard } from '@/lib/game-logics/initialBoard';
import { ChessTileWithColor } from '@/lib/game-logics/types';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';

export const ChessBoard = () => {
  const [board, setBoard] = useState<ChessTileWithColor[][]>(initialBoard);

  return (
    <div className="grid grid-cols-8 grid-flow-row border-2 border-black w-[800px] h-[800px]">
      {board.map((row) => {
        return row.map((tile) => (
          <div
            key={tile.id}
            className={cn(
              'border-2 border-black w-[100px] h-[100px] bg-opacity-70',
              tile.color && `bg-${tile.color}`
            )}
          >
            {tile.chessPiece && (
              <Image
                src={tile.chessPiece.getImageUrl()}
                width={100}
                height={100}
                alt="king"
                className=" object-cover"
              />
            )}
          </div>
        ));
      })}
    </div>
  );
};
