"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

import Image from 'next/image';

import banner from '../../../../public/banner-1024.png'

export default function SlideShow() {
    return (
        <Swiper
            // modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            // autoplay={{
            //     delay: 5000,
            //     disableOnInteraction: false
            // }}
            className='rounded-lg h-[250px]'
        >
            <SwiperSlide><Image src={banner} alt='doce' fill /></SwiperSlide>
            <SwiperSlide><div className="bg-blue-300 h-full">Slide 2</div></SwiperSlide>
            <SwiperSlide><div className="bg-green-300 h-full">Slide 3</div></SwiperSlide>
        </Swiper>
    );
}
