import { Bishop } from './classes/bishop';
import { King } from './classes/king';
import { Knight } from './classes/knight';
import { Pawn } from './classes/pawn';
import { Queen } from './classes/queen';
import { Rook } from './classes/rook';
import { ChessTileWithColor } from './types';
import type { ChessColor, ChessTile, Point } from './types';

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

export function checkPieceMoveAvailable(
  lineMove: number[][],
  currentBoard: ChessTile[][],
  currentColor: ChessColor
) {
  //filter out of bound tiles
  console.log('CURRENT MOVES', lineMove);

  const tilesInBoard = lineMove.filter(([newX, newY]) => {
    return (
      newX >= 0 &&
      newY >= 0 &&
      newX < currentBoard.length &&
      newY < currentBoard[0].length
    );
  });

  //preparing result
  let result = [] as number[][];

  //checking conditions
  for (let i = 0; i < tilesInBoard.length; i++) {
    const [currentX, currentY] = tilesInBoard[i];
    const currentTile = currentBoard[currentX][currentY];

    //empty tile
    if (!currentTile.chessPiece) {
      result.push(tilesInBoard[i]);

      //enemies tile
    } else if (
      currentTile.chessPiece &&
      currentTile.chessPiece.getColor() !== currentColor
    ) {
      console.log('Shit happened');
      result.push(tilesInBoard[i]);
      break;

      //same color piece
    } else if (
      currentTile.chessPiece &&
      currentTile.chessPiece.getColor() == currentColor
    ) {
      console.log('Shit 2 happened');
      break;
    }
  }

  return result;
}

export function checkPawnMove(
  currentColor: ChessColor,
  currentCord: Point,
  currentBoard: ChessTile[][]
) {
  const { x, y } = currentCord;
  const result = [] as number[][];

  switch (currentColor) {
    case 'white': {
      if (x - 1 < 0) {
        return [];
      }
      const nextMove = currentBoard[x - 1][y];
      if (nextMove && !nextMove.chessPiece && x - 1 >= 0) {
        result.push([x - 1, y]);
      }

      //check for enemies
      const leftTop = currentBoard[x - 1][y - 1];
      const rightTop = currentBoard[x - 1][y + 1];

      if (
        leftTop &&
        leftTop.chessPiece &&
        leftTop.chessPiece.getColor() !== currentColor
      ) {
        result.push([x - 1, y - 1]);
      }
      if (
        rightTop &&
        rightTop.chessPiece &&
        rightTop.chessPiece.getColor() !== currentColor
      ) {
        result.push([x - 1, y + 1]);
      }

      //check for starting point
      if (x == 6 && !currentBoard[x - 2][y].chessPiece) {
        result.push([x - 2, y]);
      }

      break;
    }
    case 'black': {
      if (x + 1 > 7) {
        return [];
      }
      const nextMove = currentBoard[x + 1][y];
      if (nextMove && !nextMove.chessPiece && x + 1 < 8) {
        result.push([x + 1, y]);
      }

      //check enemies
      const leftBot = currentBoard[x + 1][y - 1];
      const rightBot = currentBoard[x + 1][y + 1];

      if (
        leftBot &&
        leftBot.chessPiece &&
        leftBot.chessPiece.getColor() !== currentColor
      ) {
        result.push([x + 1, y - 1]);
      }

      if (
        rightBot &&
        rightBot.chessPiece &&
        rightBot.chessPiece.getColor() !== currentColor
      ) {
        result.push([x + 1, y + 1]);
      }

      //starting move
      if (x == 1 && !currentBoard[x + 2][y].chessPiece) {
        result.push([x + 2, y]);
      }
      break;
    }
  }

  return result;
}
