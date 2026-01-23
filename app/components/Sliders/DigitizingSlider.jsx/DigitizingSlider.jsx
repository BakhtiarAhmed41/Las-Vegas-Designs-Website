"use client";
import { digitizingSlider } from "@/app/data/HomePage/digitizing";
import Image from "next/image";
import React from "react";
import Slider from "../../ReusableSliderComponent/Slider";

const dir = "/assets/homePage/digitizingSlider/";

function DigitizingSlider() {
  return (
    <Slider
      items={digitizingSlider}
      renderItem={(item) => (
        <Image
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
          alt={item.src}
          src={`${dir}${item.src}`}
        />
      )}
      autoPlay={true}
      autoPlayInterval={5000}
      itemsPerView={{ mobile: 1, tablet: 3, desktop: 4 }}
      gap={20}
    />
  );
}

export default DigitizingSlider;
