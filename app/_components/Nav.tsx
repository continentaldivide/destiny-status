import { useState } from 'react';

export default function Nav({ setUsername }) {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <nav className="absolute w-full bg-slate-700 border-b-2 border-slate-100">
      <div className="flex justify-center">
        <input
          value={searchQuery}
          type="search"
          placeholder="hello"
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-10 w-1/3 text-2xl outline-none bg-green-200"
        />
        <button onClick={() => setUsername(searchQuery)}>button</button>
      </div>
    </nav>
  );
}
