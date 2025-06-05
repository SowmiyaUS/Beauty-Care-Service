"use client";

import Image from "next/image";

export default function SectionTwo() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between w-full min-h-screen bg-pink-50 pt-12">
      {/* Left Image Section */}
      <div className="relative w-full md:w-1/2 h-[400px] md:h-screen">
        <Image
          src="/assets/peoples.jpg"
          alt="Team"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right Text Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-12 md:py-0 bg-pink-50">
        <div className="max-w-xl text-center md:text-left">
          <p className="uppercase text-sm tracking-widest text-pink-600">
            Enter as strangers, leave as friends
          </p>
          <h2 className="text-5xl font-handwritten text-pink-800 mt-4">
            Hello Gorgeous!
          </h2>
          <p className="mt-6 text-gray-700 text-lg leading-relaxed">
            The most alluring thing a woman can do is have confidence. Here at
            Beauty Service, we make sure that you walk out of our salon looking
            great and feeling confident as ever.
          </p>
          <p className="mt-10 text-3xl font-handwritten text-pink-700">
            The Beauty Service Team <span className="text-xl">x</span>
          </p>
        </div>
      </div>
    </section>
  );
}
