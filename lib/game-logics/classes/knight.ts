import { ChessPiece } from '.';
import { ChessColor, ChessTile, Point } from '../types';

/**
 * Knight
 * @type {Knight: {
 *    color:string,
 *    role:'knight',
 *    imageUrl:string,
 *    coordinate:Point
 * }}
 */

export class Knight extends ChessPiece {
  constructor(color: ChessColor, coordinate: Point) {
    // Assuming you have image URLs for the king pieces
    const imageUrl = color === 'white' ? '/knight_w.png' : '/knight_b.png';

    // Call the constructor of the base class (ChessPiece)
    super(color, 'knight', imageUrl, coordinate);
  }

  validMoves(currentCoord: Point, currentBoard: ChessTile[][]) {
    const { x, y } = currentCoord;
    const currentColor = this.color;

    const allPossibleMoves = [
      [x - 2, y - 1],
      [x - 2, y + 1],
      [x - 1, y + 2],
      [x - 1, y - 2],
      [x + 2, y - 1],
      [x + 2, y + 1],
    ];

    const result = allPossibleMoves.filter(([newX, newY]) => {
      return (
        newX >= 0 &&
        newY >= 0 &&
        newX < currentBoard.length &&
        newY < currentBoard[0].length &&
        (!currentBoard[newX][newY].chessPiece ||
          currentBoard[newX][newY].chessPiece?.getColor() !== currentColor)
      );
    });

    return result;
  }
}
