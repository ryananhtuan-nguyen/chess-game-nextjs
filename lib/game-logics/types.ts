import { ChessPiece } from '.';

export type Point = {
  x: number;
  y: number;
};

export type ChessColor = 'white' | 'black';

export type ChessTile = {
  id: string;
  chessPiece: ChessPiece | null;
};
