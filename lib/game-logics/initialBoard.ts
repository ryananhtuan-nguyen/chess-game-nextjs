import { ChessTile } from './types';

const createBoard = (): ChessTile[][] => {
  const rows = Array.from({ length: 8 }).fill('');

  const board: ChessTile[][] = [];

  rows.forEach((_, rowIdx) => {
    const col = Array.from({ length: 8 }).fill({
      id: `${rowIdx}`,
      chessPiece: null,
    }) as ChessTile[];
    board.push(col.map((item, colIdx) => ({ ...item, id: item.id + colIdx })));
  });

  return board;
};

export const initialBoard = createBoard();
