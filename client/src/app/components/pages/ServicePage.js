"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../Footer";

export default function ServicePage() {
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedDateTime, setSelectedDateTime] = useState({});
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({ name: "", email: "", contact: "" });

  const total = selectedServices.reduce((sum, s) => sum + s.price, 0);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("http://localhost:5174/api/services/get");
        setServices(res.data.services);
      } catch (error) {
        toast.error("Failed to load services");
      }
    };

    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) setUserId(storedUserId);

    fetchServices();
  }, []);

  const handleServiceSelect = (service) => {
    if (selectedServices.find((s) => s._id === service._id)) return;
    setSelectedServices((prev) => [...prev, service]);
  };

  const handleRemoveService = (serviceId) => {
    setSelectedServices((prev) => prev.filter((s) => s._id !== serviceId));
    setSelectedDateTime((prev) => {
      const newSlots = { ...prev };
      delete newSlots[serviceId];
      return newSlots;
    });
  };

  const handleDateChange = (serviceId, date) => {
    setSelectedDateTime((prev) => ({
      ...prev,
      [serviceId]: { ...prev[serviceId], date },
    }));
  };

  const handleTimeChange = (serviceId, time) => {
    setSelectedDateTime((prev) => ({
      ...prev,
      [serviceId]: { ...prev[serviceId], time },
    }));
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleOpenDetailsModal = () => {
    if (selectedServices.length === 0) return toast.error("Select at least one service!");
    setShowDetailsModal(true);
  };

  const handlePayment = async () => {
    if (!userId) return toast.error("User ID missing. Please login first.");

    const serviceDateTimes = selectedServices.map((s) => ({
      serviceId: s._id,
      date: selectedDateTime[s._id]?.date,
      time: selectedDateTime[s._id]?.time,
    }));

    for (let sdt of serviceDateTimes) {
      if (!sdt.date || !sdt.time) {
        return toast.error("Please select date and time for all services.");
      }
    }

    if (!customerDetails.name || !customerDetails.email || !customerDetails.contact) {
      return toast.error("Please fill your personal details.");
    }

    try {
      setLoading(true);

      const loaded = await loadRazorpayScript();
      if (!loaded) {
        toast.error("Failed to load Razorpay SDK");
        return;
      }

      const { data } = await axios.post("http://localhost:5174/api/bookings/create-order", {
        userId,
        services: serviceDateTimes,
        customerDetails,
      });

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_dLsY6wk9J0Wvon", // your real test key
        amount: data.amount,
        currency: "INR",
        order_id: data.orderId,
        name: "Beauty Booking",
        description: "Confirm your booking",
        handler: async function (response) {
          await axios.post("http://localhost:5174/api/bookings/verify-payment", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            userId,
          });
          toast.success("🎉 Booking confirmed!");
          setSelectedServices([]);
          setSelectedDateTime({});
          setCustomerDetails({ name: "", email: "", contact: "" });
          setShowDetailsModal(false);
        },
        prefill: {
          name: customerDetails.name,
          email: customerDetails.email,
          contact: customerDetails.contact,
        },
        theme: { color: "#ec4899" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      toast.error("Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-black">
      <ToastContainer />
      <div className="max-w-6xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Book Your Beauty Services</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => {
            const isSelected = selectedServices.find((s) => s._id === service._id);
            return (
              <div key={service._id} className="border rounded-xl bg-white p-5 shadow-sm hover:shadow-md transition">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="font-semibold text-xl text-gray-800">{service.name}</h2>
                    <p className="text-gray-500 text-sm">{service.duration}</p>
                    <p className="text-pink-600 font-bold mt-1">₹{service.price}</p>
                  </div>
                  {isSelected ? (
                    <button
                      onClick={() => handleRemoveService(service._id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      onClick={() => handleServiceSelect(service)}
                      className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
                    >
                      Add
                    </button>
                  )}
                </div>

                {isSelected && (
                  <div className="mt-4 space-y-2">
                    <label className="text-sm font-medium block">Select Date:</label>
                    <input
                      type="date"
                      className="border rounded px-3 py-2 w-full"
                      onChange={(e) => handleDateChange(service._id, e.target.value)}
                    />
                    <label className="text-sm font-medium block mt-2">Select Time:</label>
                    <input
                      type="time"
                      className="border rounded px-3 py-2 w-full"
                      onChange={(e) => handleTimeChange(service._id, e.target.value)}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {selectedServices.length > 0 && (
          <div className="mt-10 bg-white border p-6 rounded-xl shadow-md max-w-xl mx-auto">
            <h2 className="text-xl font-bold mb-3 text-center">Booking Summary</h2>
            <ul className="divide-y">
              {selectedServices.map((s) => (
                <li key={s._id} className="flex justify-between py-2 text-gray-700">
                  <span>{s.name}</span>
                  <span>₹{s.price}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between mt-4 font-semibold text-lg text-gray-800">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
            <button
              disabled={loading}
              onClick={handleOpenDetailsModal}
              className="w-full mt-6 py-3 bg-pink-600 text-white font-semibold rounded hover:bg-pink-700"
            >
              {loading ? "Processing..." : "Continue & Pay"}
            </button>
          </div>
        )}
      </div>

      {showDetailsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Enter Your Details</h3>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border px-3 py-2 rounded mb-3"
              value={customerDetails.name}
              onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border px-3 py-2 rounded mb-3"
              value={customerDetails.email}
              onChange={(e) => setCustomerDetails({ ...customerDetails, email: e.target.value })}
            />
            <input
              type="tel"
              placeholder="Contact Number"
              className="w-full border px-3 py-2 rounded mb-3"
              value={customerDetails.contact}
              onChange={(e) => setCustomerDetails({ ...customerDetails, contact: e.target.value })}
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 text-black rounded"
                onClick={() => setShowDetailsModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
                onClick={handlePayment}
              >
                Pay & Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
