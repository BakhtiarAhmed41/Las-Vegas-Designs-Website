// components/ServiceCard.jsx
import React from "react";

const ServiceCard = ({ image, title, description }) => {
  return (
    <div className="bg-white rounded-4xl shadow-lg overflow-hidden flex flex-col items-center text-center w-[290px] md:w-80 p-3 ">
      {/* Image */}
      <div className="w-full h-80  overflow-hidden ">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-top object-cover rounded-4xl"
        />
      </div>

      {/* Title */}
      <h3 className="text-lg mt-4 font-bold">{title}</h3>

      {/* Description */}
      <p className="text-gray-600 mt-2 text-xs px-5 py-1 text-center">
        {description}
      </p>

      <button className="mt-2 bg-lv-blue text-white px-4 py-1 rounded-lg hover:bg-blue-700 transition">
        Learn More
      </button>
    </div>
  );
};

export default ServiceCard;
