import { ChessPiece } from '.';
import { ChessColor, ChessTile, Point } from '../types';

/**
 * Queen
 * @type {Queen: {
 *    color:string,
 *    role:'queen',
 *    imageUrl:string,
 *    coordinate:Point
 * }}
 */

export class Queen extends ChessPiece {
  constructor(color: ChessColor, coordinate: Point) {
    const imageUrl = color === 'white' ? '/queen_w.png' : '/queen_b.png';

    // Call the constructor of the base class (ChessPiece)
    super(color, 'queen', imageUrl, coordinate);
  }

  validMoves(currentCoord: Point, currentBoard: ChessTile[][]) {
    const { x, y } = currentCoord;
    const allPossibleMove = [
      [x - 1, y - 1],
      [x, y - 1],
      [x + 1, y - 1],
      [x - 1, y],
      [x + 1, y],
      [x - 1, y + 1],
      [x, y + 1],
      [x + 1, y + 1],
    ];

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
