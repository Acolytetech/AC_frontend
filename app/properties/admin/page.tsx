"use client";

import { useEffect, useState } from "react";
import API, { setAuthToken } from "@/lib/api";
import {
  Trash2,
  Edit,
  CheckCircle,
  XCircle,
  Building,
  Users,
  List,
  LayoutDashboard,
  Check,
  X,
} from "lucide-react";

interface Property {
  _id: string;
  title: string;
  tagline?: string;
  overview?: string;
  location?: { city?: string; area?: string; landmark?: string };
  price?: { value: number; unit: string };
  bhk?: string;
  type?: string;
  images?: string[];
  status?: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role:string;
}

interface Lead {
  _id: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  message: string;
}

export default function AdminPanel() {

  const [activeTab, setActiveTab] = useState<"dashboard" | "leads" | "properties" | "users">("dashboard");

  const [properties, setProperties] = useState<Property[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);

  const [counts, setCounts] = useState({
    totalProperties: 0,
    approvedProperties: 0,
    totalUsers: 0,
    totalLeads: 0,
  });
useEffect(() => {
  const storedRole = localStorage.getItem("role");

  if (!storedRole) {
    alert("You must login first!");
    window.location.href = "/login";
    return;
  }

  if (storedRole !== "admin") {
    alert("You are not an admin!");
    window.location.href = "/";
    return;
  }
}, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuthToken(token || undefined);
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    await fetchProperties();
    await fetchUsers();
    await fetchLeads();
  };

  const fetchProperties = async () => {
    try {
      const res = await API.get("/properties");

      const list = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.properties)
        ? res.data.properties
        : Array.isArray(res.data.data)
        ? res.data.data
        : [];

      setProperties(list);

      setCounts((prev) => ({
        ...prev,
        totalProperties: list.length,
        approvedProperties: list.filter((p: any) => p.status?.toLowerCase() === "approved").length,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await API.get<User[]>("/auth");
      setUsers(res.data);
      setCounts((prev) => ({ ...prev, totalUsers: res.data.length }));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchLeads = async () => {
    try {
      const res = await API.get<Lead[]>("/leads");
      setLeads(res.data);
      setCounts((prev) => ({ ...prev, totalLeads: res.data.length }));
    } catch (err) {
      console.error(err);
    }
  };

  const updatePropertyStatus = async (id: string, status: "approved" | "rejected") => {
    try {
      await API.put(`/properties/${id}/status`, { status });
      alert(`Property ${status}`);
      fetchProperties();
    } catch (err) {
      console.error(err);
      alert("Error updating property");
    }
  };

  const deleteProperty = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await API.delete(`/properties/${id}`);
      alert("Property Deleted");
      fetchProperties();
    } catch (err) {
      console.error(err);
    }
  };
const updateUser = async (id: string, updatedData: { name: string; role: string }) => {
  try {
    await API.put(`/auth/${id}`, updatedData); // Your backend route to update user
    alert("User updated successfully");
    fetchUsers(); // refresh users list
  } catch (err: any) {
    console.error(err);
    alert(err.response?.data?.message || "Error updating user");
  }
};

  const deleteUser = async (id: string) => {
    if (!confirm("Delete User?")) return;
    try {
      await API.delete(`/auth/${id}`);
      alert("User removed");
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
        <nav className="space-y-3">
          <button
            className={`flex items-center gap-2 w-full p-2 rounded ${activeTab === "dashboard" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab("dashboard")}
          >
            <LayoutDashboard size={18} /> Summary
          </button>
          <button
            className={`flex items-center gap-2 w-full p-2 rounded ${activeTab === "leads" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab("leads")}
          >
            <List size={18} /> Leads
          </button>
          <button
            className={`flex items-center gap-2 w-full p-2 rounded ${activeTab === "properties" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab("properties")}
          >
            <Building size={18} /> Properties
          </button>
          <button
            className={`flex items-center gap-2 w-full p-2 rounded ${activeTab === "users" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab("users")}
          >
            <Users size={18} /> Users
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        {activeTab === "dashboard" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Dashboard Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card title="Total Properties" value={counts.totalProperties} />
              <Card title="Approved Properties" value={counts.approvedProperties} />
              <Card title="Total Users" value={counts.totalUsers} />
              <Card title="Total Leads" value={counts.totalLeads} />
            </div>
          </div>
        )}

        {activeTab === "leads" && (
          <LeadsTable leads={leads} />
        )}

        {activeTab === "properties" && (
          <PropertiesTable
            properties={properties}
            updatePropertyStatus={updatePropertyStatus}
            deleteProperty={deleteProperty}
          />
        )}

        {activeTab === "users" && (
<UsersTable users={users} deleteUser={deleteUser} updateUser={updateUser} />
        )}
      </div>
    </div>
  );
}

// ---------------- COMPONENTS ----------------
const Card = ({ title, value }: { title: string; value: number }) => (
  <div className="bg-white shadow p-4 rounded-lg border">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
);

const LeadsTable = ({ leads }: { leads: Lead[] }) => (
  <table className="w-full bg-white text-left shadow rounded">
    <thead className="bg-gray-200">
      <tr>
        <th className="p-2">Name</th>
        <th className="p-2">Email</th>
        <th className="p-2">Phone</th>
        <th className="p-2">Message</th>
      </tr>
    </thead>
    <tbody>
      {leads.map((lead) => (
        <tr key={lead._id} className="border-b">
          <td className="p-2">{lead.userName}</td>
          <td className="p-2">{lead.userEmail}</td>
          <td className="p-2">{lead.userPhone}</td>
          <td className="p-2">{lead.message}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const PropertiesTable = ({
  properties,
  updatePropertyStatus,
  deleteProperty,
}: {
  properties: Property[];
  updatePropertyStatus: (id: string, status: "approved" | "rejected") => void;
  deleteProperty: (id: string) => void;
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {properties.map((prop) => (
      <div key={prop._id} className="bg-white shadow p-4 rounded-md border">
        <h3 className="text-lg font-semibold">{prop.title}</h3>
        <p className="text-gray-600">
          {prop.location?.city}, {prop.location?.area}, {prop.location?.landmark}
        </p>
        <p className="text-gray-600">{prop.type}</p>

        <div className="mt-3 flex gap-2">
          <button
            onClick={() => updatePropertyStatus(prop._id, "approved")}
            className="bg-green-500 text-white px-2 py-1 rounded flex items-center gap-1"
          >
            <CheckCircle size={16} /> Approve
          </button>

          <button
            onClick={() => updatePropertyStatus(prop._id, "rejected")}
            className="bg-red-500 text-white px-2 py-1 rounded flex items-center gap-1"
          >
            <XCircle size={16} /> Reject
          </button>

          <button
            onClick={() => deleteProperty(prop._id)}
            className="bg-gray-700 text-white px-2 py-1 rounded flex items-center gap-1"
          >
            <Trash2 size={16} /> Delete
          </button>
        </div>
      </div>
    ))}
  </div>
);


const UsersTable = ({
  users,
  deleteUser,
  updateUser,
}: {
  users: User[];
  deleteUser: (id: string) => void;
  updateUser: (id: string, updatedData: { name: string; role: string }) => void;
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: "", role: "user" });

  const startEdit = (user: User) => {
    setEditingId(user._id);
    setEditForm({ name: user.name, role: user.role || "user" });
  };

  const cancelEdit = () => setEditingId(null);

  const saveEdit = (id: string) => {
    updateUser(id, editForm);
    setEditingId(null);
  };

  return (
    <table className="w-full bg-white shadow rounded">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-2 text-left">Name</th>
          <th className="p-2 text-left">Email</th>
          <th className="p-2">Role</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id} className="border-b">
            <td className="p-2">
              {editingId === user._id ? (
                <input
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="border p-1 w-full"
                />
              ) : (
                user.name
              )}
            </td>
            <td className="p-2">{user.email}</td>
            <td className="p-2">
              {editingId === user._id ? (
                <select
                  value={editForm.role}
                  onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                  className="border p-1"
                >
                  <option value="user">User</option>
                  <option value="partner">Partner</option>
                  <option value="admin">Admin</option>
                </select>
              ) : (
                user.role
              )}
            </td>
            <td className="p-2 flex gap-2 justify-center">
              {editingId === user._id ? (
                <>
                  <button
                    onClick={() => saveEdit(user._id)}
                    className="bg-green-500 text-white px-2 py-1 rounded flex items-center gap-1"
                  >
                    <Check size={16} /> Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-gray-500 text-white px-2 py-1 rounded flex items-center gap-1"
                  >
                    <X size={16} /> Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => startEdit(user)}
                    className="bg-blue-500 text-white px-2 py-1 rounded flex items-center gap-1"
                  >
                    <Edit size={16} /> Edit
                  </button>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded flex items-center gap-1"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

