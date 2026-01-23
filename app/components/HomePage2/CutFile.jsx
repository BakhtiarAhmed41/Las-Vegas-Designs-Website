import Image from "next/image";
import CutFileCard from "../../components/Cards/CutFileCard.jsx";
import cutFiles from "../../data/HomePage/cutFiles.js";

export default function CutFile() {
  return (
    <section className="px-4 py-12">
      <div className="max-w-[1100px] mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            CNC &amp; Laser Cut Files
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {cutFiles.map((f) => (
            <CutFileCard
              key={f.id}
              title={f.title}
              description={f.description}
              image={f.image}
              imageAlt={f.imageAlt}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
