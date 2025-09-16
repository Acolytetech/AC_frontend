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

export default function SearchBar({
  search,
  setSearch,
  onSearch,
}: SearchBarProps) {
  const locations = [
    "Mansarovar",
    "Jagatpura",
    "Sitapura",
    "Ajmer Road",
    "Vidhyadhar Nagar",
    "Vaishali Nagar",
    "Tonk Road",
    "200 Feet Bypass",
  ];

  return (
    <div className="w-full mx-auto mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Location Dropdown */}
        <select
          value={search.location}
          onChange={(e) => setSearch({ ...search, location: e.target.value })}
          className="border p-2 rounded w-full"
        >
          <option value="">Select Location</option>
          {locations.map((loc, i) => (
            <option key={i} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        {/* Type */}
        <select
          value={search.type}
          onChange={(e) => setSearch({ ...search, type: e.target.value })}
          className="border p-2 rounded w-full"
        >
          <option value="rent">Rent</option>
          <option value="lease">Lease</option>
          <option value="buy">Buy</option>
        </select>

        {/* BHK */}
        <input
          type="number"
          placeholder="BHK"
          value={search.bhk}
          onChange={(e) => setSearch({ ...search, bhk: e.target.value })}
          className="border p-2 rounded w-full"
        />

        {/* Min Price */}
        <input
          type="number"
          placeholder="Min Price"
          value={search.minPrice}
          onChange={(e) => setSearch({ ...search, minPrice: e.target.value })}
          className="border p-2 rounded w-full"
        />

        {/* Max Price */}
        <input
          type="number"
          placeholder="Max Price"
          value={search.maxPrice}
          onChange={(e) => setSearch({ ...search, maxPrice: e.target.value })}
          className="border p-2 rounded w-full"
        />

        {/* Search Button */}
        <button
          onClick={onSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition"
        >
          Search
        </button>
      </div>
    </div>
  );
}
