import { useEffect } from 'react';

type Props = {
  onClose: () => void;
};

export default function InstructionsModal({ onClose }: Props) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div className="">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-neutral-900/40 z-50 animate-modal-bg-fade"
      ></div>
      <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-3/4 md:w-3/4 lg:w-1/3 bg-slate-600 rounded-xl z-50 shadow-lg animate-modal-appear">
        <h1 className="bg-slate-500 rounded-t-xl text-2xl font-bold p-4">
          Thanks for visiting Destiny Status!
        </h1>
        <div className="flex flex-col gap-8 items-center m-4 text-lg">
          <p>
            To get started, use the search bar at the top of the page to find
            Destiny 2 players by username. Click on a user in the list of
            results to see current equipment for each of their characters.
          </p>
          <button
            onClick={onClose}
            className="px-4 py-1 text-lg font-semibold bg-emerald-400 hover:bg-emerald-500 active:bg-emerald-600 rounded-md"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
}
