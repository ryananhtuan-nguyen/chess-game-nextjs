import { ChessPiece } from '.';
import { checkPieceMoveAvailable } from '../helper';
import { ChessColor, ChessTile, Point } from '../types';

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

  validMoves(currentBoard: ChessTile[][]) {
    const { x, y } = this.coordinate;
    const currentColor = this.color;
    const eachLine = Array.from({ length: 8 }).fill([x, y]) as number[][];

    //topVer, bottomVer, left, right, topleftDiag, bottomleftDiag, toprightDiag, bottomRightDiag

    //Top
    const top = eachLine.map(([x, y], index) => [x - index, y]);

    //Bottom
    const bottom = eachLine.map(([x, y], index) => [x + index, y]);

    //Left
    const left = eachLine.map(([x, y], index) => [x, y - index]);

    //Right
    const right = eachLine.map(([x, y], index) => [x, y + index]);

    const allPossibleMove = [
      ...checkPieceMoveAvailable(top.slice(1), currentBoard, currentColor),
      ...checkPieceMoveAvailable(bottom.slice(1), currentBoard, currentColor),
      ...checkPieceMoveAvailable(left.slice(1), currentBoard, currentColor),
      ...checkPieceMoveAvailable(right.slice(1), currentBoard, currentColor),
    ];
    return allPossibleMove;
  }
}
