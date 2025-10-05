"use client";

import Image from "next/image";
import { Property } from "@/components/home/Hero";
import { useRouter } from "next/navigation"; // ✅ useRouter hook

export default function PropertyCard({ property }: { property: Property }) {
  const router = useRouter(); // ✅ initialize router
  // console.log(property);
const id = property._id;
// onClick={() => router.push(`/properties/${id}`)}

  return (
    <div className="relative border rounded shadow hover:shadow-lg transition overflow-hidden">
      <Image
        src={`https://picsum.photos/seed/${property._id}/300/200`}
        alt={property.title}
        width={300}
        height={200}
        className="object-cover w-full h-48"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{property.title}</h2>
        <p>Location: {property.location}</p>
        <p>BHK: {property.bhk}</p>
        <p>Price: ₹{property.price}</p>
        <p>Type: {property.type}</p>
        <button
          onClick={() => router.push(`/properties/${id}`)} // ✅ use router.push
          className="absolute bottom-1 right-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-103"
        >
          View Property
        </button>
      </div>
    </div>
  );
}
