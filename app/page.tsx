import { ChessBoard } from '@/components/chess-board';
export default function Home() {
  return (
    <main>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <h1>ChessGame</h1>
        <ChessBoard />
      </div>
    </main>
  );
}
