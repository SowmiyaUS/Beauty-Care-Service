const Enquiry = require("../models/Enquiry");

// Create a new enquiry
const createEnquiry = async (req, res) => {
  try {
    const { name, email, phone, courseName, coursePrice, courseDescription } = req.body;

    const enquiry = new Enquiry({
      name,
      email,
      phone,
      courseName,
      coursePrice,
      courseDescription,
    });

    await enquiry.save();

    res.status(201).json({ success: true, message: "Enquiry submitted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all enquiries (for admin dashboard)
const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, enquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createEnquiry, getAllEnquiries };
