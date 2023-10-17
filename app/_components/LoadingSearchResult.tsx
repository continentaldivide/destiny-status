import Image from 'next/image';

export default function LoadingSearchResult({
  position,
}: {
  position: string;
}) {
  return (
    <div
      className={`w-[474px] h-[96px] m-2 bg-slate-600 flex animate-fade-in-${position}`}
    >
      <div className="mx-2 my-auto">
        <Image
          unoptimized
          // For ref: this icon placeholder uses the "secondary overlay" of the "triple tip" emblem.  Hoping this img URL is static across seasons -- if that turns out to be untrue, this can be tweaked to pull the src from the triple tip data in manifest
          src="https://www.bungie.net/common/destiny2_content/icons/39951cdb9f6c906d285a360443b2139f.png"
          alt=""
          width={80}
          height={80}
        />
      </div>
      <div>
        <div className="w-36 h-6 mt-6 rounded-sm bg-[length:400px] bg-gradient-to-r from-slate-300 from-0% via-slate-100 via-20% to-slate-300 to-40% animate-name-skeleton"></div>
        <div className="w-16 h-5 mt-2 rounded-sm bg-[length:400px] bg-gradient-to-r from-amber-200 from-0% via-amber-50 via-20% to-amber-200 to-40% animate-name-skeleton"></div>
      </div>
    </div>
  );
}
