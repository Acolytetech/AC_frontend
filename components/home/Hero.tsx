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
      <section className="relative w-full h-[150vh] md:h-[600px] border">
        <Image
          src="/img/city-sunset.jpg"
          alt="Properties"
          fill
          className="object-cover brightness-150"
          priority
        />

        <motion.div className="absolute inset-0 bg-black/50 flex flex-col md:flex-row justify-center items-center text-center gap-10 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="bg-black/30 p-4 md:text-left text-center rounded-lg shadow-lg flex flex-col flex-wrap   gap-8 w-full "
          >  <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-6xl font-bold text-white "
          >
Welcome to Jaipur <p className="text-blue-600">Dream Homes</p></motion.h1>
<h2 className="text-base md:text-3xl font-normal text-gray-100">
Your trusted partner in real estate solutions in Mansarovar Patrkar Colony, dedicated to helping you find your dream property.

</h2>
<div className="flex flex-col capitalize md:flex-row gap-10">
  <div className="bg-white p-4 rounded-xl">
    <p className="text-4xl font-bold text-sky-950">150+</p>
    <p className="text-2xl font-semibold">Expert guidance</p>
  </div>
  <div className="bg-white p-4 rounded-xl">
    <p className="text-4xl font-bold text-sky-950">15+</p>
    <p className="text-2xl font-semibold">Trusted by Clients</p>
  </div>

  </div>

          </motion.div>


          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="bg-white/70 p-4 rounded-lg shadow-lg flex flex-col flex-wrap gap-3 md:w-4xl "
          >
            <h2 className="font-bold text-base md:text-2xl capitalize">Search now your Property</h2>
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
