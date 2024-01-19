import { insertPiece } from './helper';
import { ChessColor, ChessTile, ChessTileWithColor } from './types';

const createBoard = (): ChessTile[][] => {
  const rows = Array.from({ length: 8 }).fill('');

  const board: ChessTile[][] = [];

  rows.forEach((_, rowIdx) => {
    const col = Array.from({ length: 8 }).fill({
      id: `${rowIdx} `,
      chessPiece: null,
    }) as ChessTile[];
    board.push(col.map((item, colIdx) => ({ ...item, id: item.id + colIdx })));
  });

  return board;
};

const newBoard = createBoard();

const boardWithColor: ChessTileWithColor[][] = newBoard.map((row, rowIdx) => {
  if (rowIdx % 2 == 0) {
    return row.map((tile, colIdx) => ({
      ...tile,
      color: colIdx % 2 == 0 ? 'white' : 'black',
    }));
  } else {
    return row.map((tile, colIdx) => ({
      ...tile,
      color: colIdx % 2 == 0 ? 'black' : 'white',
    }));
  }
});

export const initialBoard = boardWithColor.map((item) =>
  item.map((tile) => insertPiece(tile))
);
