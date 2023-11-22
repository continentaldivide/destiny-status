import Image from 'next/image';

export default function LoadingScreen({
  loadingMessage,
}: {
  loadingMessage: string;
}) {
  return (
    <div className="min-h-screen flex gap-2 justify-center items-center">
      <main className="w-1/4 bg-slate-500 rounded-lg">
        <h1 className="text-2xl font-bold p-4">Loading, hang tight!</h1>
        <section className="flex justify-center gap-2 text-xl leading-loose p-4 bg-slate-600 rounded-b-lg">
          <p>{loadingMessage}</p>
          <Image
            src="spinner.svg"
            alt=""
            width={32}
            height={32}
            className="animate-spin"
          />
        </section>
      </main>
    </div>
  );
}
