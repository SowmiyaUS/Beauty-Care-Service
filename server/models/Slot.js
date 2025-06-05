const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema(
    {
      service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true,
      },
      date: {
        type: String, // Example: "2025-05-02"
        required: true,
      },
      time: {
        type: String, // Example: "10:00 AM"
        required: true,
      },
      isBooked: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

const Slot = mongoose.model("Slot", slotSchema);
module.exports = Slot;