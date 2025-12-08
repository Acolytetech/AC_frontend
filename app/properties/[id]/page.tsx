"use client";

import { useEffect, useState, use } from "react";
import API from "@/lib/api";
import Image from "next/image";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import RecmondedProperties from "@/components/recomendedproperties";

interface Property {
  _id: string;
  title: string;
  tagline?: string;
  overview?: string;

  location?: {
    city?: string;
    area?: string;
    landmark?: string;
  };

  price?: {
    value: number;
    unit: string;
  };

  bhk?: string;
  type?: string;
  images?: string[];
}

interface Props {
  params: Promise<{ id: string }>;
}

export default function PropertyPage({ params }: Props) {
  const { id } = use(params);
  const [property, setProperty] = useState<Property | null>(null);

  const [lead, setLead] = useState({
    userName: "",
    userEmail: "",
    userPhone: "",
    message: "",
  });

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await API.get(`/properties/${id}`);
        setProperty(res.data?.property || res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProperty();
  }, [id]);

  if (!property) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-600">
        Loading property details...
      </div>
    );
  }

  const propertyImages =
    property.images?.length
      ? property.images
      : [`https://picsum.photos/seed/${property._id}/900/700`];

  const submitLead = async (e: any) => {
    e.preventDefault();
    try {
      await API.post(`/leads`, {
        propertyId: property._id,
        ...lead,
      });

      alert("Lead submitted successfully!");

      setLead({ userName: "", userEmail: "", userPhone: "", message: "" });
    } catch (err: any) {
      alert("Something went wrong!");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* ⭐ IMAGE GRID LIKE REALNEST UI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* LEFT BIG IMAGE */}
        <div className="md:col-span-3">
          <Image
            src={propertyImages[0]}
            alt="Main image"
            width={1200}
            height={600}
            className="rounded-xl w-full h-[450px] object-cover"
          />
        </div>

        {/* RIGHT SMALL IMAGES */}
        {/* <div className="grid grid-cols-1 gap-4">
          {propertyImages.slice(1, 3).map((img, i) => (
            <Image
              key={i}
              src={img}
              alt="Side image"
              width={600}
              height={300}
              className="rounded-xl w-full h-[215px] object-cover"
            />
          ))}
        </div> */}
      </div>



      {/* GRID 2 COLUMN (LEFT = DETAILS, RIGHT = CONTACT FORM) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">

        {/* LEFT SIDE CONTENT */}
        <div className="col-span-2">
           {/* TITLE + PRICE SECTION */}
      <div className="mb-10">

          <div className="flex items-center gap-7 justify-between">

          <h1 className="text-3xl font-bold">{property.title}</h1>
<h2 className="text-2xl font-bold">
            ₹ {property.price?.value}
            <span className="text-gray-500 text-sm"> {property.price?.unit}</span>
          </h2>
          </div>
          <div className="flex items-center gap-2 text-gray-600 mt-2">
            <FaMapMarkerAlt className="text-red-500" />
            {property.location?.area}, {property.location?.city}
          </div>




      </div>
          {/* Description */}
          <h2 className="text-xl font-semibold mb-3">Description:</h2>
          <p className="text-gray-700 leading-relaxed">
            {property.overview || "No description available."}
          </p>

          {/* Amenities */}
          <h3 className="text-xl font-semibold mt-8 mb-3">Amenities</h3>
          <div className="border rounded-xl p-5 bg-gray-50 grid grid-cols-2 gap-4">
            <p>🏡 {property.bhk || "3 BHK"}</p>
            <p>🛏️ Bedrooms</p>
            <p>🚿 Bathrooms</p>
            <p>📶 Wifi</p>
            <p>🚗 Parking</p>
            <p>🍳 Kitchen</p>
          </div>

          {/* Areas & Lot */}
          <h3 className="text-xl font-semibold mt-10 mb-3">Areas & Lot</h3>
          <div className="border rounded-xl p-5 bg-gray-50">
            <div className="grid grid-cols-2 py-2">
              <p className="font-semibold">City</p>
              <p>{property.location?.city}</p>
            </div>
            <div className="grid grid-cols-2 py-2">
              <p className="font-semibold">Area</p>
              <p>{property.location?.area}</p>
            </div>
            <div className="grid grid-cols-2 py-2">
              <p className="font-semibold">Landmark</p>
              <p>{property.location?.landmark}</p>
            </div>
            <div className="grid grid-cols-2 py-2">
              <p className="font-semibold">Property Type</p>
              <p>{property.type}</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE CONTACT CARD */}
        <div className="bg-white border rounded-2xl shadow-lg p-6">
          {/* Agent Section */}
          <div className="flex items-center gap-3">
            <Image
              src="https://i.pravatar.cc/100"
              alt="agent"
              width={50}
              height={50}
              className="rounded-full"
            />
            <div>
              <h3 className="font-semibold">Sandeep Patodia</h3>
              <p className="text-gray-500 text-sm">sandeep@gmail.com</p>
            </div>
          </div>

          <hr className="my-5" />

          {/* Contact Form */}
          <form onSubmit={submitLead} className="space-y-4">
            <input
              className="border w-full p-3 rounded-lg"
              placeholder="Full Name"
              value={lead.userName}
              onChange={(e) => setLead({ ...lead, userName: e.target.value })}
              required
            />

            <input
              className="border w-full p-3 rounded-lg"
              placeholder="Email Address"
              value={lead.userEmail}
              onChange={(e) => setLead({ ...lead, userEmail: e.target.value })}
              required
            />

            <input
              className="border w-full p-3 rounded-lg"
              placeholder="Phone"
              value={lead.userPhone}
              onChange={(e) => setLead({ ...lead, userPhone: e.target.value })}
            />

            <textarea
              className="border w-full p-3 rounded-lg"
              placeholder="Message"
              rows={4}
              value={lead.message}
              onChange={(e) => setLead({ ...lead, message: e.target.value })}
            ></textarea>

            <button className="bg-black text-white w-full py-3 rounded-full font-semibold">
              Submit
            </button>
          </form>
        </div>
      </div>
      <RecmondedProperties/>
    </div>
  );
}
