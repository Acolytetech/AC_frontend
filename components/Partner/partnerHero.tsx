"use client";
import Image from "next/image";
import { Building2, Handshake } from "lucide-react";
import { motion } from "framer-motion";
import PartnerForm from "./PartnerForm";

export default function PartnerHero() {
  return (
    <>
      <section className="relative bg-gradient-to-br from-blue-900 via-green-900 to-amber-900 text-white">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
            alt="Real Estate Background"
            fill
            className="object-cover opacity-50"
            priority
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 lg:py-32 flex flex-col lg:flex-row items-center gap-12">
          {/* Text Section */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Partner With Us in{" "}
              <span className="bg-gradient-to-r from-blue-400 via-green-400 to-red-400 bg-clip-text text-transparent">
                Real Estate Growth
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-200">
              Collaborate with us to explore opportunities, expand your reach,
              and grow together in the real estate industry.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                onClick={() => {
                  document
                    .getElementById("partner-form")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg"
              >
                <Handshake size={20} />
                Become a Partner
              </motion.button>
              <button className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition">
                <Building2 size={20} />
                Learn More
              </button>
            </div>
          </div>

          {/* Right Side Visual */}
          <div className="flex-1 flex justify-center">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20">
              <Image
                src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
                alt="Partnership Illustration"
                width={400}
                height={300}
                className="rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      <PartnerForm />
    </>
  );
}
