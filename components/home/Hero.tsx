"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import API from "@/lib/api"; // your axios instance
import PropertyGrid from "@/components/home/PropertyGrid";
import {motion} from "framer-motion"

// Property type
export interface Property {
  id: number;
  title: string;
  location: string;
  bhk: string;
  price: number;
  type: string;
  images?: string[];
}

// Loader
function Loader() {
  return <div className="text-center py-4 text-gray-200">Loading...</div>;
}

export default function Hero() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState({
    location: "",
    type: "rent",
    bhk: "",
    minPrice: "",
    maxPrice: "",
  });

  // Fetch properties
  const fetchProperties = async () => {
    setLoading(true);
    try {
      const res = await API.get("/properties");
      setProperties(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching properties");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // Search
const handleSearch = async () => {
  setLoading(true);
  try {
    const params = new URLSearchParams(
      Object.fromEntries(Object.entries(search).filter(([_, v]) => v !== ""))
    ).toString();

    const res = await API.get(`/properties/search?${params}`);
    setProperties(res.data);

    // ✅ Scroll to result section
    setTimeout(() => {
      document
        .getElementById("searchingproperty")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  } catch (err) {
    console.error(err);
    alert("Error searching properties");
  } finally {
    setLoading(false);
  }
};


  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-screen md:h-[600px]">
        {/* Background Image */}
        <Image
          src={`https://picsum.photos/1600/900?random=${Math.floor(Math.random() * 1000)}`}
          alt="Jaipur Apartments"
          fill
          className="object-cover object-center"
          priority
        />

        {/* Overlay */}
        <motion.div 
        
        className="absolute  inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-10">
          <motion.h1    initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }} className="text-4xl md:text-6xl font-bold text-white mb-6">
            Find Your Dream Home in Jaipur
          </motion.h1>

          {/* Search Bar Wrapper */}
          <motion.div

          
             initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
          className="bg-white bg-opacity-90 p-4 rounded-lg shadow-lg flex flex-col md:flex-row gap-3 w-full ">
            <input
              type="text"
              placeholder="Location"
              className="border px-3 py-2 rounded flex-1"
              value={search.location}
              onChange={(e) => setSearch({ ...search, location: e.target.value })}
            />
            <input
              type="text"
              placeholder="BHK (e.g. 2BHK)"
              className="border px-3 py-2 rounded flex-1"
              value={search.bhk}
              onChange={(e) => setSearch({ ...search, bhk: e.target.value })}
            />
            <select
              className="border px-3 py-2 rounded flex-1"
              value={search.type}
              onChange={(e) => setSearch({ ...search, type: e.target.value })}
            >
              <option value="rent">Rent</option>
              <option value="sale">Sale</option>
            </select>
            <input
              type="number"
              placeholder="Min Price"
              className="border px-3 py-2 rounded flex-1"
              value={search.minPrice}
              onChange={(e) => setSearch({ ...search, minPrice: e.target.value })}
            />
            <input
              type="number"
              placeholder="Max Price"
              className="border px-3 py-2 rounded flex-1"
              value={search.maxPrice}
              onChange={(e) => setSearch({ ...search, maxPrice: e.target.value })}
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
            >
              Search
            </button>
          </motion.div>
        </motion.div>
      </section>

      <section className=" max-w-7xl mx-auto  relative z-10 " id="searchingproperty">
       <h2 className=" text-center py-10 text-3xl md:text-4xl font-bold mb-4">
        Most Searching <span className="text-blue-600">Properties</span>
      </h2>
        {loading ? <Loader /> : <PropertyGrid properties={properties} />}
      </section>
    </>
  );
}
