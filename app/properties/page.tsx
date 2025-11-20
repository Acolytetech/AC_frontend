"use client";

import Image from "next/image";
import PropertyGrid from "@/components/home/PropertyGrid";
import TrustedSection from "@/components/home/TrustedSection";
import HowItWorks from "@/components/home/HowItWorks";
import { useEffect, useState } from "react";
import API from "@/lib/api";

// Updated Interface Based on Backend
export interface Property {
  _id: string;
  title: string;
  tagline: string;
  location:{city: string;
  area: string;
  landmark:string;
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
  const [loading, setLoading] = useState(false);

  // Fetch data from /properties
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await API.get("/properties");

        // Backend returns { success, count, properties }
        const list = res.data?.properties || [];

        setAllProperties(list);
      } catch (err) {
        console.error("Error fetching properties", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Derived sections
  const bestSelling = [...allProperties].sort(
    (a, b) => (b.price?.value || 0) - (a.price?.value || 0)
  );

  const bestLocation = allProperties.filter(
    (p) => p.location?.city?.toLowerCase().includes("jaipur") // example
  );

  const mostBooked = [...allProperties]; // Future: booking count

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
            Explore the Best Properties in Jaipur
          </h1>
        </div>
      </section>

      {/* Best Selling */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-6">
          Best <span className="text-blue-600">Selling</span> Properties
        </h2>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <PropertyGrid properties={bestSelling} />
        )}
      </section>

      {/* Best Location */}
      <section className="max-w-7xl mx-auto px-6 py-16 bg-gray-100 rounded-xl">
        <h2 className="text-3xl font-bold mb-6">
          Properties in Best <span className="text-blue-600">Locations</span>
        </h2>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <PropertyGrid properties={bestLocation} />
        )}
      </section>

      <TrustedSection />

      {/* Most Booked */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-6">
          Most <span className="text-blue-600">Booked</span> Properties
        </h2>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <PropertyGrid properties={mostBooked} />
        )}
      </section>
    </main>
  );
}
