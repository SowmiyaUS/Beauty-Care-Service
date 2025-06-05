const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  courseName: { type: String, required: true },
  coursePrice: { type: String, required: true },
  courseDescription: { type: String, required: true },
}, { timestamps: true });

const Enquiry = mongoose.model("Enquiry", enquirySchema);
module.exports = Enquiry;
