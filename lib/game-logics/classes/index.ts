import { ChessColor, ChessTile, Point } from '../types';

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
  abstract validMoves(
    currentCoord: Point,
    currentBoard: ChessTile[][]
  ): number[][];
}
