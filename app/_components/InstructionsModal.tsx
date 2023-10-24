export default function InstructionsModal({
  isOpen,
  handleClose,
}: {
  isOpen: boolean;
  handleClose: () => void;
}) {
  return isOpen ? (
    <>
      <div className="fixed inset-0 bg-neutral-900/40 z-50"></div>
      <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-1/4 bg-blue-950  border-pink-200 rounded-md z-50">
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
            onClick={handleClose}
            className="px-2 text-lg bg-blue-500 hover:bg-blue-600 border border-gray-500 rounded-md"
          >
            Got it!
          </button>
        </div>
      </div>
    </>
  ) : null;
}
