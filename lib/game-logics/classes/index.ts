import { ChessColor, ChessPieceType, ChessTile, Point } from '../types';

/**
 * Base-class for each chesspiece
 * @type {ChessPiece}
 */
export abstract class ChessPiece {
  constructor(
    protected color: ChessColor,
    protected role: ChessPieceType,
    protected imageUrl: string,
    protected coordinate: Point
  ) {}

  getRole(): ChessPieceType {
    return this.role;
  }

  getCoordinate(): Point {
    return this.coordinate;
  }

  getColor(): ChessColor {
    return this.color;
  }

  getImageUrl(): string {
    return this.imageUrl;
  }

  abstract validMoves(currentBoard: ChessTile[][]): number[][];

  setCoordinate(cord: Point, currentBoard: ChessTile[][]) {
    this.coordinate = cord;
    return this;
  }

  isBeingChecked(currentBoard: ChessTile[][]): boolean {
    // Default implementation, can be overridden by derived classes
    console.warn('isBeingChecked method not implemented for this chess piece.');
    return false;
  }
}
