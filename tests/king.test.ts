import { initialBoard } from '../lib/game-logics/initialBoard';

import { King } from '../lib/game-logics/classes/king';
import { it, describe, expect } from 'vitest';

describe('Testing King piece', () => {
  it('Should have the correct constructor', () => {
    const newKing = new King('white', { x: 7, y: 4 });

    expect(newKing.getColor()).toBe('white');
    expect(newKing.getCoordinate()).toBeTruthy();
    expect(newKing.getRole()).toBeTruthy();
    expect(newKing.getImageUrl()).toContain('king_w');
  });

  it('Should have the correct valid move', () => {
    let testBoard = [...initialBoard];

    const whiteKing = testBoard[7][4].chessPiece;
    console.log(whiteKing?.validMoves(testBoard));

    expect(whiteKing?.validMoves(testBoard)).toStrictEqual([]);

    testBoard[6][4].chessPiece = null;

    expect(whiteKing?.validMoves(testBoard)).toStrictEqual([[6, 4]]);
  });
});
