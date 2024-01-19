import { ChessPiece } from './classes';

export type Point = {
  x: number;
  y: number;
};

export type ChessColor = 'white' | 'black';

export type ChessTile = {
  id: string;
  chessPiece: ChessPiece | null;
};

export type ChessTileWithColor = ChessTile & {
  color: ChessColor;
};
