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
      <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-1/4 bg-blue-950 rounded-md z-50 animate-modal-appear">
        <div className="flex flex-col gap-2 items-center m-4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <button
            onClick={onClose}
            className="px-2 text-lg bg-blue-500 hover:bg-blue-600 border border-gray-500 rounded-md"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
}
