import { ChessBoard } from '@/components/chess-board';
import { initialBoard } from '@/lib/game-logics/initialBoard';
export default function Home() {
  console.log(
    initialBoard.flat().map((item, idx) => ({
      ...item,
      color: idx % 2 == 0 ? 'black' : 'white',
    }))
  );
  return (
    <main>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <h1>ChessGame</h1>
        <ChessBoard initialBoard={initialBoard} />
      </div>
    </main>
  );
}
