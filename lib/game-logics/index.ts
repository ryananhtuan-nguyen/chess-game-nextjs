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
/**
 * Rook
 * @type {Rook: {
 *    color:string,
 *    role:'rook',
 *    imageUrl:string,
 *    coordinate:Point
 * }}
 */

export class Rook extends ChessPiece {
  constructor(color: ChessColor, coordinate: Point) {
    const imageUrl = color === 'white' ? '/rook_w.png' : '/rook_b.png';

    // Call the constructor of the base class (ChessPiece)
    super(color, 'rook', imageUrl, coordinate);
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
/**
 * Bishop
 * @type {Bishop: {
 *    color:string,
 *    role:'Bishop',
 *    imageUrl:string,
 *    coordinate:Point
 * }}
 */

export class Bishop extends ChessPiece {
  constructor(color: ChessColor, coordinate: Point) {
    const imageUrl = color === 'white' ? '/bishop_w.png' : '/bishop_b.png';

    // Call the constructor of the base class (ChessPiece)
    super(color, 'bishop', imageUrl, coordinate);
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
