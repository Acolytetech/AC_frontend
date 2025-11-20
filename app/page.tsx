"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";

import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import TrustedSection from "@/components/home/TrustedSection";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import PropertyGrid from "@/components/home/PropertyGrid";

export interface Property {
  _id: string;
  title: string;
  tagline: string;
  location:{
  city: string;
  area: string;
  };
  price: {
    value: number;
    unit: string;
  };
  propertyType: string;
  images?: string[];
}

function Loader() {
  return <div className="text-center py-4 text-gray-500">Loading...</div>;
}

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const res = await API.get("/properties");
      const list =
        res.data.properties || res.data.data || res.data || [];

      setProperties(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

const handleSearch = async (filters: any) => {
  setLoading(true);

  try {
    const filtered = Object.fromEntries(
      Object.entries(filters)
        .filter(([_, v]) => v !== "" && v !== null && v !== undefined)
        .map(([k, v]) => [k, String(v)]) // 👈 FORCE string values
    );

    const params = new URLSearchParams(filtered).toString();

    const res = await API.get(`/properties/search?${params}`);

    const list =
      res.data.properties || res.data.data || res.data || [];

    setProperties(Array.isArray(list) ? list : []);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};


  return (
    <div>
      {/* Hero receives search function */}
      <Hero onSearch={handleSearch} />


      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600 my-10">
        Best Booking Sites
      </h2>

      {loading ? <Loader /> : <PropertyGrid properties={properties} />}
      <TrustedSection />x

      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600 my-10">
        most loved Sites
      </h2>

      {loading ? <Loader /> : <PropertyGrid properties={properties} />}
      <HowItWorks />
      <WhyChooseSection />
    </div>
  );
}
