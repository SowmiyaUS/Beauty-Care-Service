// components/SocialMediaBar.tsx
"use client";

import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa";
import Link from "next/link";

export default function SocialMediaBar() {
  return (
    <div className="fixed top-1/2 left-4 -translate-y-1/2 z-50 flex flex-col space-y-4">
      {[ 
        { icon: <FaInstagram />, href: "#" },
        { icon: <FaFacebookF />, href: "#" },
        { icon: <FaTiktok />, href: "#" },
      ].map((item, i) => (
        <Link
          key={i}
          href={item.href}
          className="w-10 h-10 flex items-center justify-center border border-white rounded-full text-white hover:bg-white hover:text-black transition"
        >
          {item.icon}
        </Link>
      ))}
    </div>
  );
}
