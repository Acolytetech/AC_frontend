"use client";

import {
  FaHeadset,
  FaCheckCircle,
  FaDollarSign,
  FaStar,
  FaLock,
  FaCity,
} from "react-icons/fa";

export default function WhyChooseSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <span className="px-4 py-1 bg-gradient-to-r from-blue-500 to-emerald-500 text-white text-sm font-semibold rounded-full shadow">
          Your Perfect Choice
        </span>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mt-4 text-gray-800">
          Why Choose <span className="text-emerald-500">Jaipur Dream Homes?</span>
        </h2>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          We&apos;re not just another accommodation provider. We&apos;re your
          partners in creating an unforgettable study abroad experience with
          unmatched service and quality.
        </p>

        {/* Top Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition text-center">
            <FaCity className="text-blue-500 text-3xl mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800">250+ Cities Worldwide</h3>
            <p className="text-sm text-gray-500">Global Presence</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition text-center">
            <FaStar className="text-emerald-500 text-3xl mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800">4.8/5 Average Rating</h3>
            <p className="text-sm text-gray-500">2,847 Reviews</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition text-center">
            <FaLock className="text-blue-500 text-3xl mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800">SSL Encrypted</h3>
            <p className="text-sm text-gray-500">Bank-Level Security</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition text-center">
            <FaHeadset className="text-emerald-500 text-3xl mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800">24/7 Support</h3>
            <p className="text-sm text-gray-500">Always Available</p>
          </div>
        </div>

        {/* Bottom Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {/* Support */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-[1.02] transition">
            <div className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-6 py-3 flex justify-between items-center">
              <FaHeadset className="text-xl" />
              <span className="font-bold">24/7</span>
            </div>
            <div className="p-6 text-left">
              <h3 className="font-bold text-lg text-gray-800">
                24/7 Professional Support
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Round-the-clock assistance from our dedicated housing experts.
              </p>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>✔ Emergency hotline</li>
                <li>✔ Multilingual support team</li>
                <li>✔ On-site property managers</li>
                <li>✔ Quick response guarantee</li>
              </ul>
            </div>
          </div>

          {/* Verified Properties */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-[1.02] transition">
            <div className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-6 py-3 flex justify-between items-center">
              <FaCheckCircle className="text-xl" />
              <span className="font-bold">100%</span>
            </div>
            <div className="p-6 text-left">
              <h3 className="font-bold text-lg text-gray-800">
                100% Verified Properties
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Every home is personally checked for safety & quality.
              </p>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>✔ Professional quality checks</li>
                <li>✔ Safety & security verified</li>
                <li>✔ Photo accuracy guaranteed</li>
                <li>✔ Regular property audits</li>
              </ul>
            </div>
          </div>

          {/* Price Match */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-[1.02] transition">
            <div className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-6 py-3 flex justify-between items-center">
              <FaDollarSign className="text-xl" />
              <span className="font-bold">100%</span>
            </div>
            <div className="p-6 text-left">
              <h3 className="font-bold text-lg text-gray-800">
                Price Match Guarantee
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Find a lower price elsewhere? We&apos;ll match it + 5% discount.
              </p>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>✔ Instant price matching</li>
                <li>✔ Additional 5% discount</li>
                <li>✔ No hidden fees policy</li>
                <li>✔ Transparent pricing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
