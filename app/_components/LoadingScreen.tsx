export default function LoadingScreen({
  loadingMessage,
}: {
  loadingMessage: string;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center pt-24">
      <p>{loadingMessage}</p>
    </div>
  );
}
