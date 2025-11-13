"use client";

import { useEffect, useState, use } from "react";
import API from "@/lib/api";
import Image from "next/image";
import {
  FaMapMarkerAlt,
  FaBed,
  FaDollarSign,
  FaHome,
  FaInfoCircle,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { BsWhatsapp } from "react-icons/bs";

interface Property {
  id: number;
  title: string;
  location: string;
  type: string;
  bhk: number | string;
  price: number | string;
  description?: string;
  images?: string[];
  ownerName?: string;
  contact?: {
    phone?: string;
    email?: string;
  };
}

interface Props {
  params: Promise<{ id: string }>;
}

export default function PropertyPage({ params }: Props) {
  const unwrappedParams = use(params);
  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await API.get(`/properties/${unwrappedParams.id}`);
        setProperty(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProperty();
  }, [unwrappedParams.id]);

  if (!property) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-600 text-lg">
        Loading property details...
      </div>
    );
  }

  // fallback demo images if API has none
  const propertyImages =
    property.images && property.images.length > 0
      ? property.images
      : [
          `https://picsum.photos/seed/${property.id}/800/400`,

        ];

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 space-y-10">
      {/* === HEADER === */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          {property.title}
        </h1>
        <p className="text-blue-600 font-semibold text-lg bg-blue-50 px-4 py-2 rounded-md">
          ₹{property.price}
        </p>
      </div>

      {/* === IMAGE CAROUSEL === */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          className="w-full h-[400px] md:h-[500px]"
        >
          {propertyImages.map((img, i) => (
            <SwiperSlide key={i}>
              <Image
                src={img}
                alt={`Property image ${i + 1}`}
                width={1200}
                height={600}
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Location badge */}
        <div className="absolute bottom-4 left-4 bg-black/60 text-white px-4 py-2 rounded-lg text-sm md:text-base flex items-center gap-2">
          <FaMapMarkerAlt className="text-red-400" /> {property.location}
        </div>
      </div>

      {/* === PROPERTY INFO === */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quick Info */}
        <div className="col-span-2 bg-white rounded-xl shadow-md p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Property Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-gray-700">
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-blue-600" />{" "}
              <strong>Location:</strong> {property.location}
            </p>
            <p className="flex items-center gap-2">
              <FaBed className="text-green-600" /> <strong>BHK:</strong>{" "}
              {property.bhk}
            </p>
            <p className="flex items-center gap-2">
              <FaDollarSign className="text-yellow-600" />{" "}
              <strong>Price:</strong> ₹{property.price}
            </p>
            <p className="flex items-center gap-2">
              <FaHome className="text-purple-600" /> <strong>Type:</strong>{" "}
              {property.type}
            </p>
          </div>

          {/* Description */}
          <div className="mt-6 border-t border-gray-200 pt-4">
            <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-800 mb-2">
              <FaInfoCircle className="text-blue-500" /> About This Property
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {property.description ||
                "A beautiful and spacious property located in a peaceful area. Ideal for families, students, or working professionals. Close to essential amenities and public transport."}
            </p>
          </div>
        </div>

        {/* Contact Card */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-xl shadow-lg p-6 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-2xl font-semibold mb-2">Contact the Dealer</h3>
            <p className="text-sm opacity-80">
              Reach out directly to get more details or schedule a visit.
            </p>
            {/* {property.ownerName && ( */}
              <p className="font-medium text-lg">
                {/* {property.ownerName} */}
                Sachin Lawaniya   </p>
            {/* )} */}
            {/* {property.contact?.phone && ( */}
              <p className="flex items-center gap-2 text-lg font-bold mt-2">
                <FaPhoneAlt /> 9664455006
                 {/* {property.contact.phone} */}
              </p>
               {/* {property.ownerName && ( */}
              <p className="font-medium text-lg">
                {/* {property.ownerName} */}
              Sandeep Patodiya</p>
            {/* )} */}
            {/* {property.contact?.phone && ( */}
              <p className="flex items-center gap-2 text-lg font-bold mt-2">
                <FaPhoneAlt /> 1234567890
                 {/* {property.contact.phone} */}
              </p>
            {/* )} */}
            {property.contact?.email && (
              <p className="flex items-center gap-2 text-sm">
                <FaEnvelope /> {property.contact.email}
              </p>
            )}
          </div>

       <button
  onClick={() => {
    const currentUrl = window.location.href;
    const message = `Hi, I am interested in this property: ${currentUrl}
    property Name : ${property.title}`;
    const whatsappUrl = `https://wa.me/919664455006?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  }}
  className="mt-6 flex align-middle justify-center items-center gap-1 text-lg bg-green-500 text-white font-semibold px-5 py-3 rounded-lg hover:bg-green-400 transition"
>
  <BsWhatsapp/> Contact Now
</button>
        </div>
      </div>

      {/* === ADDITIONAL SECTION === */}
      <div className="bg-gray-50 rounded-xl p-6 mt-10 shadow-inner">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Nearby Highlights
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-gray-600">
          <li>🏫 Schools & Colleges Nearby</li>
          <li>🛒 Shopping Centers within 2km</li>
          <li>🚇 Metro/Bus Stop Accessibility</li>
          <li>🏥 Hospitals within 3km</li>
          <li>🌳 Parks & Green Spaces</li>
          <li>🍴 Cafes & Restaurants Nearby</li>
        </ul>
      </div>
    </div>
  );
}
