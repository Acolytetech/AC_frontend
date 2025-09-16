"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api"; // axios instance
import "./globals.css";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import TrustedSection from "@/components/home/TrustedSection";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import PropertyGrid from "@/components/home/PropertyGrid";

// Property type
interface Property {
  id: number;
  title: string;
  location: string;
  bhk: string;
  price: number;
  type: string;
  images?: string[];
}

// Loader component
function Loader() {
  return <div className="text-center py-4 text-gray-500">Loading...</div>;
}

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState({
    location: "",
    type: "rent",
    bhk: "",
    minPrice: "",
    maxPrice: "",
  });

  // Fetch all properties
  const fetchProperties = async () => {
    setLoading(true);
    try {
      const res = await API.get("/properties");
      setProperties(res.data); // assuming array of properties
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

  // Search function
  const handleSearch = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(
        Object.fromEntries(
          Object.entries(search).filter(([_, v]) => v !== "")
        )
      ).toString();

      const res = await API.get(`/properties/search?${params}`);
      setProperties(res.data);
    } catch (err) {
      console.error(err);
      alert("Error searching properties");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <Hero/>


      <TrustedSection/>
      {loading ? <Loader /> : <PropertyGrid properties={properties} />}
      {/* Loader / Property Grid */}
      <h2 className="text-3xl font-bold mb-6 text-center bg-white text-blue-600 my-10">Best Booking sites</h2>
      <HowItWorks/>

      <WhyChooseSection/>
    </div>
  );
}
