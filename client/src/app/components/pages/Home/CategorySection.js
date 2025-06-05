"use client";

import Image from "next/image";

const categories = [
  {
    title: "BEAUTY",
    image: "/assets/beauty.jpg",
    link: "#",
  },
  {
    title: "HAIR",
    image: "/assets/hair.jpg",
    link: "#",
  },
  {
    title: "AESTHETICS",
    image: "/assets/aesthetics.png",
    link: "#",
  },
];

export default function CategorySection() {
  return (
    <section className="w-full bg-pink-50 py-12 px-4 md:px-8 lg:px-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((item, index) => (
          <div
            key={index}
            className="relative group h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl shadow-lg"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 rounded-2xl"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-opacity-40 flex flex-col items-center justify-center text-gray-800 text-center px-6">
              <h2 className="text-4xl font-bold mb-4">{item.title}</h2>
              <a
                href="/booking"
                className="border border-pink-600 text-pink-600 px-6 py-2 rounded-full hover:bg-pink-600 hover:text-white transition font-semibold text-sm tracking-wide"
              >
                BOOK NOW
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
