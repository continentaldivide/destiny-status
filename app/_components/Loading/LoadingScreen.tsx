import Image from "next/image";

export default function LoadingScreen({
  loadingMessage,
}: {
  loadingMessage: string;
}) {
  return (
    <div className="min-h-screen flex gap-2 justify-center items-center">
      <p>{loadingMessage}</p>
      <Image src="spinner.svg" alt="" width={24} height={24} className="animate-spin"/>
    </div>
  );
}
