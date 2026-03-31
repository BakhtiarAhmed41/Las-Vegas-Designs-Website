"use client";

export default function ReviewHeader() {
  return (
    <div className="w-full">
      <header className="text-center mb-8 md:mb-10">
        <span className="inline-flex items-center rounded-full bg-lv-red/10 text-lv-red text-[11px] font-semibold tracking-wide uppercase px-3 py-1">
          Reviews
        </span>
        <h2 className="mt-4 text-3xl md:text-4xl font-bold text-lv-blue">
          Our Testimonials
        </h2>
        <p className="mt-3 text-sm sm:text-base leading-relaxed max-w-4xl mx-auto text-slate-600">
          What our customers say about us.
        </p>
      </header>

      <div className="mx-auto max-w-7xl bg-white border border-slate-200 shadow-lg flex flex-col md:flex-row items-center justify-center gap-4 py-5 rounded-2xl">
        <span className="text-xl md:text-2xl font-semibold">
          <span className="text-lv-blue font-bold">Etsy</span>{" "}
          <span className="font-bold text-lv-blueGreen">5.0</span>
        </span>

        <div
          className="flex text-yellow-500 text-2xl"
          aria-label="5 out of 5 stars"
        >
          {"★★★★★"}
        </div>

        <span className="text-slate-700 text-xs font-normal pb-0">(3,143)</span>

        <button className="bg-lv-red text-white px-5 py-2 rounded-full hover:bg-lv-red-dark font-bold text-sm cursor-pointer transition-colors">
          Write a review
        </button>
      </div>
    </div>
  );
}

