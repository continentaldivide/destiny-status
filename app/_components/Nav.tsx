import { useState } from 'react';
import Image from 'next/image';

export default function Nav({ setUsername }) {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <nav className="absolute w-full flex justify-center bg-slate-700 border-b-2 border-slate-100">
      <form action="" className="flex w-1/3">
        <input
          value={searchQuery}
          type="search"
          placeholder="search for a destiny player"
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-10 flex-grow text-2xl outline-none bg-green-200"
        />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            setUsername(searchQuery);
          }}
        >
          <Image src="search.svg" alt="" width={40} height={40} />
        </button>
      </form>
    </nav>
  );
}
