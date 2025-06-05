"use client";

import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5174";

export default function AuthPopup({ onClose, onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const endpoint = isSignUp ? "/api/auth/signup" : "/api/auth/signin";
    const url = `${API_BASE_URL}${endpoint}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || `Error ${response.status}`);
      }

      if (isSignUp) {
        toast.success("Account Created! Please sign in.", { autoClose: 3000 });
        setIsSignUp(false);
        return;
      }

      if (!data.token) throw new Error("No token received.");

      const decoded = jwtDecode(data.token);
      if (!decoded.id) throw new Error("Invalid token - missing ID.");

      const userData = {
        id: decoded.id,
        name: decoded.name || "User",
        email: decoded.email || "",
        role: decoded.role || "user",
        token: data.token,
      };

      localStorage.setItem("userToken", data.token);
      localStorage.setItem("userId", decoded.id);

      onLoginSuccess(userData);
      toast.success("Welcome Back!", { autoClose: 3000 });
      setTimeout(() => onClose(), 1500);
    } catch (error) {
      console.error("Auth Error:", error.message);
      toast.error(error.message || "Something went wrong.", { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md z-50">
      <div className="relative w-full max-w-md bg-gray-900 shadow-2xl rounded-xl p-6 border border-gray-700 text-white">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <AiOutlineClose size={24} />
        </button>

        <h2 className="text-center text-2xl font-semibold mb-4">
          {isSignUp ? "Create Account" : "Sign In"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-md text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-md text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-md text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
            disabled={loading}
          >
            {loading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-gray-400">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
          </span>
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-400 ml-2 hover:underline"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}
