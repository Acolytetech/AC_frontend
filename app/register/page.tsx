"use client";
import { useState, FormEvent } from "react";
import API from "@/lib/api";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("Registration successful!");
      router.push("/login");
    } catch (err) {
      alert(err || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="border p-2 mb-2 w-full"
      />
      <select
        onChange={(e) => setForm({ ...form, role: e.target.value })}
        className="border p-2 mb-2 w-full"
      >
        <option value="user">User</option>
        <option value="partner">Partner</option>
      </select>
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 w-full"
      >
        Register
      </button>
    </form>
  );
}
