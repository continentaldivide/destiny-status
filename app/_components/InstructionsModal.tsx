export default function InstructionsModal({
  isOpen,
  handleClose,
}: {
  isOpen: boolean;
  handleClose: () => void;
}) {
  return isOpen ? (
    <>
      <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 border border-pink-200 z-50">
        <p>hello world</p>
        <button onClick={handleClose} className="border border-gray-500">
          close me
        </button>
      </div>
    </>
  ) : null;
}
