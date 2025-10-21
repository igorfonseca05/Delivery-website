"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

import Image from "next/image";

export default function SlideShow() {

  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      className="rounded-lg h h-[160px] md:h-[250px] mt-4"
    >
      <SwiperSlide>
        <Image src="/new3.png" style={{ objectFit: "fill" }} alt="doce" fill />
      </SwiperSlide>
      <SwiperSlide>
        <Image src="/new.jpg" style={{ objectFit: "fill" }} alt="doce" fill />
      </SwiperSlide>
      <SwiperSlide>
        <Image src="/new2.jpg" style={{ objectFit: "fill" }} alt="doce" fill />
      </SwiperSlide>
    </Swiper>
  );
}
