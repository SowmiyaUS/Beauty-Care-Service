"use client";

import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import Image from "next/image";

const slides = [
  "/assets/hero1.jpg",
  "/assets/hero4.jpg",
  "/assets/hero5.jpg",
  "/assets/hero6.jpg",
];

export default function HeroSlider() {
  const router = useRouter();

  return (
    <div className="relative w-full h-screen">
      <Swiper
        modules={[Autoplay, EffectFade]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        effect="fade"
        loop
        className="w-full h-full"
      >
        {slides.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-screen">
              {/* Background Image */}
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />

              {/* Overlay Content */}
              <div className="absolute inset-0  bg-opacity-40 flex flex-col justify-center items-center text-white text-center px-4 z-10">
                <p className="text-sm tracking-widest uppercase">
                  Hair • Beauty • Aesthetics
                </p>
                <h1 className="text-4xl md:text-6xl font-bold mt-4">
                  Advanced Beauty Treatments
                </h1>
                <h2 className="text-3xl italic mt-8">Feel Confident</h2>

                <div className="mt-6 flex space-x-4">
                  <button
                    onClick={() => router.push("/booking")}
                    className="border border-white px-6 py-2 hover:bg-white hover:text-black transition rounded-full"
                  >
                    BOOK NOW
                  </button>
                  <button
                    onClick={() => router.push("/booking")}
                    className="bg-white text-black px-6 py-2 hover:bg-pink-100 transition rounded-full"
                  >
                    VIEW PRICES
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
