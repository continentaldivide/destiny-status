export default function LoadingItem() {
  return (
    <div className="flex justify-center items-center bg-slate-700 h-16 m-2 rounded-md">
      <div className="relative border-r-2 border-gray-900">
        <div className="w-[64px] h-[64px] bg-legendary-purple rounded-l-lg"></div>
      </div>
      <div className="w-60 p-2 flex flex-col justify-between"></div>
    </div>
  );
}
