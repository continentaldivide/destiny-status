export default function LoadingItem() {
  return (
    <div className="flex justify-center items-center bg-slate-700 h-16 m-2 rounded-md">
      <div className="relative border-r-2 border-gray-900">
        <div className="w-[64px] h-[64px] bg-legendary-purple rounded-l-lg"></div>
      </div>
      <div className="w-60 p-2 flex flex-col justify-between">
        <div className="flex flex-col gap-1 items-end">
          <div className="w-36 h-5 rounded-sm bg-[length:400px] bg-gradient-to-r from-slate-400 from-0% via-slate-300 via-20% to-slate-400 to-40% animate-name-skeleton"></div>
          <div className="w-16 h-5 rounded-sm bg-[length:400px] bg-gradient-to-r from-slate-400 from-0% via-slate-300 via-20% to-slate-400 to-40% animate-power-skeleton"></div>
        </div>
      </div>
    </div>
  );
}
