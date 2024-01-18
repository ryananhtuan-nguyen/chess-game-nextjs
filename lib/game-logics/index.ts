import { ChessColor, ChessTile, Point } from './types';

/**
 * Base-class for each chesspiece
 * @type {ChessPiece}
 */
export abstract class ChessPiece {
  constructor(
    protected color: ChessColor,
    protected role: string,
    protected imageUrl: string,
    protected coordinate: Point
  ) {}

  getCoordinate(): Point {
    return this.coordinate;
  }

  getColor(): ChessColor {
    return this.color;
  }

  getImageUrl(): string {
    return this.imageUrl;
  }
}

/**
 * King
 * @type {King: {
 *    color:string,
 *    role:'king',
 *    imageUrl:string,
 *    coordinate:Point
 * }}
 */

export class King extends ChessPiece {
  constructor(color: ChessColor, coordinate: Point) {
    // Assuming you have image URLs for the king pieces
    const imageUrl = color === 'white' ? '/king_w.png' : '/king_b.png';

    // Call the constructor of the base class (ChessPiece)
    super(color, 'king', imageUrl, coordinate);
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
