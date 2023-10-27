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
      <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-3/4 md:w-1/2 lg:w-1/4 text-slate-600 bg-slate-300 rounded-xl z-50 shadow-lg animate-modal-appear">
        <div className="flex flex-col gap-8 items-center m-4">
          <p>
            Thanks for visiting Destiny Status!  To get started, use the search bar at the top of the page to find Destiny 2 players by username.  Click on a user in the list of results to see current equipment for each of their characters.
          </p>
          <button
            onClick={onClose}
            className="px-4 py-1 text-lg font-semibold text-slate-200 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
}
