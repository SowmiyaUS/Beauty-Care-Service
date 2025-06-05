"use client";

import { useState } from "react";
import Image from "next/image";
import roomImage from "../../../../public/assets/room.png";
import Footer from "../Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5174";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);

  const courses = [
    { name: "Lash Extension Masterclass", price: "₹8,500", description: "Master the art of lash extensions...", duration: "2 Days" },
    { name: "Brow Lamination Course", price: "₹6,000", description: "Learn brow shaping and lamination...", duration: "1 Day" },
    { name: "Advanced Skincare Training", price: "₹10,000", description: "Deep dive into skin science treatments...", duration: "3 Days" },
  ];

  const openModal = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedCourse(null);
    setFormData({ name: "", email: "", phone: "" });
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await fetch(`${API_BASE_URL}/api/enquiries/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          courseName: selectedCourse.name,
          coursePrice: selectedCourse.price,
          courseDescription: selectedCourse.description,
        }),
      });
      toast.success(`🎉 Thank you! Your enquiry for "${selectedCourse.name}" was sent.`);
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to send enquiry. Try again later!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 text-black">
      <ToastContainer />
      
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <Image src={roomImage} alt="Training Room" className="w-full h-full object-cover" />
        </div>
        <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
          <h2 className="text-4xl font-handwritten text-pink-600 mb-4">Why train with us?</h2>
          <h1 className="text-5xl font-bold mb-6">Beauty Service Academy</h1>
          <div className="bg-pink-600 text-white px-5 py-2 rounded-lg font-semibold mb-6 inline-block">
            Finance Options Available
          </div>
          <p className="text-base mb-6 leading-relaxed">
            With over 10 years in the beauty industry, we offer you world-class training, real-world knowledge, and on-going career support.
          </p>
          <ul className="list-disc list-inside space-y-2 text-base">
            <li>Certificate of Completion</li>
            <li>Full practical sessions</li>
            <li>Training Manual & Kits</li>
            <li>Lifetime Support & Student Discounts</li>
          </ul>
          <button className="mt-8 px-6 py-3 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition">
            View Courses
          </button>
        </div>
      </div>

      {/* Courses Section */}
      <div className="p-8 md:p-16 bg-white">
        <h2 className="text-4xl font-bold text-center mb-10">Courses We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {courses.map((course) => (
            <div key={course.name} className="bg-pink-50 rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition">
              <h3 className="text-2xl font-bold mb-2">{course.name}</h3>
              <p className="text-gray-600 mb-1">{course.duration}</p>
              <p className="text-pink-600 font-semibold text-lg mb-3">{course.price}</p>
              <p className="text-sm text-gray-700 mb-6">{course.description}</p>
              <button
                onClick={() => openModal(course)}
                className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 rounded-md transition"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Enquiry Modal */}
      {showModal && selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl w-[90%] max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold text-center mb-4">Course Enquiry</h2>
            <p className="text-center text-pink-600 font-semibold mb-2">{selectedCourse.name}</p>
            <p className="text-center text-gray-600 mb-6">{selectedCourse.price}</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                required
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <input
                type="email"
                required
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <input
                type="tel"
                required
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition"
              >
                {loading ? "Sending..." : "Send Enquiry"}
              </button>
            </form>
            <button
              onClick={closeModal}
              className="mt-4 block mx-auto text-gray-500 hover:underline text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Our Promise Section */}
      <div className="bg-pink-50 p-10 md:p-16">
        <h2 className="text-4xl font-bold text-center mb-10">Our Promise to You</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: "🎯", title: "100% Satisfaction", desc: "We aim for excellence in every course." },
            { icon: "📞", title: "Lifetime Support", desc: "Always here for you after training." },
            { icon: "🎓", title: "Certified Trainers", desc: "Learn from experienced professionals." },
            { icon: "💼", title: "Career Ready", desc: "Placement support and career guidance." },
          ].map((item, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
