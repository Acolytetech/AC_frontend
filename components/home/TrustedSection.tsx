"use client";

import {
  FaUsers,
  FaUniversity,
  FaStar,
  FaHeadset,
  FaShieldAlt,
} from "react-icons/fa";
import { MdBed, MdVerified, MdAttachMoney } from "react-icons/md";
import { FiGlobe } from "react-icons/fi";
import { RiFileShield2Line } from "react-icons/ri";

export default function TrustedSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Top Label */}
        <span className="px-4 py-1 bg-gradient-to-r from-blue-500 to-emerald-500 text-white text-sm font-semibold rounded-full shadow">
          Trusted Worldwide
        </span>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold mt-4 text-gray-800">
          Trusted by Faimlies <span className="text-emerald-600">Globally</span>
        </h2>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Join thousands of international students who found their perfect home
          with us. Your success is our mission.
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6 mt-12">
          {[
            {
              icon: <FaUsers className="text-blue-600 text-3xl mx-auto mb-2" />,
              value: "50,000+",
              label: "Happy Students",
              color: "text-blue-600",
            },
            {
              icon: (
                <MdBed className="text-emerald-600 text-3xl mx-auto mb-2" />
              ),
              value: "2M+",
              label: "Verified Beds",
              color: "text-emerald-600",
            },
            {
              icon: <FiGlobe className="text-blue-600 text-3xl mx-auto mb-2" />,
              value: "250+",
              label: "Global Cities",
              color: "text-blue-600",
            },
            {
              icon: (
                <FaUniversity className="text-emerald-600 text-3xl mx-auto mb-2" />
              ),
              value: "2,000+",
              label: "Partner Universities",
              color: "text-emerald-600",
            },
            {
              icon: <FaStar className="text-blue-600 text-3xl mx-auto mb-2" />,
              value: "4.8/5",
              label: "Average Rating",
              color: "text-blue-600",
            },
            {
              icon: (
                <FaHeadset className="text-emerald-600 text-3xl mx-auto mb-2" />
              ),
              value: "24/7",
              label: "Customer Support",
              color: "text-emerald-600",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.02] transition text-center"
            >
              {item.icon}
              <h3 className={`text-xl font-bold ${item.color}`}>{item.value}</h3>
              <p className="text-gray-500 text-sm">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Bottom Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-14">
          {[
            {
              icon: <FaShieldAlt className="text-blue-600 text-xl" />,
              title: "SSL Secured",
              desc: "Bank-level security",
            },
            {
              icon: <MdVerified className="text-emerald-600 text-xl" />,
              title: "100% Verified",
              desc: "All properties checked",
            },
            {
              icon: <MdAttachMoney className="text-blue-600 text-xl" />,
              title: "Price Match",
              desc: "Best price guarantee",
            },
            {
              icon: <RiFileShield2Line className="text-emerald-600 text-xl" />,
              title: "No Hidden Fees",
              desc: "Transparent pricing",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-5 bg-white shadow-md rounded-xl hover:shadow-lg hover:scale-[1.02] transition text-left"
            >
              {feature.icon}
              <div>
                <h4 className="font-semibold text-gray-800 text-sm">
                  {feature.title}
                </h4>
                <p className="text-gray-500 text-xs">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
