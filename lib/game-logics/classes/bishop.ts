import { ChessPiece } from '.';
import { checkPieceMoveAvailable } from '../helper';
import { ChessColor, ChessTile, Point } from '../types';

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
    const currentColor = this.color;

    //corner
    const eachLine = Array.from({ length: 8 }).fill([x, y]) as number[][];

    //top left, top right, bottom left, bottom right

    //Top Left Diagonal
    const topLeftDiag = eachLine.map(([x, y], index) => [x - index, y - index]);

    //Bottom Left Diagonal
    const bottomLeftDiag = eachLine.map(([x, y], index) => [
      x + index,
      y - index,
    ]);

    //Top Right Diag
    const topRightDiag = eachLine.map(([x, y], index) => [
      x - index,
      y + index,
    ]);

    //Bottom Right
    const bottomRightDiag = eachLine.map(([x, y], index) => [
      x + index,
      y + index,
    ]);

    const allPossibleMove = [
      ...checkPieceMoveAvailable(
        topLeftDiag.slice(1),
        currentBoard,
        currentColor
      ),
      ...checkPieceMoveAvailable(
        bottomLeftDiag.slice(1),
        currentBoard,
        currentColor
      ),
      ...checkPieceMoveAvailable(
        topRightDiag.slice(1),
        currentBoard,
        currentColor
      ),
      ...checkPieceMoveAvailable(
        bottomRightDiag.slice(1),
        currentBoard,
        currentColor
      ),
    ];

    return allPossibleMove;
  }
}
