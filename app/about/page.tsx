"use client";

import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>
      
      {/* Intro Section */}
      <p className="text-lg text-gray-700 mb-10 text-center max-w-3xl mx-auto">
        Welcome to [Your Company Name]! We are passionate about delivering the best services/products
        to our customers. Our mission is to provide quality, reliability, and innovation in everything we do.
      </p>

      {/* Team / Image Section */}
      <div className="flex flex-col md:flex-row items-center md:gap-10">
        <Image
          src="/team.jpg" // Replace with your image
          alt="Our Team"
          width={500}
          height={400}
          className="rounded-lg shadow-lg mb-6 md:mb-0"
        />
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700">
            Our mission is to make a positive impact by providing high-quality products/services
            that solve real problems for our customers. We aim to grow together with our clients and community.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
        <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-xl font-bold mb-2">Integrity</h3>
          <p className="text-gray-600">We uphold honesty and transparency in all our interactions.</p>
        </div>
        <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-xl font-bold mb-2">Innovation</h3>
          <p className="text-gray-600">Constantly innovating to deliver the best solutions.</p>
        </div>
        <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-xl font-bold mb-2">Customer Focus</h3>
          <p className="text-gray-600">We put our customers at the center of everything we do.</p>
        </div>
      </div>
    </div>
  );
}
