"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5174";

export default function Enquiry() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/enquiries/get-all`);
        setEnquiries(res.data.enquiries || []);
      } catch (error) {
        console.error("Failed to fetch enquiries:", error);
        toast.error("Error fetching enquiry data");
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiries();
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading Enquiries...</div>;
  }

  return (
    <div className="min-h-screen bg-pink-50 p-6">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-center text-pink-700 mb-8">All Course Enquiries</h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-pink-100 text-pink-800 text-left">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Course Name</th>
              <th className="p-4">Price</th>
              <th className="p-4">Message</th>
              <th className="p-4">Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.length > 0 ? (
              enquiries.map((enquiry) => (
                <tr key={enquiry._id} className="border-b hover:bg-pink-50">
                  <td className="p-4 font-semibold">{enquiry.name}</td>
                  <td className="p-4">{enquiry.email}</td>
                  <td className="p-4">{enquiry.phone}</td>
                  <td className="p-4">{enquiry.courseName}</td>
                  <td className="p-4 font-bold text-pink-600">{enquiry.coursePrice}</td>
                  <td className="p-4 text-gray-500">{enquiry.courseDescription}</td>
                  <td className="p-4 text-gray-400 text-xs">{new Date(enquiry.createdAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-6 text-center text-gray-400">No enquiries found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
