"use client";
import { useState, FormEvent } from "react";
import API, { setAuthToken } from "@/lib/api";

interface LeadForm {
  propertyId: string;
  name: string;
  email: string;
  phone: string;
}

export default function SubmitLead() {
  const [form, setForm] = useState<LeadForm>({
    propertyId: "",
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    setAuthToken(token || undefined);

    try {
      await API.post("/leads", form);
      alert("Lead submitted successfully!");
      setForm({ propertyId: "", name: "", email: "", phone: "" }); // Reset form
    } catch (err) {
      alert(err|| "Error submitting lead");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <input
        placeholder="Property ID"
        value={form.propertyId}
        onChange={(e) => setForm({ ...form, propertyId: e.target.value })}
        className="border p-2 mb-2 w-full"
      />
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="border p-2 mb-2 w-full"
      />
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="border p-2 mb-2 w-full"
      />
      <input
        placeholder="Phone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="border p-2 mb-2 w-full"
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 w-full">
        Submit Lead
      </button>
    </form>
  );
}
