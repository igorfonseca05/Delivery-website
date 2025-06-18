"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

import { useAdminContext } from '../../../../context/isAdminContext';
import WelcomePanel from '../welcomeAdmin';

import Image from 'next/image';


export default function SlideShow() {

    const { isAdmin } = useAdminContext()

    return (
        <>
            {!isAdmin ? (
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false
                    }}
                    className='rounded-lg h-[160px] md:h-[250px] mt-4'
                >
                    <SwiperSlide><Image src='/new3.png' style={{ objectFit: 'fill' }} alt='doce' fill /></SwiperSlide>
                    <SwiperSlide><Image src='/new.jpg' style={{ objectFit: 'fill' }} alt='doce' fill /></SwiperSlide>
                    <SwiperSlide><Image src='/new2.jpg' style={{ objectFit: 'fill' }} alt='doce' fill /></SwiperSlide>
                </Swiper>
            ) : (
                <WelcomePanel />
            )}
        </>
    );
}
