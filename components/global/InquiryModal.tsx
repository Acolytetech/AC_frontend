"use client";

import { useState } from "react";
import { X } from "lucide-react";
import API, { setAuthToken } from "@/lib/api";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyId?: string;
  propertyTitle?: string;
  source?: string;
}

export default function InquiryModal({ isOpen, onClose, propertyId, propertyTitle, source }: InquiryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    propertyType: propertyTitle || "Apartment",
    message: "",
    source: source || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const submitLead = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Optional: Set auth token if you use it
      const token = localStorage.getItem("token");
      setAuthToken(token || undefined);

      const leadData = {
        propertyId: propertyId || undefined,
        userName: formData.name,
        userEmail: formData.email,
        userPhone: formData.phone,
        message: `Location: ${formData.location || "N/A"}\nMessage: ${formData.message || "N/A"}`,
        status: "inprocess",
        property: {
          title: formData.propertyType,
          listedBy: "",
          price: { value: "", unit: "" },
        },
        source: formData.source || "inquiryform",
      };

      const res = await API.post("/leads", leadData);

      if (res.status === 200 || res.status === 201) {
        alert("Inquiry submitted successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          location: "",
          propertyType: propertyTitle || "Apartment",
          message: "",
          source: source || "inquiryform",
        });
        onClose();
      } else {
        alert("Failed to submit inquiry. Please try again.");
      }
    } catch (err: any) {
      console.error("Error submitting inquiry:", err.response || err);
      const message = err.response?.data?.message || "Something went wrong";
      alert("Failed to submit inquiry: " + message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
        >
          <X size={24} />
        </button>

        <h3 className="text-xl font-semibold mb-4">Send Enquiry</h3>

        <form onSubmit={submitLead} className="space-y-3">
          <input
            name="name"
            className="border p-2 w-full"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            className="border p-2 w-full"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            className="border p-2 w-full"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <input
            name="location"
            className="border p-2 w-full"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
          />

          <select
            name="propertyType"
            value={formData.propertyType}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="1BHK">1BHK</option>
            <option value="2BHK">2BHK</option>
            <option value="3BHK">3BHK</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Plot">Plot</option>
          </select>

          <textarea
            name="message"
            className="border p-2 w-full"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
          />

          <input type="hidden" name="source" value={formData.source} />

          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-blue-600 w-full text-white p-2 rounded-md ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isSubmitting ? "Submitting..." : "Submit Lead"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full mt-2 border p-2 rounded-md"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
