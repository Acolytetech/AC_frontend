"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import API from "@/lib/api";
import PropertyGrid from "@/components/home/PropertyGrid";
import { motion } from "framer-motion";

// Updated Property Type (matches backend)
export interface Property {
  _id: string;
  title: string;
  tagline: string;
  city: string;
  area: string;
  price: {
    value: number;
    unit: string;
  };
  propertyType: string;
  images?: string[];
}

// Loader Component
function Loader() {
  return <div className="text-center py-4 text-gray-300">Loading...</div>;
}

export default function Hero() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState({
    location: "",
    type: "sale",
    bhk: "",
    minPrice: "",
    maxPrice: "",
  });

  // Fetch All Approved Properties
  const fetchProperties = async () => {
    setLoading(true);
    try {
      const res = await API.get("/properties");

      // 🔥 SAFE ARRAY HANDLING
      const list =
        res.data.properties || // { properties: [...] }
        res.data.data || // { data: [...] }
        res.data || // direct array
        [];

      setProperties(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("Error loading properties:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // Search Handler
  const handleSearch = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(
        Object.fromEntries(
          Object.entries(search).filter(([_, v]) => v !== "")
        )
      ).toString();

      const res = await API.get(`/properties/search?${params}`);

      const list =
        res.data.properties ||
        res.data.data ||
        res.data ||
        [];

      setProperties(Array.isArray(list) ? list : []);

      setTimeout(() => {
        document
          .getElementById("searchingproperty")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* HERO BANNER */}
      <section className="relative w-full h-screen md:h-[600px]">
        <Image
          src="https://i.pinimg.com/1200x/60/c9/82/60c982a049af926938fb8d3df2df6738.jpg"
          alt="Properties"
          fill
          className="object-cover"
          priority
        />

        <motion.div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-10">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            Find Your Dream Home in Jaipur
          </motion.h1>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="bg-white p-4 rounded-lg shadow-lg flex flex-col md:flex-row gap-3 w-full "
          >
            <select
              value={search.location}
              onChange={(e) =>
                setSearch({ ...search, location: e.target.value })
              }
              className="border px-3 py-2 rounded flex-1"
            >
              <option value="">Select Location</option>
              <option value="Mansarovar">Mansarovar</option>
              <option value="Jagatpura">Jagatpura</option>
              <option value="Ajmer Road">Ajmer Road</option>
            </select>

            <input
              type="text"
              placeholder="BHK (e.g. 2BHK)"
              className="border px-3 py-2 rounded flex-1"
              value={search.bhk}
              onChange={(e) =>
                setSearch({ ...search, bhk: e.target.value })
              }
            />

            <select
              value={search.type}
              onChange={(e) =>
                setSearch({ ...search, type: e.target.value })
              }
              className="border px-3 py-2 rounded flex-1"
            >
              <option value="sale">Sale</option>
              <option value="rent">Rent</option>
            </select>

            <input
              type="number"
              placeholder="Min Price"
              className="border px-3 py-2 rounded flex-1"
              value={search.minPrice}
              onChange={(e) =>
                setSearch({ ...search, minPrice: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Max Price"
              className="border px-3 py-2 rounded flex-1"
              value={search.maxPrice}
              onChange={(e) =>
                setSearch({ ...search, maxPrice: e.target.value })
              }
            />

            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Search
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* SEARCH RESULTS */}
      <section
        className="max-w-7xl mx-auto py-10"
        id="searchingproperty"
      >
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-8">
          Most Searching <span className="text-blue-600">Properties</span>
        </h2>

        {loading ? <Loader /> : <PropertyGrid properties={properties} />}
      </section>
    </>
  );
}
