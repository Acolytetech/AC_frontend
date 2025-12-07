"use client";
import { useEffect, useState } from "react";
import API, { setAuthToken } from "@/lib/api";
import * as XLSX from "xlsx";

interface Lead {
  _id: string;
  createdAt:string;
  userName: string;
  userEmail: string;
  userPhone: string;
  message: string;
  status: string;
  property: {
    title: string;
    listedBy?: string;
    price: {
      value: string;
      unit: string;
    };
  };
}

export default function MyLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    const fetchLeads = async () => {
      const token = localStorage.getItem("token");
      setAuthToken(token || undefined);
      try {
        const res = await API.get("/leads");
        setLeads(res.data);
      } catch (err) {
        console.error("Error fetching leads:", err);
      }
    };
    fetchLeads();
  }, []);



  const statusColors: Record<string, string> = {
    done: "bg-green-100 text-green-800",
    inprocess: "bg-yellow-100 text-yellow-800",
    hold: "bg-red-100 text-red-800",
  };

  // Function to export table as Excel (.xlsx)
  const exportToExcel = () => {
    // Prepare data
    const data = leads.map((lead, index) => ({
      "S.No": index + 1,
      createdAt:lead.createdAt,
      Name: lead.userName,
      Email: lead.userEmail,
      Phone: lead.userPhone,
      Message: lead.message,
      Property: lead.property?.title || "N/A",
      Price: (lead.property?.price?.value || "N/A") + " " + (lead.property?.price?.unit || ""),
      "Listed By": lead.property?.listedBy || "N/A",
      Status: lead.status.charAt(0).toUpperCase() + lead.status.slice(1),
    }));

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(data);
    // Create workbook and append worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Leads");
    // Export workbook
    XLSX.writeFile(wb, "leads.xlsx");
  };

  return (
    <div className="p-4 overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Leads Table</h1>
        <button
          onClick={exportToExcel}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Export Excel
        </button>
      </div>

      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100 uppercase">
          <tr>
            <th className="px-4 py-2 border">S.No</th>
            <th className="px-4 py-2 border">created at</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Phone</th>
            <th className="px-4 py-2 border">Message</th>
            <th className="px-4 py-2 border">Property</th>
            <th className="px-4 py-2 border">Price</th>
            <th className="px-4 py-2 border">Listed By</th>
            <th className="px-4 py-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, index) => (
            <tr key={lead._id} className="hover:bg-gray-50 ">
              <td className="px-4 py-2 border font-bold text-center">{index + 1}</td>
<td className="px-4 py-2 border">
  {new Date(lead.createdAt).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })}
</td>
              <td className="px-4 py-2 border">{lead.userName}</td>
              <td className="px-4 py-2 border">{lead.userEmail}</td>
              <td className="px-4 py-2 border">{lead.userPhone}</td>
              <td className="px-4 py-2 border">{lead.message}</td>
              <td className="px-4 py-2 border">{lead.property?.title || "N/A"}</td>
              <td className="px-4 py-2 border">
                {lead.property?.price?.value || "N/A"} {lead.property?.price?.unit || ""}
              </td>
              <td className="px-4 py-2 border">{lead.property?.listedBy || "N/A"}</td>
              <td className="px-4 py-2 border">
                <span
                  className={`px-2 py-1 rounded-full font-semibold ${
                    statusColors[lead.status.toLowerCase()] || "bg-gray-100 text-gray-800"
                  }`}
                >
                  {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
