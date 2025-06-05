"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, UserCircle2, ChevronDown } from "lucide-react";
import AuthPopup from "../components/auth/AuthPopup";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5174";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [user, setUser] = useState(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const fetchUserDetails = async (token) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        const { name, _id, email, role } = data.user;
        setUser({ id: _id, name, email, role, image: null });
      } else {
        localStorage.removeItem("userToken");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      localStorage.removeItem("userToken");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) fetchUserDetails(token);
  }, []);

  const handleLoginSuccess = (userData) => {
    setShowAuthPopup(false);
    fetchUserDetails(userData.token);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setProfileMenuOpen(false);
    window.location.href = "/";
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-pink-50 shadow-sm px-6 py-4 flex items-center justify-between  relative">

        {/* Logo */}
        <div className="flex items-center space-x-3">
  <img src="/image.png" alt="Logo" className="h-14 w-auto" />
  <div className="flex flex-col hidden md:flex">
    <span className="text-2xl font-handwritten text-pink-600 leading-none">Beauty</span>
    <span className="text-xl font-bold text-gray-800 tracking-wide">Service</span>
  </div>
</div>


        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link href="/home" className="text-gray-700 hover:text-pink-600 font-medium">Home</Link>
          <Link href="/team" className="text-gray-700 hover:text-pink-600 font-medium">Meet The Team</Link>
          <Link href="/academy" className="text-gray-700 hover:text-pink-600 font-medium">Academy</Link>
          <Link href="/booking" className="text-gray-700 hover:text-pink-600 font-medium">Book Appointment</Link>
          {user?.role === "admin" && (
            <Link href="/dashboard" className="text-gray-700 hover:text-pink-600 font-medium">Dashboard</Link>
          )}
        </div>

        {/* User Profile or Login Button */}
        <div className="hidden md:flex items-center gap-3 relative">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-2 focus:outline-none text-gray-700 hover:text-pink-600"
              >
                <UserCircle2 className="h-8 w-8" />
                <ChevronDown className="h-4 w-4" />
              </button>

              {profileMenuOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg border text-sm overflow-hidden z-50">
                  <Link href="/profile" className="block px-5 py-3 hover:bg-pink-50 text-gray-700">My Profile</Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-5 py-3 hover:bg-pink-50 text-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowAuthPopup(true)}
              className="border border-pink-500 text-pink-600 px-4 py-2 rounded-full hover:bg-pink-100 transition text-sm"
            >
              Login / Register
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-pink-600 z-30"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu */}
        <div
          className={`absolute top-full left-0 w-full bg-pink-50 text-black flex flex-col items-center space-y-6 py-6 text-lg transition-all duration-300 md:hidden ${
            mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <Link href="/home" onClick={() => setMobileOpen(false)}>Home</Link>
          <Link href="/team" onClick={() => setMobileOpen(false)}>Meet The Team</Link>
          <Link href="/academy" onClick={() => setMobileOpen(false)}>Academy</Link>
          <Link href="/booking" onClick={() => setMobileOpen(false)}>Book Appointment</Link>
          {user?.role === "admin" && (
            <Link href="/dashboard" onClick={() => setMobileOpen(false)}>Dashboard</Link>
          )}
          {user ? (
            <>
              <Link href="/profile" onClick={() => setMobileOpen(false)}>My Profile</Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileOpen(false);
                }}
                className="border border-pink-500 px-4 py-2 rounded-full text-pink-600 hover:bg-pink-100"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setShowAuthPopup(true);
                setMobileOpen(false);
              }}
              className="border border-pink-500 px-4 py-2 rounded-full text-pink-600 hover:bg-pink-100"
            >
              Login / Register
            </button>
          )}
        </div>
      </nav>

      {/* Login Modal */}
      {showAuthPopup && (
        <AuthPopup
          onClose={() => setShowAuthPopup(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
}
