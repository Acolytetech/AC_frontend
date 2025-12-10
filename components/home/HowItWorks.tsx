"use client";

import { FaSearch, FaClipboardCheck, FaHome } from "react-icons/fa";

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Search & Discover",
      subtitle: "Find your perfect home",
      desc: "Use our smart search to find accommodations by location, university, budget, or room type. Filter by amenities and view detailed photos.",
      highlights: [
        "Smart search filters",
        "Virtual tours & photos",
        "Real-time availability",
        "Compare options easily",
      ],
      button: "Start Searching",
      icon: <FaSearch className="text-2xl text-white" />,
      time: "2-5 minutes",
      color: "from-blue-500 to-emerald-500",
    },
    {
      id: 2,
      title: "Apply & Book",
      subtitle: "Secure your space instantly",
      desc: "Complete your booking in minutes with our streamlined process. Upload documents, sign digitally, and pay securely online.",
      highlights: [
        "Digital application form",
        "Secure document upload",
        "E-signature process",
        "Multiple payment options",
      ],
      button: "Book Now",
      icon: <FaClipboardCheck className="text-2xl text-white" />,
      time: "5-10 minutes",
      color: "from-blue-500 to-emerald-500",
    },
    {
      id: 3,
      title: "Move In & Enjoy",
      subtitle: "Welcome to your new home",
      desc: "Arrive to a fully prepared home with welcome package, key collection, and ongoing support throughout your stay.",
      highlights: [
        "Welcome package included",
        "Easy key collection",
        "Orientation & support",
        "Community integration",
      ],
      button: "Learn More",
      icon: <FaHome className="text-2xl text-white" />,
      time: "Day 1 onwards",
      color: "from-blue-500 to-emerald-500",
    },
  ];

  return (
    <section className="py-16 px-6 md:px-1 bg-gray-50" id="how-it-works">
      {/* Heading */}
      <div className="text-center mb-12">
        <span className="px-4 py-1 bg-gradient-to-r from-blue-500 to-emerald-500 text-white text-sm font-semibold rounded-full shadow">
          Simple Process
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-4">
          How It <span className="text-emerald-500">Works</span>
        </h2>
        <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
          Booking your perfect student accommodation has never been easier. Our
          streamlined 3-step process gets you from search to move-in in no time.
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
        {[
          { text: "< 5min", sub: "Average Booking Time" },
          { text: "99.8%", sub: "Approval Rate" },
          { text: "24/7", sub: "Support Available" },
          { text: "0", sub: "Hidden Fees" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white shadow rounded-lg p-6 text-center border"
          >
            <p className="text-xl font-bold text-emerald-600">{stat.text}</p>
            <p className="text-sm text-gray-600">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Steps */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {steps.map((step) => (
          <div
            key={step.id}
            className="relative bg-white shadow-lg rounded-xl p-6 border hover:shadow-xl transition"
          >
            {/* Number Badge */}
            <div
              className={`absolute -top-6 left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${step.color} text-white font-bold shadow-md`}
            >
              {step.id}
            </div>

            {/* Icon + Time */}
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r ${step.color}`}
              >
                {step.icon}
              </div>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {step.time}
              </span>
            </div>

            <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
            <p className="text-emerald-600 font-medium mb-2">{step.subtitle}</p>
            <p className="text-gray-600 text-sm mb-4">{step.desc}</p>

            <ul className="space-y-2 text-sm text-gray-700 mb-4">
              {step.highlights.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  {item}
                </li>
              ))}
            </ul>

            <button
              className={`w-full border rounded-lg py-2 text-sm font-medium hover:shadow bg-gradient-to-r ${step.color} text-white`}
            >
              {step.button}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
