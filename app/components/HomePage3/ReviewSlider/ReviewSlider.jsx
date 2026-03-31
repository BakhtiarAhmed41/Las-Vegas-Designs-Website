"use client";

import ReviewHeader from "./ReviewSliderHeader";
import { reviews } from "@/app/data/reviews";
import ReviewCard from "../../Cards/ReviewCard";
import Slider from "../../ReusableSliderComponent/Slider";

export default function ReviewSlider() {
  return (
    <section className="bg-white py-10 md:py-14 lg:py-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ReviewHeader />
        <div className="mt-8">
          <Slider
            items={reviews}
            renderItem={(item) => <ReviewCard review={item} />}
            autoPlay={false}
            itemsPerView={{ mobile: 1, tablet: 3, desktop: 5 }}
            gap={20}
          />
        </div>
      </div>
    </section>
  );
}

