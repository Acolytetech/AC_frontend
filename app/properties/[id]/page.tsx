// "use client";

// import { useEffect, useState, use } from "react";
// import API from "@/lib/api";
// import Image from "next/image";
// import {
//   FaMapMarkerAlt,
//   FaBed,
//   FaDollarSign,
//   FaHome,
//   FaInfoCircle,
//   FaPhoneAlt,
//   FaEnvelope,
// } from "react-icons/fa";
// import { BsWhatsapp } from "react-icons/bs";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// // PROPERTY INTERFACE
// interface Property {
//   _id: string;
//   title: string;
//   tagline?: string;
//   overview?: string;

//   location?: {
//     city?: string;
//     area?: string;
//     landmark?: string;
//   };

//   price?: {
//     value: number;
//     unit: string;
//   };

//   bhk?: string;
//   type?: string;
//   images?: string[];
// }

// // PARAMS
// interface Props {
//   params: Promise<{ id: string }>;
// }

// export default function PropertyPage({ params }: Props) {
//   const { id } = use(params);
//   const [property, setProperty] = useState<Property | null>(null);

//   // Lead Popup
//   const [showForm, setShowForm] = useState(false);
//   const [lead, setLead] = useState({
//     userName: "",
//     userEmail: "",
//     userPhone: "",
//     message: "",
//   });

//   // Fetch Property
//   useEffect(() => {
//     const fetchProperty = async () => {
//       try {
//         const res = await API.get(`/properties/${id}`);
//         setProperty(res.data?.property || res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchProperty();
//   }, [id]);

//   if (!property) {
//     return (
//       <div className="flex justify-center items-center min-h-[60vh] text-gray-600">
//         Loading property details...
//       </div>
//     );
//   }

//   // Images
//   const propertyImages =
//     property.images?.length
//       ? property.images
//       : [`https://picsum.photos/seed/${property._id}/900/500`];

//   // Submit Lead
//   const submitLead = async (e: any) => {
//     e.preventDefault();

//     try {
//       await API.post(`/leads`, {
//         propertyId: property._id,
//         userName: lead.userName,
//         userEmail: lead.userEmail,
//         userPhone: lead.userPhone,
//         message: lead.message,
//       });

//       alert("Lead submitted successfully!");
//       setShowForm(false);
//       setLead({ userName: "", userEmail: "", userPhone: "", message: "" });
//     } catch (err: any) {
//       alert("Error: " + err?.response?.data?.message);
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 space-y-10">
//       {/* HEADER */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
//         <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
//           {property.title}
//         </h1>

//         <p className="text-blue-600 font-semibold text-lg bg-blue-50 px-4 py-2 rounded-md">
//           ₹{property.price?.value}
//           <span className="text-gray-600 text-sm"> {property.price?.unit}</span>
//         </p>
//       </div>

//       {/* CAROUSEL */}
//       <div className="relative rounded-2xl overflow-hidden shadow-lg">
//         <Swiper
//           modules={[Navigation, Pagination, Autoplay]}
//           navigation
//           pagination={{ clickable: true }}
//           autoplay={{ delay: 3000 }}
//           loop
//           className="w-full h-[400px] md:h-[500px]"
//         >
//           {propertyImages.map((img, i) => (
//             <SwiperSlide key={i}>
//               <Image
//                 src={img}
//                 alt="image"
//                 width={1200}
//                 height={600}
//                 className="w-full h-[500px] object-cover"
//               />
//             </SwiperSlide>
//           ))}
//         </Swiper>

//         {/* BADGE */}
//         <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg flex items-center gap-2">
//           <FaMapMarkerAlt />
//           {property.location?.area}, {property.location?.city}
//         </div>
//       </div>

//       {/* DETAILS SECTION */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* LEFT INFO */}
//         <div className="col-span-2 bg-white rounded-xl shadow-md p-6">
//           <h2 className="text-2xl font-semibold mb-3">Overview</h2>

//           <p className="text-gray-700 whitespace-pre-line">
//             {property.overview || "Details not available."}
//           </p>

//           <h3 className="text-xl font-semibold mt-6 mb-2 flex items-center gap-2">
//             <FaInfoCircle /> Property Details
//           </h3>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
//             <p>
//               <strong>City:</strong> {property.location?.city}
//             </p>
//             <p>
//               <strong>Area:</strong> {property.location?.area}
//             </p>
//             <p>
//               <strong>Landmark:</strong> {property.location?.landmark}
//             </p>
//             <p>
//               <strong>Type:</strong> {property.type}
//             </p>
//           </div>
//         </div>

//         {/* CONTACT CARD */}
//         <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-xl shadow-lg p-6 flex flex-col justify-between">
//           <div>
//             <h3 className="text-2xl font-semibold mb-2">Contact Dealer</h3>

//             {/* Hardcoded Numbers */}
//             <p className="flex items-center gap-2 text-lg font-bold mt-2">
//               <FaPhoneAlt /> 9664455006
//             </p>
//             <p className="flex items-center gap-2 text-lg font-bold mt-2">
//               <FaPhoneAlt /> 1234567890
//             </p>
//           </div>

//           <button
//             onClick={() => setShowForm(true)}
//             className="mt-6 w-full bg-white text-blue-700 font-semibold px-5 py-3 rounded-lg"
//           >
//             Enquire Now
//           </button>
//         </div>
//       </div>

//       {/* POPUP FORM */}
//       {showForm && (
//         <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
//             <h3 className="text-xl font-semibold mb-4">Send Enquiry</h3>

//             <form onSubmit={submitLead} className="space-y-3">
//               <input
//                 className="border p-2 w-full"
//                 placeholder="Your Name"
//                 value={lead.userName}
//                 onChange={(e) =>
//                   setLead({ ...lead, userName: e.target.value })
//                 }
//                 required
//               />

//               <input
//                 className="border p-2 w-full"
//                 placeholder="Email"
//                 value={lead.userEmail}
//                 onChange={(e) =>
//                   setLead({ ...lead, userEmail: e.target.value })
//                 }
//                 required
//               />

//               <input
//                 className="border p-2 w-full"
//                 placeholder="Phone"
//                 value={lead.userPhone}
//                 onChange={(e) =>
//                   setLead({ ...lead, userPhone: e.target.value })
//                 }
//               />

//               <textarea
//                 className="border p-2 w-full"
//                 placeholder="Message"
//                 value={lead.message}
//                 onChange={(e) =>
//                   setLead({ ...lead, message: e.target.value })
//                 }
//               />

//               <button className="bg-blue-600 w-full text-white p-2 rounded-md">
//                 Submit Lead
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setShowForm(false)}
//                 className="w-full mt-2 border p-2 rounded-md"
//               >
//                 Cancel
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useEffect, useState, use } from "react";
import API from "@/lib/api";
import Image from "next/image";
import { FaMapMarkerAlt, FaInfoCircle, FaPhoneAlt } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { AxiosError } from "axios";

// PROPERTY INTERFACE
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

// PARAMS
interface Props {
  params: Promise<{ id: string }>;
}

export default function PropertyPage({ params }: Props) {
  const { id } = use(params);
  const [property, setProperty] = useState<Property | null>(null);

  // Lead Popup
  const [showForm, setShowForm] = useState(false);

  const [lead, setLead] = useState({
    userName: "",
    userEmail: "",
    userPhone: "",
    message: "",
  });

  // Fetch Property
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

  // Images
  const propertyImages =
    property.images?.length
      ? property.images
      : [`https://picsum.photos/seed/${property._id}/900/500`];

  // Submit Lead (TYPE SAFE)
  const submitLead = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      await API.post(`/leads`, {
        propertyId: property._id,
        userName: lead.userName,
        userEmail: lead.userEmail,
        userPhone: lead.userPhone,
        message: lead.message,
      });

      alert("Lead submitted successfully!");
      setShowForm(false);
      setLead({ userName: "", userEmail: "", userPhone: "", message: "" });
    } catch (err: unknown) {
  const axiosError = err as AxiosError<{ message?: string }>;

  const message =
    axiosError.response?.data?.message || "Something went wrong";

  alert("Error: " + message);
}
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 space-y-10">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          {property.title}
        </h1>

        <p className="text-blue-600 font-semibold text-lg bg-blue-50 px-4 py-2 rounded-md">
          ₹{property.price?.value}
          <span className="text-gray-600 text-sm"> {property.price?.unit}</span>
        </p>
      </div>

      {/* CAROUSEL */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop
          className="w-full h-[400px] md:h-[500px]"
        >
          {propertyImages.map((img, i) => (
            <SwiperSlide key={i}>
              <Image
                src={img}
                alt="image"
                width={1200}
                height={600}
                className="w-full h-[500px] object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* BADGE */}
        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <FaMapMarkerAlt />
          {property.location?.area}, {property.location?.city}
        </div>
      </div>

      {/* DETAILS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT INFO */}
        <div className="col-span-2 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-3">Overview</h2>

          <p className="text-gray-700 whitespace-pre-line">
            {property.overview || "Details not available."}
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2 flex items-center gap-2">
            <FaInfoCircle /> Property Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
            <p>
              <strong>City:</strong> {property.location?.city}
            </p>
            <p>
              <strong>Area:</strong> {property.location?.area}
            </p>
            <p>
              <strong>Landmark:</strong> {property.location?.landmark}
            </p>
            <p>
              <strong>Type:</strong> {property.type}
            </p>
          </div>
        </div>

        {/* CONTACT CARD */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-xl shadow-lg p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-semibold mb-2">Contact Dealer</h3>

            {/* Hardcoded Numbers */}
            <p className="flex items-center gap-2 text-lg font-bold mt-2">
              <FaPhoneAlt /> 9664455006
            </p>

            <p className="flex items-center gap-2 text-lg font-bold mt-2">
              <FaPhoneAlt /> 1234567890
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="mt-6 w-full bg-white text-blue-700 font-semibold px-5 py-3 rounded-lg"
          >
            Enquire Now
          </button>
        </div>
      </div>

      {/* POPUP FORM */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Send Enquiry</h3>

            <form onSubmit={submitLead} className="space-y-3">
              <input
                className="border p-2 w-full"
                placeholder="Your Name"
                value={lead.userName}
                onChange={(e) =>
                  setLead({ ...lead, userName: e.target.value })
                }
                required
              />

              <input
                className="border p-2 w-full"
                placeholder="Email"
                value={lead.userEmail}
                onChange={(e) =>
                  setLead({ ...lead, userEmail: e.target.value })
                }
                required
              />

              <input
                className="border p-2 w-full"
                placeholder="Phone"
                value={lead.userPhone}
                onChange={(e) =>
                  setLead({ ...lead, userPhone: e.target.value })
                }
              />

              <textarea
                className="border p-2 w-full"
                placeholder="Message"
                value={lead.message}
                onChange={(e) =>
                  setLead({ ...lead, message: e.target.value })
                }
              />

              <button className="bg-blue-600 w-full text-white p-2 rounded-md">
                Submit Lead
              </button>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="w-full mt-2 border p-2 rounded-md"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

