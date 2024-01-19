import { ChessPiece } from '.';
import { ChessColor, ChessTile, Point } from '../types';

/**
 * Pawn
 * @type {Pawn: {
 *    color:string,
 *    role:'pawn',
 *    imageUrl:string,
 *    coordinate:Point
 * }}
 */

export class Pawn extends ChessPiece {
  constructor(color: ChessColor, coordinate: Point) {
    const imageUrl = color === 'white' ? '/pawn_w.png' : '/pawn_b.png';

    // Call the constructor of the base class (ChessPiece)
    super(color, 'pawn', imageUrl, coordinate);
  }

  validMoves(currentCoord: Point, currentBoard: ChessTile[][]) {
    const { x, y } = currentCoord;
    const allPossibleMove =
      this.color == 'white'
        ? [
            // [x - 1, y - 1],
            [x - 1, y],
            // [x + 1, y - 1],
          ]
        : [
            // [x - 1, y + 1],
            [x, y + 1],
            // [x + 1, y + 1],
          ];
    return allPossibleMove;
    const result = allPossibleMove.filter(([newX, newY]) => {
      return (
        newX >= 0 &&
        newY >= 0 &&
        newX < currentBoard.length &&
        newY < currentBoard[0].length &&
        (!currentBoard[newX][newY].chessPiece ||
          currentBoard[newX][newY].chessPiece?.getColor() !== this.color)
      );
    });

    return result;
  }
}
