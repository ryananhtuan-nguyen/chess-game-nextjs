export abstract class ChessPiece {
  constructor(
    protected color: string,
    protected role: string,
    protected imageUrl: string,
    protected coordinate: { rowIdx: number; colIdx: number }
  ) {}

  setImageUrl(): string {
    return this.imageUrl;
  }

  getCoordinate(): { rowIdx: number; colIdx: number } {
    return this.coordinate;
  }
}
