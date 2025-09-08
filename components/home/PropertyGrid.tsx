"use client";

import PropertyCard from "./PropertyCard";
import { Property } from "@/components/home/Hero"; // 👈 same type import

interface PropertyGridProps {
  properties: Property[];
}

export default function PropertyGrid({ properties }: PropertyGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-10">
      {properties?.slice(0,4).map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
