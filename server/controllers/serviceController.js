const Service = require("../models/Service");
const Slot = require("../models/Slot");

// ===============================
// GET all services
// ===============================
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json({ success: true, services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// GET service by ID
// ===============================
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }
    res.status(200).json({ success: true, service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// CREATE a new service (with slots)
// ===============================
const createService = async (req, res) => {
  try {
    const { name, description, duration, price, slots } = req.body;

    const service = new Service({
      name,
      description,
      duration,
      price,
    });
    await service.save();

    if (slots && Array.isArray(slots)) {
      const slotDocuments = slots.map(slot => ({
        service: service._id,
        date: slot.date,
        time: slot.time,
      }));

      await Slot.insertMany(slotDocuments);
    }

    res.status(201).json({ success: true, service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// UPDATE a service
// ===============================
const updateService = async (req, res) => {
  try {
    const { name, description, duration, price } = req.body;

    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    service.name = name || service.name;
    service.description = description || service.description;
    service.duration = duration || service.duration;
    service.price = price || service.price;

    await service.save();

    res.status(200).json({ success: true, service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// DELETE a service and its slots
// ===============================
const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    // Delete all slots related to this service
    await Slot.deleteMany({ service: service._id });

    // Correct method to delete the service document itself
    await service.deleteOne();

    res.status(200).json({ success: true, message: "Service and related slots deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getSlotsForService = async (req, res) => {
  try {
    const { serviceId, date } = req.query;

    if (!serviceId || !date) {
      return res.status(400).json({ success: false, message: "Missing serviceId or date" });
    }

    const slots = await Slot.find({
      service: serviceId,
      date,
      isBooked: false,
    }).sort({ time: 1 });

    res.status(200).json(slots);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// Exports
// ===============================
module.exports = {
  getAllServices,
  getSlotsForService,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
