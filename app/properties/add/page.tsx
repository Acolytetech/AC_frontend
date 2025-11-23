// "use client";
// import { useState, ChangeEvent, FormEvent } from "react";
// import API, { setAuthToken } from "@/lib/api";

// interface PropertyForm {
//   title: string;
//   price: string | number;
//   location: string;
//   type: "rent" | "lease" | "buy";
//   bhk: string | number;
// }

// export default function AddPropertyPage() {
//   const [form, setForm] = useState<PropertyForm>({
//     title: "",
//     price: "",
//     location: "",
//     type: "rent",
//     bhk: "",
//   });

//   const [images, setImages] = useState<File[]>([]);

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");
//     setAuthToken(token || undefined);

//     const formData = new FormData();
//     Object.keys(form).forEach((key) =>
//       formData.append(key, form[key as keyof PropertyForm].toString())
//     );
//     images.forEach((file) => formData.append("images", file));

//     try {
//       await API.post("/properties", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       alert("Property added successfully!");
//       setForm({ title: "", price: "", location: "", type: "rent", bhk: "" });
//       setImages([]);
//     } catch  {
//       alert("Error adding property");
//     }
//   };

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) setImages(Array.from(e.target.files));
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4 max-w-lg mx-auto">
//       <input
//         type="text"
//         placeholder="Title"
//         value={form.title}
//         onChange={(e) => setForm({ ...form, title: e.target.value })}
//         className="border p-2 mb-2 w-full"
//       />
//       <input
//         type="number"
//         placeholder="Price"
//         value={form.price}
//         onChange={(e) => setForm({ ...form, price: e.target.value })}
//         className="border p-2 mb-2 w-full"
//       />
//       <input
//         type="text"
//         placeholder="Location"
//         value={form.location}
//         onChange={(e) => setForm({ ...form, location: e.target.value })}
//         className="border p-2 mb-2 w-full"
//       />
//       <select
//         value={form.type}
//         onChange={(e) => setForm({ ...form, type: e.target.value as PropertyForm["type"] })}
//         className="border p-2 mb-2 w-full"
//       >
//         <option value="rent">Rent</option>
//         <option value="lease">Lease</option>
//         <option value="buy">Buy</option>
//       </select>
//       <input
//         type="number"
//         placeholder="BHK"
//         value={form.bhk}
//         onChange={(e) => setForm({ ...form, bhk: e.target.value })}
//         className="border p-2 mb-2 w-full"
//       />
//       <input
//         type="file"
//         multiple
//         onChange={handleFileChange}
//         className="border mb-2 w-full"
//       />
//       <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full">
//         Add Property
//       </button>
//     </form>
//   );
// }
// "use client";

// import { useState, ChangeEvent, FormEvent } from "react";
// import API from "@/lib/api";

// export default function AddPropertyPage() {
//   const [form, setForm] = useState({
//     title: "",
//     tagline: "",
//     developer: "",
//     overview: "",
//     propertyType: "sale",

//     // Location
//     city: "",
//     area: "",
//     landmark: "",

//     // Price
//     priceValue: "",
//     priceUnit: "per sq. yd.",

//     // Lists
//     highlights: [""],
//     amenities: [""],
//     investmentBenefits: [""],

//     // Booking
//     bookingOffers: "",
//     bookingPlans: "",
//     bookingLoan: "",

//     // Contact
//     contactPrimaryName: "",
//     contactPrimaryPhone: "",
//     contactPrimaryEmail: "",
//     contactSecondaryName: "",
//     contactSecondaryPhone: "",
//     contactSecondaryRole: "",
//   });

//   const [images, setImages] = useState<File[]>([]);

//   // Basic field handler
//   const handleChange = (key: string, value: string) => {
//     setForm((prev) => ({ ...prev, [key]: value }));
//   };

//   // Arrays
//   const handleArrayChange = (key: string, index: number, value: string) => {
//     const arr = [...(form as any)[key]];
//     arr[index] = value;
//     setForm((prev) => ({ ...prev, [key]: arr }));
//   };

//   const addArrayField = (key: string) => {
//     setForm((prev) => ({
//       ...prev,
//       [key]: [...(prev as any)[key], ""],
//     }));
//   };

//   // Images
//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) setImages(Array.from(e.target.files));
//   };

//   // Submit
//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();

//     const fd = new FormData();

//     // Basic fields
//     fd.append("title", form.title);
//     fd.append("tagline", form.tagline);
//     fd.append("developer", form.developer);
//     fd.append("overview", form.overview);
//     fd.append("propertyType", form.propertyType);

//     // Location → backend builds `location: {}`
//     fd.append("city", form.city);
//     fd.append("area", form.area);
//     fd.append("landmark", form.landmark);

//     // Price object
//     fd.append("priceValue", form.priceValue);
//     fd.append("priceUnit", form.priceUnit);

//     // Arrays
//     form.highlights.forEach((v) => fd.append("highlights[]", v));
//     form.amenities.forEach((v) => fd.append("amenities[]", v));
//     form.investmentBenefits.forEach((v) => fd.append("investmentBenefits[]", v));

//     // Booking
//     fd.append("bookingOffers", form.bookingOffers);
//     fd.append("bookingPlans", form.bookingPlans);
//     fd.append("bookingLoan", form.bookingLoan);

//     // Contact
//     fd.append("contactPrimaryName", form.contactPrimaryName);
//     fd.append("contactPrimaryPhone", form.contactPrimaryPhone);
//     fd.append("contactPrimaryEmail", form.contactPrimaryEmail);
//     fd.append("contactSecondaryName", form.contactSecondaryName);
//     fd.append("contactSecondaryPhone", form.contactSecondaryPhone);
//     fd.append("contactSecondaryRole", form.contactSecondaryRole);

//     // Images
//     images.forEach((img) => fd.append("images", img));

//     try {
//       const res = await API.post("/properties", fd, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       alert("Property added successfully!");
//       console.log("Response:", res.data);
//     } catch (error: any) {
//       console.error(error.response?.data || error);
//       alert("Error adding property!");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-rose-50 via-pink-50 to-orange-50 py-10">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white/90 shadow-xl border rounded-2xl p-8 max-w-4xl mx-auto space-y-6"
//       >
//         <h2 className="text-3xl font-bold text-center text-[#C2185B]">
//           🏠 Add New Property
//         </h2>

//         {/* Title + Tagline */}
//         <div className="grid md:grid-cols-2 gap-4">
//           <input
//             type="text"
//             placeholder="Property Title"
//             className="jaipur-input"
//             value={form.title}
//             onChange={(e) => handleChange("title", e.target.value)}
//             required
//           />
//           <input
//             type="text"
//             placeholder="Tagline"
//             className="jaipur-input"
//             value={form.tagline}
//             onChange={(e) => handleChange("tagline", e.target.value)}
//           />
//         </div>

//         {/* Developer */}
//         <input
//           type="text"
//           placeholder="Developer Name"
//           className="jaipur-input"
//           value={form.developer}
//           onChange={(e) => handleChange("developer", e.target.value)}
//         />

//         {/* Property Type */}
//         <div>
//           <label className="text-[#C2185B] font-semibold mb-1 block">
//             Property Type
//           </label>
//           <select
//             value={form.propertyType}
//             onChange={(e) => handleChange("propertyType", e.target.value)}
//             className="jaipur-input"
//           >
//             <option value="sale">Sale</option>
//             <option value="rent">Rent</option>
//             <option value="lease">Lease</option>
//           </select>
//         </div>

//         {/* Overview */}
//         <textarea
//           placeholder="Overview"
//           className="jaipur-input min-h-[100px]"
//           value={form.overview}
//           onChange={(e) => handleChange("overview", e.target.value)}
//         />

//         {/* Location */}
//         <div className="grid md:grid-cols-3 gap-4">
//           <input
//             type="text"
//             placeholder="City"
//             value={form.city}
//             onChange={(e) => handleChange("city", e.target.value)}
//             className="jaipur-input"
//           />
//           <input
//             type="text"
//             placeholder="Area"
//             value={form.area}
//             onChange={(e) => handleChange("area", e.target.value)}
//             className="jaipur-input"
//           />
//           <input
//             type="text"
//             placeholder="Landmark"
//             value={form.landmark}
//             onChange={(e) => handleChange("landmark", e.target.value)}
//             className="jaipur-input"
//           />
//         </div>

//         {/* Price */}
//         <div className="grid md:grid-cols-2 gap-4">
//           <input
//             type="number"
//             placeholder="Price Value"
//             className="jaipur-input"
//             value={form.priceValue}
//             onChange={(e) => handleChange("priceValue", e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Unit (e.g. per sq. yd.)"
//             className="jaipur-input"
//             value={form.priceUnit}
//             onChange={(e) => handleChange("priceUnit", e.target.value)}
//           />
//         </div>

//         {/* Repeating Sections */}
//         {[
//           { label: "Highlights", key: "highlights" },
//           { label: "Amenities", key: "amenities" },
//           { label: "Investment Benefits", key: "investmentBenefits" },
//         ].map((section) => (
//           <div key={section.key}>
//             <h3 className="font-semibold text-[#C2185B] mb-1">
//               {section.label}
//             </h3>
//             {(form as any)[section.key].map((value: string, index: number) => (
//               <input
//                 key={index}
//                 type="text"
//                 className="jaipur-input mb-2"
//                 value={value}
//                 placeholder={`${section.label} ${index + 1}`}
//                 onChange={(e) =>
//                   handleArrayChange(section.key, index, e.target.value)
//                 }
//               />
//             ))}

//             <button
//               type="button"
//               onClick={() => addArrayField(section.key)}
//               className="text-sm text-[#E91E63] hover:underline"
//             >
//               + Add More
//             </button>
//           </div>
//         ))}

//         {/* Images */}
//         <div>
//           <h3 className="font-semibold text-[#C2185B] mb-1">
//             Upload Property Images
//           </h3>
//           <input type="file" multiple onChange={handleFileChange} />
//         </div>

//         <button
//           type="submit"
//           className="bg-gradient-to-r from-[#E91E63] to-[#FF9800] text-white w-full py-3 rounded-lg font-semibold shadow-lg hover:scale-[1.01] transition"
//         >
//           + Add Property
//         </button>
//       </form>
//     </div>
//   );
// }

"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import API from "@/lib/api";

/* ---------------------------------------------
   1️⃣  FORM TYPE (strongly typed, no any)
--------------------------------------------- */
interface PropertyForm {
  title: string;
  tagline: string;
  developer: string;
  overview: string;
  propertyType: string;

  city: string;
  area: string;
  landmark: string;

  priceValue: string;
  priceUnit: string;

  highlights: string[];
  amenities: string[];
  investmentBenefits: string[];

  bookingOffers: string;
  bookingPlans: string;
  bookingLoan: string;

  contactPrimaryName: string;
  contactPrimaryPhone: string;
  contactPrimaryEmail: string;
  contactSecondaryName: string;
  contactSecondaryPhone: string;
  contactSecondaryRole: string;
}

/* Keys that contain arrays */
type ArrayFieldKeys = "highlights" | "amenities" | "investmentBenefits";

export default function AddPropertyPage() {
  /* ---------------------------------------------
     2️⃣  FORM STATE (fully typed)
  --------------------------------------------- */
  const [form, setForm] = useState<PropertyForm>({
    title: "",
    tagline: "",
    developer: "",
    overview: "",
    propertyType: "sale",

    city: "",
    area: "",
    landmark: "",

    priceValue: "",
    priceUnit: "per sq. yd.",

    highlights: [""],
    amenities: [""],
    investmentBenefits: [""],

    bookingOffers: "",
    bookingPlans: "",
    bookingLoan: "",

    contactPrimaryName: "",
    contactPrimaryPhone: "",
    contactPrimaryEmail: "",
    contactSecondaryName: "",
    contactSecondaryPhone: "",
    contactSecondaryRole: "",
  });

  const [images, setImages] = useState<File[]>([]);

  /* ---------------------------------------------
     3️⃣  BASIC FIELD HANDLER
  --------------------------------------------- */
  const handleChange = (key: keyof PropertyForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  /* ---------------------------------------------
     4️⃣  ARRAY FIELD HANDLERS
  --------------------------------------------- */
  const handleArrayChange = (
    key: ArrayFieldKeys,
    index: number,
    value: string
  ) => {
    const updatedArray = [...form[key]];
    updatedArray[index] = value;

    setForm((prev) => ({
      ...prev,
      [key]: updatedArray,
    }));
  };

  const addArrayField = (key: ArrayFieldKeys) => {
    setForm((prev) => ({
      ...prev,
      [key]: [...prev[key], ""],
    }));
  };

  /* ---------------------------------------------
     5️⃣  IMAGE UPLOAD HANDLER
  --------------------------------------------- */
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImages(Array.from(e.target.files));
  };

  /* ---------------------------------------------
     6️⃣  FORM SUBMIT HANDLER
  --------------------------------------------- */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const fd = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => fd.append(`${key}[]`, v));
      } else {
        fd.append(key, value);
      }
    });

    images.forEach((img) => fd.append("images", img));

    try {
      const res = await API.post("/properties", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Property added successfully!");
      console.log("Response:", res.data);
    } catch (error) {
      console.error(error);
      alert("Error adding property!");
    }
  };

  /* ---------------------------------------------
     7️⃣  UI STARTS HERE
  --------------------------------------------- */
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-pink-50 to-orange-50 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 shadow-xl border rounded-2xl p-8 max-w-4xl mx-auto space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-[#C2185B]">
          🏠 Add New Property
        </h2>

        {/* Title + Tagline */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Property Title"
            className="jaipur-input"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Tagline"
            className="jaipur-input"
            value={form.tagline}
            onChange={(e) => handleChange("tagline", e.target.value)}
          />
        </div>

        {/* Developer */}
        <input
          type="text"
          placeholder="Developer Name"
          className="jaipur-input"
          value={form.developer}
          onChange={(e) => handleChange("developer", e.target.value)}
        />

        {/* Property Type */}
        <div>
          <label className="text-[#C2185B] font-semibold mb-1 block">
            Property Type
          </label>
          <select
            className="jaipur-input"
            value={form.propertyType}
            onChange={(e) => handleChange("propertyType", e.target.value)}
          >
            <option value="sale">Sale</option>
            <option value="rent">Rent</option>
            <option value="lease">Lease</option>
          </select>
        </div>

        {/* Overview */}
        <textarea
          className="jaipur-input min-h-[100px]"
          placeholder="Overview"
          value={form.overview}
          onChange={(e) => handleChange("overview", e.target.value)}
        />

        {/* Location */}
        <div className="grid md:grid-cols-3 gap-4">
          <input
            type="text"
            className="jaipur-input"
            placeholder="City"
            value={form.city}
            onChange={(e) => handleChange("city", e.target.value)}
          />
          <input
            type="text"
            className="jaipur-input"
            placeholder="Area"
            value={form.area}
            onChange={(e) => handleChange("area", e.target.value)}
          />
          <input
            type="text"
            className="jaipur-input"
            placeholder="Landmark"
            value={form.landmark}
            onChange={(e) => handleChange("landmark", e.target.value)}
          />
        </div>

        {/* Price */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="number"
            className="jaipur-input"
            placeholder="Price Value"
            value={form.priceValue}
            onChange={(e) => handleChange("priceValue", e.target.value)}
          />
          <input
            type="text"
            className="jaipur-input"
            placeholder="Unit (e.g. per sq. yd.)"
            value={form.priceUnit}
            onChange={(e) => handleChange("priceUnit", e.target.value)}
          />
        </div>

        {/* Repeating Sections */}
        {[
          { label: "Highlights", key: "highlights" as ArrayFieldKeys },
          { label: "Amenities", key: "amenities" as ArrayFieldKeys },
          {
            label: "Investment Benefits",
            key: "investmentBenefits" as ArrayFieldKeys,
          },
        ].map((section) => (
          <div key={section.key}>
            <h3 className="font-semibold text-[#C2185B] mb-1">
              {section.label}
            </h3>

            {form[section.key].map((value, index) => (
              <input
                key={index}
                type="text"
                className="jaipur-input mb-2"
                placeholder={`${section.label} ${index + 1}`}
                value={value}
                onChange={(e) =>
                  handleArrayChange(section.key, index, e.target.value)
                }
              />
            ))}

            <button
              type="button"
              className="text-sm text-[#E91E63] hover:underline"
              onClick={() => addArrayField(section.key)}
            >
              + Add More
            </button>
          </div>
        ))}

        {/* Images */}
        <div>
          <h3 className="font-semibold text-[#C2185B] mb-1">
            Upload Property Images
          </h3>
          <input type="file" multiple onChange={handleFileChange} />
        </div>

        <button
          type="submit"
          className="bg-gradient-to-r from-[#E91E63] to-[#FF9800] text-white w-full py-3 rounded-lg font-semibold shadow-lg hover:scale-[1.01] transition"
        >
          + Add Property
        </button>
      </form>
    </div>
  );
}
