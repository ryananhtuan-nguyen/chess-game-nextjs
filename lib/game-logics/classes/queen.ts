import { ChessPiece } from '.';
import { checkPieceMoveAvailable } from '../helper';
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
    const currentColor = this.color;

    //assuming its in the corner to capture all available moves
    const eachLine = Array.from({ length: 8 }).fill([x, y]) as number[][];

    //topVer, bottomVer, left, right, topleftDiag, bottomleftDiag, toprightDiag, bottomRightDiag

    //Top
    const topVer = eachLine.map(([x, y], index) => [x - index, y]);

    //Bottom
    const bottomVer = eachLine.map(([x, y], index) => [x + index, y]);

    //Left
    const left = eachLine.map(([x, y], index) => [x, y - index]);

    //Right
    const right = eachLine.map(([x, y], index) => [x, y + index]);

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
      ...checkPieceMoveAvailable(topVer.slice(1), currentBoard, currentColor),
      ...checkPieceMoveAvailable(
        bottomVer.slice(1),
        currentBoard,
        currentColor
      ),
      ...checkPieceMoveAvailable(left.slice(1), currentBoard, currentColor),
      ...checkPieceMoveAvailable(right.slice(1), currentBoard, currentColor),
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
