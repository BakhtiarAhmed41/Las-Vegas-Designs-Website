import Image from "next/image";
import ScrollAnimation from "../UI/ScrollAnimation";
import CutFileCard from "../../components/Cards/CutFileCard.jsx";
import cutFiles from "../../data/HomePage/cutFiles.js";
import styles from "../../styles/HomePage/cutFile.module.css";

export default function CutFile() {
  const leftCards = cutFiles.slice(0, 2);
  const rightCards = cutFiles.slice(2);

  return (
    <section className="bg-white py-10 md:py-14 lg:py-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation animation="fadeInUp" delay={0}>
          <div className="text-center mb-8 md:mb-10">
            <span className="inline-flex items-center rounded-full bg-lv-red/10 text-lv-red text-[11px] font-semibold tracking-wide uppercase px-3 py-1">
              CNC &amp; Laser
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-lv-blue">
              CNC &amp; Laser Cut Files
            </h2>
            <div className="w-24 h-1 bg-lv-red mx-auto mt-4" />
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-center">
          <ScrollAnimation animation="fadeInUp" delay={0.05}>
            <div className="space-y-4">
              {leftCards.map((f) => (
                <CutFileCard
                  key={f.id}
                  title={f.title}
                  description={f.description}
                  image={f.image}
                  imageAlt={f.imageAlt}
                />
              ))}
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="fadeInUp" delay={0.1}>
            <div className="order-first lg:order-0">
              <div
                className={`${styles.printerCard} bg-white rounded-2xl border border-slate-200 shadow-lg p-4 w-full max-w-[520px] mx-auto overflow-hidden`}
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
          </ScrollAnimation>

          <ScrollAnimation animation="fadeInUp" delay={0.15}>
            <div className="space-y-4">
              {rightCards.map((f) => (
                <CutFileCard
                  key={f.id}
                  title={f.title}
                  description={f.description}
                  image={f.image}
                  imageAlt={f.imageAlt}
                />
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}

