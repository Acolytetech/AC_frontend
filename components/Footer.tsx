"use client";

import { FaFacebookF, FaInstagram, FaLinkedinIn, FaGlobe } from "react-icons/fa";
import { AiOutlinePhone, AiOutlineMail, AiOutlineWhatsApp } from "react-icons/ai";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-12 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Left Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">JAIPUR ACCOMMODATION</h2>
          <p className="text-gray-400 max-w-md">
            Your global education journey starts with the right home. Find premium student accommodation 
            in 250+ cities worldwide with verified listings and 24/7 support.
          </p>

          {/* Why Choose Us */}
          <div>
            <h3 className="font-semibold mb-2">Why Choose Jaipur Accommodation</h3>
            <div className="flex flex-wrap gap-2">
              {[
                "250+ Global Cities",
                "Instant & Easy Bookings",
                "100% Verified Listings",
                "24/7 Professional Service",
                "Lowest Price Guarantee",
                "All-inclusive Bills",
              ].map((item) => (
                <span
                  key={item}
                  className="text-sm bg-gray-800 px-3 py-1 rounded-full"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Awards & Recognition */}
          <div>
            <h3 className="font-semibold mb-2">Awards & Recognition</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                "Best Student Accommodation 2024",
                "100% Verified Listings",
                "Lowest Price Guarantee",
                "250+ Global Cities",
              ].map((award) => (
                <div key={award} className="border border-gray-700 p-2 rounded text-sm">
                  {award}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">24/7 Student Support</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3 border p-3 rounded bg-gray-800">
              <AiOutlinePhone className="text-blue-400 text-xl" />
              <div>
                <p className="font-medium">24/7 Support</p>
                <p className="text-gray-400 text-sm">+91 90332 12685</p>
                <p className="text-gray-500 text-xs">Available 24/7</p>
              </div>
            </div>
            <div className="flex items-center gap-3 border p-3 rounded bg-gray-800">
              <AiOutlineMail className="text-blue-400 text-xl" />
              <div>
                <p className="font-medium">Email Us</p>
                <p className="text-gray-400 text-sm">support@jaipuraccommodation.com</p>
                <p className="text-gray-500 text-xs">Response within 2 hours</p>
              </div>
            </div>
            <div className="flex items-center gap-3 border p-3 rounded bg-gray-800">
              <AiOutlineWhatsApp className="text-blue-400 text-xl" />
              <div>
                <p className="font-medium">WhatsApp</p>
                <p className="text-gray-400 text-sm">+91-90332-12685</p>
                <p className="text-gray-500 text-xs">Instant messaging</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Connect With Us</h3>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-gray-800 rounded hover:bg-blue-600">
                <FaGlobe />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded hover:bg-blue-600">
                <FaFacebookF />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded hover:bg-pink-500">
                <FaInstagram />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded hover:bg-blue-700">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center gap-2">
        <p>© {new Date().getFullYear()} JAIPUR ACCOMMODATION. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Refund Policy</a>
        </div>
      </div>
    </footer>
  );
}
