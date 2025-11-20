"use client";

import { Property } from "@/app/page";
import PropertyCard from "./PropertyCard";

interface PropertyGridProps {
  properties: Property[] | null | undefined;
}

export default function PropertyGrid({ properties }: PropertyGridProps) {
  const safeList = Array.isArray(properties) ? properties : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  md:mx-8 gap-6 px-10">
      {safeList.map((property) => (
        <PropertyCard key={property._id} property={property} />
      ))}
    </div>
  );
}
