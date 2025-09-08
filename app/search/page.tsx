"use client";
import { useState } from "react";
import API from "@/lib/api";
import PropertyCard from "@/components/PropertyCard";

export default function SearchPage() {
  const [query, setQuery] = useState({ location: "", type: "rent", bhk: "", minPrice: "", maxPrice: "" });
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const params = new URLSearchParams(query).toString();
    try {
      const res = await API.get(`/properties/search?${params}`);
      setResults(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <input placeholder="Location" onChange={e => setQuery({...query, location: e.target.value})} className="border p-2 mb-2"/>
      <select onChange={e => setQuery({...query, type: e.target.value})} className="border p-2 mb-2">
        <option value="rent">Rent</option>
        <option value="lease">Lease</option>
        <option value="buy">Buy</option>
      </select>
      <input type="number" placeholder="BHK" onChange={e => setQuery({...query, bhk: e.target.value})} className="border p-2 mb-2"/>
      <input type="number" placeholder="Min Price" onChange={e => setQuery({...query, minPrice: e.target.value})} className="border p-2 mb-2"/>
      <input type="number" placeholder="Max Price" onChange={e => setQuery({...query, maxPrice: e.target.value})} className="border p-2 mb-2"/>
      <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 mb-4">Search</button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {results.map(prop => <PropertyCard key={prop._id} property={prop} />)}
      </div>
    </div>
  );
}
