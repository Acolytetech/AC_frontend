"use client";

import Image from "next/image";
import { Property } from "@/app/properties/page";
import { useRouter } from "next/navigation";

export default function PropertyCard({ property }: { property: Property }) {
  const router = useRouter();
  const id = property._id;

  // Real Image (Cloudinary) else fallback
  const imageUrl =
    property.images && property.images.length > 0
      ? property.images[0]
      : `https://picsum.photos/seed/${property._id}/600/400`;

  return (
    <div
      className="relative border rounded-xl bg-white shadow hover:shadow-xl transition overflow-hidden cursor-pointer"
      onClick={() => router.push(`/properties/${id}`)}
    >
      {/* Image */}
      <img
        src={imageUrl}
        alt={property.title}

        className="object-cover object-center w-full h-[300px]"
      />

      {/* Content */}
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-900">{property.title}</h2>

        <p className="text-gray-600 text-sm">
          {property.area ? `${property.area}, ` : ""}{property.city}
        </p>

        {/* Price */}
        <p className="mt-2 text-blue-600 font-semibold text-lg">
          ₹{property.price?.value}{" "}
          <span className="text-sm text-gray-600">{property.price?.unit}</span>
        </p>

        {/* Property Type */}
        <p className="mt-1 text-sm text-gray-700 capitalize">
          Type: <span className="font-medium">{property.propertyType}</span>
        </p>

        {/* CTA Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/properties/${id}`);
          }}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
        >
          View Property
        </button>
      </div>
    </div>
  );
}
