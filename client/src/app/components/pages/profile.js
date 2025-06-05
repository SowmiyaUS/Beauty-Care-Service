"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { CalendarDaysIcon, ClockIcon } from "@heroicons/react/24/outline";

export default function UserProfilePage() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5174";

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const userId = localStorage.getItem("userId");
    if (!token || !userId) return;

    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data.user);
      } catch (err) {
        toast.error("Failed to fetch user profile");
      }
    };

    const fetchUserBookings = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/bookings/history/${userId}`);
        setBookings(res.data.data);
      } catch (err) {
        toast.error("Failed to fetch user bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
    fetchUserBookings();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-pink-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-2 text-pink-700">User Profile</h2>
          {user && (
            <div className="space-y-2 text-gray-700">
              <p><span className="font-semibold">Name:</span> {user.name}</p>
              <p><span className="font-semibold">Email:</span> {user.email}</p>
              <button
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-pink-700">My Bookings</h2>
          {loading ? (
            <p>Loading...</p>
          ) : bookings.length === 0 ? (
            <p>No bookings found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-pink-100">
                  <tr>
                    <th className="p-3 text-left">Services</th>
                    <th className="p-3 text-left">Date & Time</th>
                    <th className="p-3 text-left">Amount</th>
                    <th className="p-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking._id} className="border-b">
                      <td className="p-3">
                        {booking.services.map((s) => (
                          <div key={s._id}>• {s.name}</div>
                        ))}
                      </td>
                      <td className="p-3">
                        {booking.customSlots.map((slot, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CalendarDaysIcon className="w-4 h-4 text-pink-500" />
                            {slot.date}
                            <ClockIcon className="w-4 h-4 text-yellow-500" />
                            {slot.time}
                          </div>
                        ))}
                      </td>
                      <td className="p-3 font-medium text-pink-800">₹{booking.total}</td>
                      <td className="p-3">
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
          )}
        </div>
      </div>
    </div>
  );
}
