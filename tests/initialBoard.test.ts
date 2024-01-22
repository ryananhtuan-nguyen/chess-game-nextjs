import { initialBoard } from '../lib/game-logics/initialBoard';

import { describe, it, expect, test } from 'vitest';

describe('Initialboard generator', () => {
  it('Initial board should have the correct board size', () => {
    const testBoard = [...initialBoard];

    expect(testBoard.length).toBe(8);
    expect(testBoard[0].length).toBe(8);
  });

  it('Initialboard should have correct chess pieces, testing 0-7 blackRook', () => {
    const testBoard = [...initialBoard];

    const blackRook = testBoard[0][7].chessPiece;

    expect(blackRook).toBeTruthy();

    expect(blackRook?.getRole()).toBe('rook');

    expect(blackRook?.getColor()).toBe('black');
  });

  it('Initialboard should have the correct chess pieces, testing 7-4 white king', () => {
    const testBoard = [...initialBoard];
    const whiteKing = testBoard[7][4].chessPiece;

    expect(whiteKing).toBeTruthy();

    expect(whiteKing?.getRole()).toBe('king');

    expect(whiteKing?.getColor()).toBe('white');
  });

  it('Initialboard should have correct chess pieces, middle should be empty', () => {
    const testBoard = [...initialBoard];

    const middleTile = testBoard[5][5];

    expect(middleTile.chessPiece).toBeFalsy();
  });
});
