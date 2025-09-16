"use client";
import { useEffect, useState } from "react";
import API, { setAuthToken } from "@/lib/api";

interface Property {
  _id: string;
  title: string;
  location: string;
  type: string;
  bhk?: number;
  price?: number;
  status?: string;
  images?: string[];
  listedBy?: { name?: string; email?: string };
}

export default function AdminProperties() {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const token = localStorage.getItem("token");
      setAuthToken(token || undefined);

      try {
        const res = await API.get<Property[]>("/properties");
        setProperties(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProperties();
  }, []);

  const handleApprove = async (id: string, status: "approved" | "rejected") => {
    const token = localStorage.getItem("token");
    setAuthToken(token || undefined);

    try {
      await API.put(`/properties/${id}/status`, { status });
      alert(`Property ${status}`);
      // Update state locally
      setProperties((prev) =>
        prev.map((prop) => (prop._id === id ? { ...prop, status } : prop))
      );
    } catch (err) {
      alert(err || "Error updating property");
    }
  };

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      {properties.map((prop) => (
        <div key={prop._id} className="border p-2 rounded shadow">
          <h3 className="font-bold">{prop.title}</h3>
          <p>
            {prop.location} - {prop.type}
          </p>
          <div className="mt-2">
            <button
              onClick={() => handleApprove(prop._id, "approved")}
              className="bg-green-500 text-white px-2 py-1 mr-2 rounded"
            >
              Approve
            </button>
            <button
              onClick={() => handleApprove(prop._id, "rejected")}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
