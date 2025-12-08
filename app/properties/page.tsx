"use client";

import Image from "next/image";
import PropertyGrid from "@/components/home/PropertyGrid";
import TrustedSection from "@/components/home/TrustedSection";
import HowItWorks from "@/components/home/HowItWorks";
import { useEffect, useState } from "react";
import API from "@/lib/api";

// Interface
export interface Property {
  _id: string;
  title: string;
  tagline: string;
  location: {
    city: string;
    area: string;
    landmark: string;
  };
  price: {
    value: number;
    unit: string;
  };
  propertyType: string;
  images?: string[];
}

export default function PropertiesPage() {
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [filtered, setFiltered] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);

  // ---------- Filters ----------
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000000);

  // Fetch properties
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await API.get("/properties");
        const list = res.data?.properties || [];

        setAllProperties(list);
        setFiltered(list); // default
      } catch (err) {
        console.error("Error fetching properties", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Get unique cities and areas from backend
  const uniqueCities = [...new Set(allProperties.map((p) => p.location.city))];
  const uniqueAreas = [...new Set(allProperties.map((p) => p.location.area))];

  // Apply Filters
  useEffect(() => {
    let result = [...allProperties];

    if (city) {
      result = result.filter((p) =>
        p.location.city.toLowerCase().includes(city.toLowerCase())
      );
    }

    if (area) {
      result = result.filter((p) =>
        p.location.area.toLowerCase().includes(area.toLowerCase())
      );
    }

    result = result.filter(
      (p) =>
        p.price?.value >= minPrice && p.price?.value <= maxPrice
    );

    setFiltered(result);
  }, [city, area, minPrice, maxPrice, allProperties]);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section className="relative w-full h-[60vh] flex items-center justify-center text-center">
        <Image
          src="https://picsum.photos/1600/800?blur=3"
          alt="Properties in Jaipur"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Explore the Best Properties
          </h1>
        </div>
      </section>

      {/* Main Layout */}
      <section className=" mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* ------------------ Sidebar Filters ------------------ */}
        <aside className="md:col-span-1 bg-white p-6 rounded-xl shadow-md h-fit">
          <h3 className="text-xl font-semibold mb-4">Filters</h3>

          {/* City Filter */}
          <div className="mb-5">
            <label className="font-medium">City</label>
            <select
              className="w-full mt-2 p-2 rounded border"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="">All Cities</option>
              {uniqueCities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Area Filter */}
          <div className="mb-5">
            <label className="font-medium">Area</label>
            <select
              className="w-full mt-2 p-2 rounded border"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            >
              <option value="">All Areas</option>
              {uniqueAreas.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>

          {/* Budget Filter */}
          <div className="mb-5">
            <label className="font-medium">Budget (₹)</label>
            <div className="flex gap-4 mt-2">
              <input
                type="number"
                min={0}
                className="w-1/2 p-2 border rounded"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
              />
              <input
                type="number"
                className="w-1/2 p-2 border rounded"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={() => {
              setCity("");
              setArea("");
              setMinPrice(0);
              setMaxPrice(50000000);
            }}
            className="w-full mt-4 bg-gray-200 hover:bg-gray-300 py-2 rounded"
          >
            Reset Filters
          </button>

        </aside>

        {/* ------------------ Properties ------------------ */}
        <div className="md:col-span-3">
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : (
            <PropertyGrid properties={filtered} />
          )}
        </div>
      </section>

      <TrustedSection />
    </main>
  );
}
