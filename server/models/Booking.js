const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  services: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
  }],
  customSlots: [ // ✅ new field
    {
      service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true,
      },
      date: {
        type: String, // or Date if you want
        required: true,
      },
      time: {
        type: String,
        required: true,
      }
    }
  ],
  total: {
    type: Number,
    required: true,
  },
  customerDetails: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
  },
  paymentId: {
    type: String,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending',
  }
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
