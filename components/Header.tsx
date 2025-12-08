"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import API from "@/lib/api";
import InquiryModal from "./global/InquiryModal";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  const router = useRouter();

  // Fetch logged-in user from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/getme", { withCredentials: true });
        setIsLoggedIn(true);
        setRole(res.data.role);
      } catch (err) {
        setIsLoggedIn(false);
        setRole(null);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout", {}, { withCredentials: true });
      setIsLoggedIn(false);
      setRole(null);
      alert("Logged out successfully!");
      router.push("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <nav className="bg-black text-white p-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              src="/img/jplogo.png"
              width={200}
              height={100}
              alt="jaipur home dreams"
              className="object-center object-cover"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 items-center">
            <Link href="/">Home</Link>
            <Link href="/properties">Properties</Link>
            <Link href="/about">About</Link>
            <Link href="/contact_us">Contact Us</Link>

            {isLoggedIn && role === "partner" && (
              <Link
                href="/add-property"
                className="bg-green-500 px-3 py-1 rounded"
              >
                Add Property
              </Link>
            )}

            <Link
              href="/partner_with_us"
              className="bg-blue-500 px-3 py-1 rounded"
            >
              Partners with us
            </Link>

            <button
              className="bg-blue-500 px-3 py-1 rounded"
              onClick={() => setIsInquiryOpen(true)}
            >
              Inquiry Now
            </button>

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded"
              >
                Logout
              </button>
            ) : (
              <Link href="/login" className="bg-blue-500 px-3 py-1 rounded">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="flex flex-col gap-4 mt-4 md:hidden">
            <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/properties" onClick={() => setMenuOpen(false)}>Properties</Link>
            <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
            <Link href="/contact_us" onClick={() => setMenuOpen(false)}>Contact Us</Link>

            {isLoggedIn && role === "partner" && (
              <Link
                href="/add-property"
                className="bg-green-500 px-3 py-1 rounded"
                onClick={() => setMenuOpen(false)}
              >
                Add Property
              </Link>
            )}

            <button
              className="bg-blue-500 px-3 py-1 rounded"
              onClick={() => {
                setIsInquiryOpen(true);
                setMenuOpen(false);
              }}
            >
              Inquiry Now
            </button>

            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="bg-red-500 px-3 py-1 rounded"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="bg-blue-500 px-3 py-1 rounded"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </nav>

      {/* Inquiry Modal Fix */}
        <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />
    </>
  );
}
