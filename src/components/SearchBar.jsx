import { useState, useEffect } from "react";
import { debounce } from "lodash";
import { Search } from "lucide-react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const delayed = debounce(() => onSearch(query), 500);
    delayed();
    return delayed.cancel;
  }, [query, onSearch]);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={18}
      />
      <input
        type="text"
        placeholder="Search recipes"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
      />
    </div>
  );
}
