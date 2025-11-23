"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

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

export default function Hero({
  onSearch,
}: {
  onSearch: (filters: Record<string, string | number | null>) => void;
}) {
  const [search, setSearch] = useState({
    location: "",
    type: "sale",
    bhk: "",
    minPrice: "",
    maxPrice: "",
  });

  const handleSearchClick = () => {
    onSearch(search); // 🔥 Send filters to parent
    setTimeout(() => {
      document
        .getElementById("searchingproperty")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <>
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
              onClick={handleSearchClick}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Search
            </button>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
