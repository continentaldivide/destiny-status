import { useState } from 'react';
import Image from 'next/image';

type Props = {
  fetchingData: boolean;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
};

export default function Nav({ fetchingData, setUsername }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <nav className="absolute w-full flex justify-center bg-slate-700 border-b border-slate-500">
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
    </nav>
  );
}
