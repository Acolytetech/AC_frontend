"use client";

import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="w-full bg-white text-gray-800">
      {/* ===========================
          HERO SECTION
      ============================ */}
      <section className="w-full bg-[#0b216b] text-white py-16 px-6">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-3xl md:text-5xl font-bold text-center">
            About Jaipur Dream Home
          </h1>
          <p className="text-center mt-4 text-lg opacity-90 max-w-3xl mx-auto">
            Trusted Real Estate Consultants in Jaipur — helping families and
            investors find the best residential & commercial plots across Tonk Road,
            Jagatpura, Vatika Road & Agra Road.
          </p>
        </div>
      </section>

      {/* ===========================
          FOUNDING STORY
      ============================ */}
      <section className="container mx-auto max-w-5xl px-4 py-14">
        <h2 className="section-title">Our Story</h2>

        <p className="leading-relaxed text-gray-700 mb-8">
          <b>Jaipur Dream Home</b>, founded by <b>Gulshan Nama</b>, is a trusted
          real estate brand in Jaipur known for offering prime location plots,
          transparent deals, and customer-first services. With years of
          experience, the company has helped hundreds of families find secure
          and profitable land in Jaipur’s top-growing regions.
        </p>

        <div className="grid md:grid-cols-2  gap-8 mt-10">
          <Image
            src="/img/img_8190-YNqy5QjZ9nIRwvl3.webp"
            width={600}
            height={600}
            alt="Jaipur Dream Home Team"
            className="rounded-lg shadow-lg h-60 w-full object-cover object-center"
          />

          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-[#0b216b] mb-4">
              Our Mission
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Our mission is to make property buying simple, safe, and
              stress-free. We aim to deliver verified plots with clear
              documentation, transparent pricing, and end-to-end customer support.
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-[1px] bg-gray-200 my-8"></div>

      {/* ===========================
          WHY CHOOSE US
      ============================ */}
      <section className="container mx-auto max-w-5xl px-4 py-12">
        <h2 className="section-title">Why Trust Jaipur Dream Home?</h2>

        <div className="grid md:grid-cols-3 gap-8 mt-10">
          <div className="feature-box">
            <h3>Transparency</h3>
            <p>No hidden charges. No false promises. Clear documentation.</p>
          </div>

          <div className="feature-box">
            <h3>Prime Locations</h3>
            <p>Plots near Tonk Road, Jagatpura, Vatika Road & Agra Road.</p>
          </div>

          <div className="feature-box">
            <h3>Affordable Pricing</h3>
            <p>Best deals for both home buyers and long-term investors.</p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-[1px] bg-gray-200 my-8"></div>

      {/* ===========================
          TOP LOCATIONS
      ============================ */}
      <section className="container mx-auto max-w-5xl px-4 py-12">
        <h2 className="section-title">Top Locations in Jaipur</h2>

        <ul className="list-disc ml-6 text-gray-700 space-y-2 mt-6">
          <li><b>Tonk Road:</b> Excellent connectivity and fast development.</li>
          <li><b>Jagatpura:</b> Popular for modern facilities & gated colonies.</li>
          <li><b>Vatika Road:</b> Peaceful residential area with high growth.</li>
          <li><b>Agra Road:</b> Ideal for investors and commercial expansion.</li>
        </ul>
      </section>

      {/* Divider */}
      <div className="w-full h-[1px] bg-gray-200 my-8"></div>

      {/* ===========================
          CASE STUDY
      ============================ */}
      <section className="container mx-auto max-w-5xl px-4 py-12">
        <h2 className="section-title">Case Study: Tonk Road Success</h2>

        <p className="text-gray-700 mt-4 leading-relaxed">
          <b>Gulshan Nama</b> transformed underdeveloped land near Tonk Road
          into one of the most in-demand real estate destinations in Jaipur.
        </p>

        <div className="mt-8">
          <h3 className="sub-title">The Plan</h3>
          <ul className="list-disc ml-6 space-y-2 text-gray-700 mt-2">
            <li>Developing roads, utilities, streetlights & drainage.</li>
            <li>Strategic marketing to attract home buyers.</li>
            <li>Flexible plot sizes for all budgets.</li>
          </ul>

          <h3 className="sub-title mt-6">The Result</h3>
          <p className="text-gray-700 mt-2">
            Within months, the land turned into a thriving residential zone,
            attracting buyers from Jagatpura, Vatika & Agra Road areas.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-[1px] bg-gray-200 my-8"></div>

      {/* ===========================
          BEELWA LOCATION
      ============================ */}
      <section className="container mx-auto max-w-5xl px-4 py-12">

        <div className="grid md:grid-cols-2 gap-10 mt-6 items-center">
          <div>
        <h2 className="section-title">Beelwa Location</h2>

            <p className="text-gray-700">
              These plots are available at Beelwa near Chokhi Dhani.
            </p>

            <p className="mt-4 text-gray-700">
              <b>Unnati Real Estate Mansarovar</b>
              <br /> Patrakar Colony, Jaipur
              <br /> <b>Timings:</b> 9 AM – 6 PM
            </p>
          </div>

       <div className="w-full h-100 rounded-xl overflow-hidden shadow-md">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d57006.06857386124!2d75.843683!3d26.748228000000005!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDQ0JzUzLjYiTiA3NcKwNTAnMzcuMyJF!5e0!3m2!1sen!2sus!4v1763919836049!5m2!1sen!2sus"
    className="w-full h-full border-0"
    loading="lazy"
    allowFullScreen
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</div>

        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-[1px] bg-gray-200 my-8"></div>

      {/* ===========================
          CLIENT FEEDBACK
      ============================ */}
      <section className="container mx-auto max-w-5xl px-4 py-16">
        <h2 className="section-title text-center">Client Feedback</h2>

        <div className="grid md:grid-cols-2 gap-8 mt-10">
          <div className="testimonial">
            <p>
              ⭐⭐⭐⭐⭐
              <br />
              Jaipur Dream Homes guided me through the entire buying process
              with honesty and professionalism. Highly recommended!
            </p>
            <span>- Priya Singh, Jaipur City</span>
          </div>

          <div className="testimonial">
            <p>
              ⭐⭐⭐⭐⭐
              <br />
              I purchased my dream plot in Mansarovar with their help. Highly
              trusted team.
            </p>
            <span>- Amit Sharma, Jaipur City</span>
          </div>
        </div>
      </section>

      {/* ===========================
          Custom Styles
      ============================ */}
      <style jsx>{`
        .section-title {
          font-size: 28px;
          font-weight: 700;
          color: #0b216b;
        }
        .sub-title {
          font-size: 20px;
          font-weight: 600;
          color: #0b216b;
        }
        .feature-box {
          padding: 24px;
          border: 1px solid #e0e0e0;
          border-radius: 10px;
          background: #f8faff;
          text-align: center;
          transition: 0.3s;
        }
        .feature-box:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 15px rgba(0, 0, 50, 0.1);
        }
        .feature-box h3 {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 10px;
          color: #0b216b;
        }
        .testimonial {
          background: #f0f5ff;
          padding: 20px;
          border-radius: 10px;
          border-left: 4px solid #0b216b;
        }
        .testimonial p {
          margin-bottom: 10px;
        }
        .testimonial span {
          font-weight: 600;
          color: #0b216b;
        }
      `}</style>
    </div>
  );
}
