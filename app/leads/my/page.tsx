"use client";
import { useEffect, useState } from "react";
import API, { setAuthToken } from "@/lib/api";
import LeadCard from "@/components/LeadCard";

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  property: string;
  status: string;
}

export default function MyLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    const fetchLeads = async () => {
      const token = localStorage.getItem("token");
      setAuthToken(token || undefined);

      try {
        const res = await API.get<Lead[]>("/leads/my");
        setLeads(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLeads();
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      {leads.map((lead) => (
        <LeadCard key={lead._id} lead={lead} />
      ))}
    </div>
  );
}
