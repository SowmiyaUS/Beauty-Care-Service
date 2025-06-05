const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Service name is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    duration: {
      type: String, // Example: "30 mins", "1 hr"
      required: [true, "Service duration is required"],
    },
    price: {
      type: Number,
      required: [true, "Service price is required"],
      min: [0, "Price must be a positive number"],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;