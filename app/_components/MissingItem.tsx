export default function MissingItem({ itemSlot }: { itemSlot: string }) {
  return (
    <div className="flex justify-center items-center bg-slate-800 h-16 m-2 rounded-md">
      <p className="italic text-slate-400"> {itemSlot} not equipped</p>
    </div>
  );
}
