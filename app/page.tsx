import Image from 'next/image';

export default function Home() {
  return (
    <main>
      <h1>Images:</h1>
      <div className="flex flex-col bg-white">
        <Image
          src="/black-king.png"
          width={50}
          height={50}
          alt="black-king"
          className="h-[150px] w-[150px]"
        />
        <Image src="/white-king.png" width={50} height={50} alt="white-king" />
        <Image
          src="/black-queen.png"
          width={50}
          height={50}
          alt="black-queen"
        />
      </div>
    </main>
  );
}
