"use client";

import { FiImage, FiLayers, FiCpu, FiShuffle } from "react-icons/fi";

const services = [
  {
    icon: <FiImage size={26} />,
    title: "Logo Digitizing",
    desc: "Transform logos into production-ready embroidery files for corporate branding and promotional apparel.",
  },
  {
    icon: <FiLayers size={26} />,
    title: "SVG Design",
    desc: "Crisp, scalable vector files perfect for vinyl cutting, printing, and digital designs.",
  },
  {
    icon: <FiCpu size={26} />,
    title: "CNC Files",
    desc: "Professional CNC files optimized for cutting, engraving, and routing on various materials.",
  },
  {
    icon: <FiShuffle size={26} />,
    title: "Vector Conversion",
    desc: "High-quality vector conversions from any image for screen printing and professional artwork.",
  },
];

export default function Services() {
  return (
    <section className="px-6 md:px-8 py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          Our Services
        </h2>
        <p className="text-gray-600 text-center mt-2">
          Everything you need to bring your designs to life
        </p>

        {/* Services Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2  gap-6">
          {services.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition relative overflow-hidden"
            >
              {/* Top Corner Decoration */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-blue-100 rounded-bl-full opacity-40"></div>

              <div className="text-lv-blueGreen mb-4">{item.icon}</div>

              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                {item.desc}
              </p>

              <button className="text-lv-blueGreen text-sm mt-4 font-medium hover:underline">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
