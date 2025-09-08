"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import API, { setAuthToken } from "@/lib/api";

interface PropertyForm {
  title: string;
  price: string | number;
  location: string;
  type: "rent" | "lease" | "buy";
  bhk: string | number;
}

export default function AddPropertyPage() {
  const [form, setForm] = useState<PropertyForm>({
    title: "",
    price: "",
    location: "",
    type: "rent",
    bhk: "",
  });

  const [images, setImages] = useState<File[]>([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    setAuthToken(token || undefined);

    const formData = new FormData();
    Object.keys(form).forEach((key) =>
      formData.append(key, form[key as keyof PropertyForm].toString())
    );
    images.forEach((file) => formData.append("images", file));

    try {
      await API.post("/properties", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Property added successfully!");
      setForm({ title: "", price: "", location: "", type: "rent", bhk: "" });
      setImages([]);
    } catch  {
      alert("Error adding property");
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImages(Array.from(e.target.files));
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-lg mx-auto">
      <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="text"
        placeholder="Location"
        value={form.location}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
        className="border p-2 mb-2 w-full"
      />
      <select
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value as PropertyForm["type"] })}
        className="border p-2 mb-2 w-full"
      >
        <option value="rent">Rent</option>
        <option value="lease">Lease</option>
        <option value="buy">Buy</option>
      </select>
      <input
        type="number"
        placeholder="BHK"
        value={form.bhk}
        onChange={(e) => setForm({ ...form, bhk: e.target.value })}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="border mb-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full">
        Add Property
      </button>
    </form>
  );
}
