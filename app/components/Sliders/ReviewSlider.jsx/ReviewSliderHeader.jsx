"use client";

export default function ReviewHeader() {
  return (
    <div className="w-full py-5 text-center rounded-xl">
      <header className="text-center mb-10 md:mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mt-2">
          Our Testimonials
        </h2>
        <p className="mt-3 text-sm sm:text-base leading-relaxed max-w-4xl mx-auto text-gray-500">
          What our customers say about us?
        </p>
      </header>

      <div className="mx-auto max-w-7xl bg-[var(--lv-sky-blue)] flex flex-col md:flex-row items-center justify-center gap-4 py-5 rounded-lg">
        <span className="text-2xl font-semibold">
          <span className="text-lv-blue font-bold">Etsy</span>{" "}
          <span className="font-bold text-lv-blueGreen">5.0</span>
        </span>

        <div className="flex text-yellow-500 text-2xl">
          {/* 5 fixed stars for Etsy rating */}
          {"★★★★★"}
        </div>

        <span className="text-gray-800 text-xs font-extralight peer-focus-visible pb-2">
          (3,143)
        </span>

        <button className="bg-lv-blue text-white px-4 py-1.5 rounded-sm hover:bg-lv-blueGreen font-bold text-sm cursor-pointer transition">
          Write a review
        </button>
      </div>
    </div>
  );
}
