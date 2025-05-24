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
                    <SwiperSlide><Image src='/bann.jpg' style={{ objectFit: 'cover' }} alt='doce' fill /></SwiperSlide>
                    <SwiperSlide><div className="bg-blue-300 h-full">Slide 2</div></SwiperSlide>
                    <SwiperSlide><div className="bg-green-300 h-full">Slide 3</div></SwiperSlide>
                </Swiper>
            ) : (
                <WelcomePanel />
            )}
        </>
    );
}
