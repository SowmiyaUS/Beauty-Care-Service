"use client";

import Link from "next/link";
import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-pink-50 text-gray-700 px-6 md:px-16 py-12 border-t border-pink-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
      <div className="flex items-center space-x-3">
  <img src="/image.png" alt="Logo" className="h-14 w-auto" />
  <div className="flex flex-col hidden md:flex">
    <span className="text-2xl font-handwritten text-pink-600 leading-none">Beauty</span>
    <span className="text-xl font-bold text-gray-800 tracking-wide">Service</span>
  </div>
</div>


        {/* Navigation Links */}
        <div className="flex flex-col md:items-center gap-2 text-center">
          <Link href="/team" className="hover:text-pink-600 transition font-medium">Meet The Team</Link>
          <Link href="/price-list" className="hover:text-pink-600 transition font-medium">Price List</Link>
          <Link href="/treatments" className="hover:text-pink-600 transition font-medium">Treatments</Link>
          <Link href="/academy" className="hover:text-pink-600 transition font-medium">Academy</Link>
          <Link href="/igloo" className="hover:text-pink-600 transition font-medium">Igloo Experience</Link>
        </div>

        {/* Social Media */}
        <div className="flex justify-center md:justify-end space-x-4">
          <a
            href="#"
            className="w-10 h-10 border-2 border-pink-400 rounded-full flex items-center justify-center text-pink-600 hover:bg-pink-100 transition"
          >
            <FaInstagram className="text-xl" />
          </a>
          <a
            href="#"
            className="w-10 h-10 border-2 border-pink-400 rounded-full flex items-center justify-center text-pink-600 hover:bg-pink-100 transition"
          >
            <FaFacebookF className="text-xl" />
          </a>
          <a
            href="#"
            className="w-10 h-10 border-2 border-pink-400 rounded-full flex items-center justify-center text-pink-600 hover:bg-pink-100 transition"
          >
            <FaTiktok className="text-xl" />
          </a>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center text-xs text-gray-500 mt-10">
        © {new Date().getFullYear()} Beauty Service. All rights reserved.
      </div>
    </footer>
  );
}
