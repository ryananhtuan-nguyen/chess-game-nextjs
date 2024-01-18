import { ChessBoard } from '@/components/chess-board';
export default function Home() {
  return (
    <main className="h-full">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <h1 className="font-bold text-2xl pb-2">ChessGame</h1>
        <ChessBoard />
      </div>
    </main>
  );
}
