"use client";

import ReviewHeader from "./ReviewSliderHeader";
import { reviews } from "@/app/data/reviews";
import ReviewCard from "../../Cards/ReviewCard";
import Slider from "../../ReusableSliderComponent/Slider";

export default function ReviewSlider() {
  return (
    <div className="mb-5">
      <ReviewHeader />
      <Slider
        items={reviews}
        renderItem={(item) => <ReviewCard review={item} />}
        autoPlay={false}
        // autoPlayInterval={5000}
        itemsPerView={{ mobile: 1, tablet: 3, desktop: 5 }}
        gap={20}
      />
    </div>
  );
}
