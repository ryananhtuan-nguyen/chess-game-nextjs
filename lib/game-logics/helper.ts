import { Bishop, ChessPiece, King, Knight, Pawn, Queen, Rook } from '.';
import { ChessTileWithColor } from './types';

export const insertPiece = (tile: ChessTileWithColor) => {
  const [currentX, currentY] = tile.id.split(' ').map(Number);
  const color = currentX < 2 ? 'black' : 'white';

  //positions of each

  const rookPos = [
    [0, 0],
    [0, 7],
    [7, 0],
    [7, 7],
  ];
  const knightPos = [
    [0, 1],
    [0, 6],
    [7, 1],
    [7, 6],
  ];
  const bishopPos = [
    [0, 2],
    [0, 5],
    [7, 2],
    [7, 5],
  ];
  const queenPos = [
    [0, 3],
    [7, 3],
  ];
  const kingPos = [
    [0, 4],
    [7, 4],
  ];
  const pawnPos = [] as number[][];
  for (let i = 0; i < 8; i++) {
    pawnPos.push([1, i]);
    pawnPos.push([6, i]);
  }

  //Rook pos
  const isRook = checkCurrent([currentX, currentY], rookPos);
  if (isRook)
    return {
      ...tile,
      chessPiece: new Rook(color, { x: currentX, y: currentY }),
    };

  //Knight pos
  const isKnight = checkCurrent([currentX, currentY], knightPos);
  if (isKnight)
    return {
      ...tile,
      chessPiece: new Knight(color, { x: currentX, y: currentY }),
    };

  //Bishop pos
  const isBishop = checkCurrent([currentX, currentY], bishopPos);
  if (isBishop)
    return {
      ...tile,
      chessPiece: new Bishop(color, { x: currentX, y: currentY }),
    };

  //King pos
  const isKing = checkCurrent([currentX, currentY], kingPos);
  if (isKing)
    return {
      ...tile,
      chessPiece: new King(color, { x: currentX, y: currentY }),
    };

  //Queen pos
  const isQueen = checkCurrent([currentX, currentY], queenPos);
  if (isQueen)
    return {
      ...tile,
      chessPiece: new Queen(color, { x: currentX, y: currentY }),
    };

  //Pawn pos
  const isPawn = checkCurrent([currentX, currentY], pawnPos);
  if (isPawn)
    return {
      ...tile,
      chessPiece: new Pawn(color, { x: currentX, y: currentY }),
    };
  //default
  return tile;
};

function checkCurrent(
  [x, y]: number[],
  currentCheck: number[][]
): number[] | undefined {
  return currentCheck.find((item) => item[0] == x && item[1] == y);
}

export const currentAvailable = (id: string, availableMoves: number[][]) => {
  let [x, y] = id.split(' ').map(Number);
  availableMoves.forEach(([moveX, moveY]) => {
    if (moveX == x && moveY == y) return true;
  });

  return false;
};
