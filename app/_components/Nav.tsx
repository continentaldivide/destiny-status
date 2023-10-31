import { useState } from 'react';
import Image from 'next/image';

type Props = {
  fetchingData: boolean;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  handleInfoClick: () => void;
};

export default function Nav({
  fetchingData,
  setUsername,
  handleInfoClick,
}: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <nav className="absolute w-full flex justify-center bg-slate-700 border-b border-slate-500">
      <div className="flex relative justify-center w-3/4">
        <div className="absolute left-0 h-full pl-2 flex items-center">
          <p className="text-2xl font-bold">Destiny Status</p>
        </div>
        <form action="" className="flex">
          <input
            value={searchQuery}
            type="search"
            placeholder="search by Bungie name..."
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 p-6 flex-grow text-2xl outline-none bg-slate-700"
          />
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              setUsername(searchQuery);
            }}
            disabled={fetchingData}
          >
            <Image src="search.svg" alt="" width={36} height={36} />
          </button>
        </form>
        <button
          onClick={handleInfoClick}
          className="absolute right-0 h-full pr-12 hover:brightness-125"
        >
          <img height="36" width="36" src="info.svg" />
        </button>
        <a
          target="_blank"
          href="https://github.com/continentaldivide/destiny-status"
        >
          <img
            height="36"
            width="36"
            src="https://cdn.simpleicons.org/github/CCCCCC/"
            className="absolute right-0 h-full pr-2 hover:brightness-125"
          />
        </a>
      </div>
    </nav>
  );
}
