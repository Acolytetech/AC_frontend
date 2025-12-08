"use client";

import Image from "next/image";
import { Property } from "@/app/properties/page";
import { useRouter } from "next/navigation";
import { CiLocationOn } from "react-icons/ci";

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
      className="relative shadow-xl shadow-gray-500 rounded-xl bg-white hover:-translate-y-3 duration-300 hover:shadow-xl transition overflow-hidden cursor-pointer"
      onClick={() => router.push(`/properties/${id}`)}
    >
      <div className="relative">

      {/* Image */}
      <img
        src={imageUrl}
        alt={property.title}

        className="object-cover object-center w-full h-[250px]"
        />
        <button className="rounded-full bg-white text-back font-bold uppercase absolute top-2 right-2 p-2 px-4">for sale </button>
        </div>

      {/* Content */}
      <div className="p-4">
         {/* Price */}
        <p className="mt-2 text-blue-600 font-bold text-lg">
          ₹{property.price?.value}{" "}
          <span className="text-sm text-gray-600">{property.price?.unit}</span>
        </p>
        <h2 className="text-lg font-bold text-gray-900">{property.title}</h2>

        <p className="text-gray-900 text-xl  ">
          <CiLocationOn fill="red" className="text-red-600 "/> {property.location?.area ? `${property.location?.area}, ` : ""}{property.location?.city}
        </p>



        {/* Property Type
        <p className="mt-1 text-sm text-gray-700 capitalize">
          Type: <span className="font-medium">{property.propertyType}</span>
        </p> */}

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
