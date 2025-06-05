"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CalendarDaysIcon, ClockIcon } from "@heroicons/react/24/outline";

export default function AdminBookingPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5174";
        const res = await axios.get(`${API_BASE_URL}/api/bookings/get/all`);
        setBookings(res.data.data);
      } catch (err) {
        console.error("Booking fetch error:", err);
        toast.error("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) return <div className="text-center mt-20">Loading Bookings...</div>;

  return (
    <div className="min-h-screen bg-pink-50 py-10 px-4">
      <ToastContainer />
      <h1 className="text-4xl font-bold text-center text-pink-700 mb-10">All Bookings</h1>
      <div className="bg-white rounded-xl shadow-xl overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-pink-100 text-pink-800">
            <tr className="text-left">
              <th className="p-4">Customer</th>
              <th className="p-4">Services</th>
              <th className="p-4">Date & Time</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="border-b align-top">
                <td className="p-4 w-1/4">
                  <div className="font-semibold text-pink-900">{booking.customerDetails.name}</div>
                  <div className="text-xs text-gray-500">{booking.customerDetails.email}</div>
                  <div className="text-xs text-gray-500">{booking.customerDetails.contact}</div>
                </td>
                <td className="p-4 w-1/4">
                  {booking.services.map((service) => (
                    <div key={service._id} className="text-sm">• {service.name}</div>
                  ))}
                </td>
                <td className="p-4 w-1/4 space-y-1">
                  {booking.customSlots?.map((slot, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <CalendarDaysIcon className="w-4 h-4 text-pink-500" />
                      <span>{slot.date}</span>
                      <ClockIcon className="w-4 h-4 text-yellow-500" />
                      <span>{slot.time}</span>
                    </div>
                  ))}
                </td>
                <td className="p-4 w-1/6 font-semibold text-pink-800">₹{booking.total}</td>
                <td className="p-4 w-1/6">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    booking.paymentStatus === "paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {booking.paymentStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
