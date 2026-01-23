// import {
//   FiClock,
//   FiStar,
//   FiRefreshCw,
//   FiDollarSign,
//   FiArchive,
//   FiAward,
// } from "react-icons/fi";
// import { whyChooseUsData } from "../../data/HomePage/chooseUs.js";

// export default function WhyChooseUs() {
//   const items = [
//     {
//       id: "01",
//       title: "20+ Years Experience",
//       desc: "Trusted expertise with thousands of satisfied customers worldwide.",
//       icon: <FiAward className="text-lv-blueGreen text-xl" />,
//     },
//     {
//       id: "02",
//       title: "Fast Turnaround",
//       desc: "Most orders completed in 24–48 hours. Rush service available.",
//       icon: <FiClock className="text-lv-blueGreen text-xl" />,
//     },
//     {
//       id: "03",
//       title: "Professional Quality",
//       desc: "Expert digitizers ensure perfect, production-ready results every time.",
//       icon: <FiStar className="text-lv-blueGreen text-xl" />,
//     },
//     {
//       id: "04",
//       title: "Affordable Pricing",
//       desc: "Competitive rates with transparent pricing and no hidden fees.",
//       icon: <FiDollarSign className="text-lv-blueGreen text-xl" />,
//     },
//     {
//       id: "05",
//       title: "Free Revisions",
//       desc: "We work until you're 100% satisfied with unlimited revisions.",
//       icon: <FiRefreshCw className="text-lv-blueGreen text-xl" />,
//     },
//     {
//       id: "06",
//       title: "Lifetime Storage",
//       desc: "Access your files anytime, anywhere with secure cloud storage.",
//       icon: <FiArchive className="text-lv-blueGreen text-xl" />,
//     },
//   ];

//   return (
//     <section className="w-full py-16">
//       <div className="max-w-7xl mx-auto px-4 md:px-6">
//         <div className="text-center mb-10">
//           <p className="text-sm text-lv-blue font-semibold">Why Choose Us</p>
//           <h2 className="text-3xl md:text-4xl font-bold mt-2">
//             The Difference Quality Makes
//           </h2>
//           <p className="text-gray-500 mt-2 max-w-xl mx-auto">
//             Experience the Las Vegas Designs USA advantage
//           </p>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
//           {items.map((item) => (
//             <div
//               key={item.id}
//               className="relative bg-white shadow-sm rounded-xl p-6 border border-gray-100 hover:shadow-md transition"
//             >
//               {/* Number Badge */}
//               <span className="absolute -top-3 -left-3 w-10 h-10 bg-lv-blueGreen text-white flex items-center justify-center rounded-full text-sm font-bold shadow-md">
//                 {item.id}
//               </span>

//               {/* Icon Box */}
//               <div className="w-12 h-12 rounded-lg bg-[#E4F7F6] flex items-center justify-center">
//                 {item.icon}
//               </div>

//               <h3 className="text-lg font-semibold mt-4">{item.title}</h3>
//               <p className="text-gray-500 text-sm mt-2">{item.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

import { whyChooseUsData } from "../../data/HomePage/chooseUs.js";

export default function WhyChooseUs() {
  return (
    <section className="w-full py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-10">
          <p className="text-sm text-lv-blue font-semibold">Why Choose Us</p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            The Difference Quality Makes
          </h2>
          <p className="text-gray-500 mt-2 max-w-xl mx-auto">
            Experience the Las Vegas Designs USA advantage
          </p>
        </div>

        {/* Grid Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {whyChooseUsData.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="relative bg-white shadow-sm rounded-xl p-6 border border-gray-100 hover:shadow-md transition"
              >
                {/* Number Badge */}
                <span className="absolute -top-3 -left-3 w-10 h-10 bg-lv-blueGreen text-white flex items-center justify-center rounded-full text-sm font-bold shadow-md">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Icon Box */}
                <div className="w-12 h-12 rounded-lg bg-[#E4F7F6] flex items-center justify-center">
                  <Icon className="text-lv-blueGreen text-xl" />
                </div>

                <h3 className="text-lg font-semibold mt-4">{item.headline}</h3>
                <p className="text-gray-500 text-sm mt-2">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
