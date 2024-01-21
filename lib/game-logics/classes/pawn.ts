import { ChessPiece } from '.';
import { checkPawnMove } from '../helper';
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
    const currentColor = this.color;
    const result = checkPawnMove(currentColor, currentCoord, currentBoard);

    return result;
  }
}
