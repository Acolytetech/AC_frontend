"use client";

import { FaUsers, FaUniversity, FaStar, FaHeadset, FaShieldAlt } from "react-icons/fa";
import { MdBed, MdVerified, MdAttachMoney } from "react-icons/md";
import { FiGlobe } from "react-icons/fi";
import { RiFileShield2Line } from "react-icons/ri";

export default function TrustedSection() {
  return (
    <section className="py-16 bg-white text-center">
      {/* Top Label */}
      <div className="mb-4">
        <span className="px-4 py-1 text-sm rounded-full bg-blue-50 text-blue-600 font-medium">
          • Trusted Worldwide
        </span>
      </div>

      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Trusted by Students <span className="text-blue-600">Globally</span>
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-12">
        Join thousands of international students who found their perfect home with us. 
        Your success is our mission.
      </p>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-6 max-w-6xl mx-auto">
        <div className="p-6 bg-white shadow rounded-2xl">
          <FaUsers className="text-3xl text-blue-600 mx-auto mb-2" />
          <h3 className="text-xl font-bold text-blue-600">50,000+</h3>
          <p className="text-gray-500 text-sm">Happy Students</p>
        </div>
        <div className="p-6 bg-white shadow rounded-2xl">
          <MdBed className="text-3xl text-green-600 mx-auto mb-2" />
          <h3 className="text-xl font-bold text-green-600">2M+</h3>
          <p className="text-gray-500 text-sm">Verified Beds</p>
        </div>
        <div className="p-6 bg-white shadow rounded-2xl">
          <FiGlobe className="text-3xl text-purple-600 mx-auto mb-2" />
          <h3 className="text-xl font-bold text-purple-600">250+</h3>
          <p className="text-gray-500 text-sm">Global Cities</p>
        </div>
        <div className="p-6 bg-white shadow rounded-2xl">
          <FaUniversity className="text-3xl text-orange-600 mx-auto mb-2" />
          <h3 className="text-xl font-bold text-orange-600">2,000+</h3>
          <p className="text-gray-500 text-sm">Partner Universities</p>
        </div>
        <div className="p-6 bg-white shadow rounded-2xl">
          <FaStar className="text-3xl text-yellow-500 mx-auto mb-2" />
          <h3 className="text-xl font-bold text-yellow-500">4.8/5</h3>
          <p className="text-gray-500 text-sm">Average Rating</p>
        </div>
        <div className="p-6 bg-white shadow rounded-2xl">
          <FaHeadset className="text-3xl text-red-600 mx-auto mb-2" />
          <h3 className="text-xl font-bold text-red-600">24/7</h3>
          <p className="text-gray-500 text-sm">Customer Support</p>
        </div>
      </div>

      {/* Bottom Features */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-12">
        <div className="flex items-center gap-3 p-4 bg-white shadow rounded-xl">
          <FaShieldAlt className="text-blue-600 text-xl" />
          <div>
            <h4 className="font-semibold text-gray-800 text-sm">SSL Secured</h4>
            <p className="text-gray-500 text-xs">Bank-level security</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-white shadow rounded-xl">
          <MdVerified className="text-green-600 text-xl" />
          <div>
            <h4 className="font-semibold text-gray-800 text-sm">100% Verified</h4>
            <p className="text-gray-500 text-xs">All properties checked</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-white shadow rounded-xl">
          <MdAttachMoney className="text-yellow-600 text-xl" />
          <div>
            <h4 className="font-semibold text-gray-800 text-sm">Price Match</h4>
            <p className="text-gray-500 text-xs">Best price guarantee</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-white shadow rounded-xl">
          <RiFileShield2Line className="text-blue-600 text-xl" />
          <div>
            <h4 className="font-semibold text-gray-800 text-sm">No Hidden Fees</h4>
            <p className="text-gray-500 text-xs">Transparent pricing</p>
          </div>
        </div>
      </div>
    </section>
  );
}
