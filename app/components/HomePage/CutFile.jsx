import Image from "next/image";
import CutFileCard from "../../components/Cards/CutFileCard.jsx";
import cutFiles from "../../data/HomePage/cutFiles.js";
import styles from "../../styles/HomePage/cutFile.module.css";

export default function CutFile() {
  return (
    <section className="px-4 py-12 bg-[var(--lv-sky-blue)]">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left column: Title, (small-screen printer), Cards */}
        <div className="lg:col-span-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--lv-blue)] mb-4">
              CNC &amp; Laser Cut Files
            </h1>
            <div className="w-24 h-1 bg-[var(--lv-red-light)] mx-auto"></div>
          </div>

          {/* Printer shown between Title and Cards on small screens only */}
          <div className="block lg:hidden mb-6">
            <div
              className={`${styles.printerCard} bg-white rounded-xl shadow-md p-4 w-full max-w-[520px] mx-auto`}
            >
              <Image
                src="/assets/homePage/printer.png"
                alt="CNC / Laser cutting machine"
                width={520}
                height={360}
                className="w-full h-auto rounded-md object-cover"
                priority={false}
              />
            </div>
          </div>

          <div className="space-y-4">
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

        {/* Printer for large screens (hidden on small screens). */}
        <div className="lg:col-span-6 hidden lg:flex justify-center lg:justify-end">
          <div
            className={`${styles.printerCard} bg-white rounded-xl shadow-md p-4 w-full max-w-[520px] overflow-hidden`}
          >
            <Image
              src="/assets/homePage/printer.png"
              alt="CNC / Laser cutting machine"
              width={520}
              height={360}
              className="w-full h-auto rounded-md object-cover"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
