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
"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import API from "@/lib/api";

interface PropertyForm {
  title: string;
  tagline: string;
  city: string;
  area: string;
  landmark: string;
  priceValue: string | number;
  priceUnit: string;
  status: string;
  developer: string;
  overview: string;
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
  propertyType: "lease" | "rent" | "sale";
}

export default function AddPropertyPage() {
  const [form, setForm] = useState<PropertyForm>({
    title: "",
    tagline: "",
    city: "",
    area: "",
    landmark: "",
    priceValue: "",
    priceUnit: "per sq. yd.",
    status: "",
    developer: "",
    overview: "",
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
    propertyType: "sale",
  });

  const [images, setImages] = useState<File[]>([]);

  const handleChange = (key: keyof PropertyForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleArrayChange = (
    key: keyof PropertyForm,
    index: number,
    value: string
  ) => {
    const updated = [...(form[key] as string[])];
    updated[index] = value;
    setForm((prev) => ({ ...prev, [key]: updated }));
  };

  const addArrayField = (key: keyof PropertyForm) => {
    setForm((prev) => ({ ...prev, [key]: [...(prev[key] as string[]), ""] }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => formData.append(`${key}[]`, v));
      } else {
        formData.append(key, value.toString());
      }
    });
    images.forEach((file) => formData.append("images", file));

    try {
      const res = await API.post("/properties", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Property added successfully!");
      console.log("Server Response:", res.data);
    } catch (err: any) {
      console.error("Error:", err.response?.data || err);
      alert("❌ Error adding property. Check console for details.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-pink-50 to-orange-50 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-md shadow-xl border border-pink-200 rounded-2xl p-8 max-w-4xl mx-auto space-y-5"
      >
        <h2 className="text-3xl font-bold text-center text-[#C2185B] mb-6">
          🏠 Add Property – Jaipur Theme
        </h2>

        <div className="grid md:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Property Title"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="jaipur-input"
            required
          />
          <input
            type="text"
            placeholder="Tagline"
            value={form.tagline}
            onChange={(e) => handleChange("tagline", e.target.value)}
            className="jaipur-input"
          />
        </div>

        <input
          type="text"
          placeholder="Developer Name"
          value={form.developer}
          onChange={(e) => handleChange("developer", e.target.value)}
          className="jaipur-input"
        />

        {/* Property Type */}
        <div>
          <label className="block text-[#C2185B] font-medium mb-1">
            Property Type
          </label>
          <select
            value={form.propertyType}
            onChange={(e) =>
              handleChange("propertyType", e.target.value as "lease" | "rent" | "sale")
            }
            className="jaipur-input"
          >
            <option value="sale">Sale</option>
            <option value="rent">Rent</option>
            <option value="lease">Lease</option>
          </select>
        </div>

        <textarea
          placeholder="Overview"
          value={form.overview}
          onChange={(e) => handleChange("overview", e.target.value)}
          className="jaipur-input min-h-[100px]"
        />

        {/* Location */}
        <div className="grid md:grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="City"
            value={form.city}
            onChange={(e) => handleChange("city", e.target.value)}
            className="jaipur-input"
          />
          <input
            type="text"
            placeholder="Area"
            value={form.area}
            onChange={(e) => handleChange("area", e.target.value)}
            className="jaipur-input"
          />
          <input
            type="text"
            placeholder="Landmark"
            value={form.landmark}
            onChange={(e) => handleChange("landmark", e.target.value)}
            className="jaipur-input"
          />
        </div>

        {/* Price */}
        <div className="grid md:grid-cols-2 gap-3">
          <input
            type="number"
            placeholder="Price Value"
            value={form.priceValue}
            onChange={(e) => handleChange("priceValue", e.target.value)}
            className="jaipur-input"
          />
          <input
            type="text"
            placeholder="Unit (e.g. per sq. yd.)"
            value={form.priceUnit}
            onChange={(e) => handleChange("priceUnit", e.target.value)}
            className="jaipur-input"
          />
        </div>

        {/* Highlights / Amenities / Investment Benefits */}
        {[
          { label: "Highlights", key: "highlights" },
          { label: "Amenities", key: "amenities" },
          { label: "Investment Benefits", key: "investmentBenefits" },
        ].map((section) => (
          <div key={section.key}>
            <h3 className="text-lg font-semibold text-[#C2185B] mb-1">
              {section.label}
            </h3>
            {(form[section.key as keyof PropertyForm] as string[]).map(
              (item, i) => (
                <input
                  key={i}
                  type="text"
                  placeholder={`${section.label} ${i + 1}`}
                  value={item}
                  onChange={(e) =>
                    handleArrayChange(
                      section.key as keyof PropertyForm,
                      i,
                      e.target.value
                    )
                  }
                  className="jaipur-input mb-2"
                />
              )
            )}
            <button
              type="button"
              onClick={() => addArrayField(section.key as keyof PropertyForm)}
              className="text-sm text-[#E91E63] hover:underline"
            >
              + Add More
            </button>
          </div>
        ))}

        {/* Upload */}
        <div>
          <h3 className="text-lg font-semibold text-[#C2185B] mb-1">
            Upload Property Images
          </h3>
          <input type="file" multiple onChange={handleFileChange} />
        </div>

        <button
          type="submit"
          className="bg-gradient-to-r from-[#E91E63] to-[#FF9800] hover:from-[#d81b60] hover:to-[#fb8c00] text-white font-semibold px-6 py-3 rounded-lg w-full transition-all duration-300 shadow-md"
        >
          + Add Property
        </button>
      </form>
    </div>
  );
}

