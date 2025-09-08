"use client";

interface Search {
  location: string;
  type: string;
  bhk: string | number;
  minPrice: string | number;
  maxPrice: string | number;
}

interface SearchBarProps {
  search: Search;
  setSearch: (search: Search) => void;
  onSearch: () => void;
}

export default function SearchBar({ search, setSearch, onSearch }: SearchBarProps) {
  return (
    <div className="mb-6 flex flex-col md:flex-row gap-2 items-center">
      <input
        type="text"
        placeholder="Location"
        value={search.location}
        onChange={(e) => setSearch({ ...search, location: e.target.value })}
        className="border p-2 rounded w-full md:w-1/4"
      />
      <select
        value={search.type}
        onChange={(e) => setSearch({ ...search, type: e.target.value })}
        className="border p-2 rounded w-full md:w-1/4"
      >
        <option value="rent">Rent</option>
        <option value="lease">Lease</option>
        <option value="buy">Buy</option>
      </select>
      <input
        type="number"
        placeholder="BHK"
        value={search.bhk}
        onChange={(e) => setSearch({ ...search, bhk: e.target.value })}
        className="border p-2 rounded w-full md:w-1/6"
      />
      <input
        type="number"
        placeholder="Min Price"
        value={search.minPrice}
        onChange={(e) => setSearch({ ...search, minPrice: e.target.value })}
        className="border p-2 rounded w-full md:w-1/6"
      />
      <input
        type="number"
        placeholder="Max Price"
        value={search.maxPrice}
        onChange={(e) => setSearch({ ...search, maxPrice: e.target.value })}
        className="border p-2 rounded w-full md:w-1/6"
      />
      <button
        onClick={onSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2 md:mt-0"
      >
        Search
      </button>
    </div>
  );
}
