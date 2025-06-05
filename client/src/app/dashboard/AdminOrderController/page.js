"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5174";

export default function AdminServicePage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "", duration: "", price: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/services/get`);
      setServices(res.data.services || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch services");
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setFormData({ name: "", description: "", duration: "", price: "" });
    setEditingId(null);
    setShowModal(true);
  };

  const openEditModal = (service) => {
    setFormData({
      name: service.name,
      description: service.description,
      duration: service.duration,
      price: service.price,
    });
    setEditingId(service._id);
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_BASE_URL}/api/services/update/${editingId}`, formData);
        toast.success("Service updated successfully");
      } else {
        await axios.post(`${API_BASE_URL}/api/services/create`, formData);
        toast.success("Service created successfully");
      }
      fetchServices();
      setShowModal(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save service");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/services/delete/${id}`);
      toast.success("Service deleted");
      fetchServices();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete service");
    }
  };

  if (loading) return <div className="text-center mt-20">Loading Services...</div>;

  return (
    <div className="min-h-screen bg-pink-50 p-6">
      <ToastContainer />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-pink-600">Manage Services</h1>
        <button
          onClick={openCreateModal}
          className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-md"
        >
          + Create Service
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-pink-100">
            <tr>
              <th className="p-4 text-left">Service Name</th>
              <th className="p-4 text-left">Duration</th>
              <th className="p-4 text-left">Price (₹)</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map(service => (
              <tr key={service._id} className="border-b">
                <td className="p-4">{service.name}</td>
                <td className="p-4">{service.duration}</td>
                <td className="p-4 font-bold">₹{service.price}</td>
                <td className="p-4 space-x-2">
                  <button
                    onClick={() => openEditModal(service)}
                    className="px-3 py-1 bg-pink-500 hover:bg-pink-600 text-white rounded text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-pink-50 p-8 rounded-xl w-full max-w-md shadow-lg">
            <h2 className="text-2xl font-bold text-center text-pink-600 mb-6">
              {editingId ? "Edit Service" : "Create Service"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                placeholder="Service Name"
                className="w-full px-4 py-2 rounded-lg bg-white border border-pink-300 text-pink-900 placeholder-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300"
                required
              />

              <textarea
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                placeholder="Service Description"
                rows="3"
                className="w-full px-4 py-2 rounded-lg bg-white border border-pink-300 text-pink-900 placeholder-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300"
                required
              />

              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleFormChange}
                placeholder="Duration (eg: 30 mins)"
                className="w-full px-4 py-2 rounded-lg bg-white border border-pink-300 text-pink-900 placeholder-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300"
                required
              />

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleFormChange}
                placeholder="Price (₹)"
                className="w-full px-4 py-2 rounded-lg bg-white border border-pink-300 text-pink-900 placeholder-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300"
                required
              />

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-pink-400 text-pink-600 rounded-md hover:bg-pink-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-md"
                >
                  {editingId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
