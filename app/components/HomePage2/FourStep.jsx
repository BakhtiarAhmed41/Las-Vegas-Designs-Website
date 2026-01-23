import { FiUpload, FiMail, FiSettings, FiDownload } from "react-icons/fi";

export default function FourStepProcess() {
  const steps = [
    {
      id: "1",
      title: "Submit Your Artwork",
      desc: "Upload or email your logo, image, or design files. We accept all common formats.",
      icon: <FiUpload className="text-lv-blueGreen text-xl" />,
    },
    {
      id: "2",
      title: "Receive Quote",
      desc: "Get transparent pricing within 2 hours. No surprises, no hidden fees.",
      icon: <FiMail className="text-lv-blueGreen text-xl" />,
    },
    {
      id: "3",
      title: "We Digitize/Convert",
      desc: "Expert work with quality control. Our professionals ensure perfect results.",
      icon: <FiSettings className="text-lv-blueGreen text-xl" />,
    },
    {
      id: "4",
      title: "Download Files",
      desc: "Receive production-ready files in your preferred format. Lifetime storage included.",
      icon: <FiDownload className="text-lv-blueGreen text-xl" />,
    },
  ];

  return (
    <section className="w-full py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-sm text-lv-blue font-semibold">How It Works</p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Simple 4-Step Process
          </h2>
          <p className="text-gray-500 mt-2 max-w-xl mx-auto">
            From concept to production-ready files in days, not weeks
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.id}
              className="relative bg-white shadow-sm rounded-xl p-6 border border-gray-100 hover:shadow-md transition"
            >
              {/* Number Badge */}
              <span className="absolute -top-5 right-0 left-[45%] w-10 h-10 bg-lv-blueGreen text-white flex items-center justify-center rounded-full text-sm font-bold shadow-md">
                {step.id}
              </span>

              {/* Icon Box */}
              <div className="w-12 h-12 rounded-lg bg-[#E4F7F6] flex items-center justify-center">
                {step.icon}
              </div>

              <h3 className="text-lg font-semibold mt-4">{step.title}</h3>
              <p className="text-gray-500 text-sm mt-2">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
