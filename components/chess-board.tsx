'use client';
import { King } from '@/lib/game-logics';
import { ChessTile } from '@/lib/game-logics/types';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React, { useState } from 'react';

interface ChessBoardProps {
  initialBoard: ChessTile[][];
}

export const ChessBoard = ({ initialBoard }: ChessBoardProps) => {
  const [board, setBoard] = useState<ChessTile[][]>(
    initialBoard.map((item) =>
      item.map((tile) => {
        if (tile.id == '7 4') {
          return { ...tile, chessPiece: new King('white', { x: 7, y: 4 }) };
        } else if (tile.id == '0 4') {
          return { ...tile, chessPiece: new King('black', { x: 0, y: 4 }) };
        } else {
          return tile;
        }
      })
    )
  );

  return (
    <div className="grid grid-cols-8 grid-flow-row border-2 border-black w-[800px] h-[800px]">
      {board.map((row, rowIdx) => {
        const isOdd = (rowIdx + 1) % 2 !== 0;
        return row.map((tile, tileIdx) => (
          <div
            key={tile.id}
            className={cn('border-2 border-black w-[100px] h-[100px]', {
              'bg-black text-white':
                (isOdd && tileIdx % 2 == 0) || (!isOdd && tileIdx % 2 !== 0),
              'bg-white text-black': !isOdd && tileIdx % 2 !== 0,
            })}
          >
            {tile.id}
            {tile.chessPiece && (
              <Image
                src={tile.chessPiece.getImageUrl()}
                width={100}
                height={100}
                alt="king"
              />
            )}
          </div>
        ));
      })}
    </div>
  );
};
