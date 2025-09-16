"use client";
import { useEffect, useState } from "react";
import API from "@/lib/api";
import Image from "next/image";
import { FaMapMarkerAlt, FaBed, FaDollarSign, FaHome, FaInfoCircle } from "react-icons/fa";

interface Property {
  id: number;
  title: string;
  location: string;
  type: string;
  bhk: number | string;
  price: number | string;
  description?: string;
}

interface Props {
  params: { id: string };
}

export default function PropertyPage({ params }: Props) {
  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await API.get(`/properties/${params.id}`);
        setProperty(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProperty();
  }, [params.id]);

  if (!property) return <p>Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-800">{property.title}</h1>

      {/* Main Image */}
      <Image
        src={`https://picsum.photos/seed/${property.id}/800/400`}
        alt={property.title}
        width={800}
        height={400}
        className="rounded-lg shadow-lg object-cover w-full h-80"
      />

      {/* Property Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-md">
        <div className="space-y-3">
          <p className="flex items-center gap-2 text-gray-700">
            <FaMapMarkerAlt className="text-blue-600" /> <strong>Location:</strong> {property.location}
          </p>
          <p className="flex items-center gap-2 text-gray-700">
            <FaBed className="text-green-600" /> <strong>BHK:</strong> {property.bhk}
          </p>
          <p className="flex items-center gap-2 text-gray-700">
            <FaDollarSign className="text-yellow-600" /> <strong>Price:</strong> ₹{property.price}
          </p>
          <p className="flex items-center gap-2 text-gray-700">
            <FaHome className="text-purple-600" /> <strong>Type:</strong> {property.type}
          </p>
        </div>

        {/* Short Description */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <FaInfoCircle className="text-blue-500" /> About Property
          </h2>
          <p className="text-gray-600">
            {property.description || "This is a beautiful property located in a prime area. Perfect for students and families alike. Contact us for more details!"}
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-4">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition">
          Contact Owner
        </button>
      </div>
    </div>
  );
}
