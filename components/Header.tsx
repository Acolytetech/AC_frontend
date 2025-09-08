"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  role: string;
  exp: number;
  iat: number;
}

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        setIsLoggedIn(true);
        const decoded = jwtDecode<TokenPayload>(token);
        setRole(decoded.role); // partner / admin / user
      }
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      alert("Logged out successfully!");
      setIsLoggedIn(false);
      setRole(null);
      router.push("/login");
    }
  };

  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center">
      <Link href="/">
        <h1 className="text-xl font-bold text-white-500 capitalize">Jaipur Accommodation</h1>
      </Link>
      <div className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/properties">Properties</Link>
           <Link href="/about">About</Link>
        <Link href="/contact_us">Contact US</Link>
        {isLoggedIn && role === "partner" && (
          <Link href="/add-property" className="bg-green-500 px-3 py-1 rounded">
            Add Property
          </Link>
        )}
        
      </div>
        <div className="flex gap-4 font-medium">
       
      <button className="bg-blue-500 px-3 py-1 rounded">Partners with us</button>
      <button className="bg-blue-500 px-3 py-1 rounded"> Booking</button>
        {isLoggedIn ? (
          <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">
            Logout
          </button>
        ) : (
          <Link href="/login" className="bg-blue-500 px-3 py-1 rounded">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
