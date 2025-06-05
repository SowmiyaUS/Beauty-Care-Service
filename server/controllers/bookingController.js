const Razorpay = require("razorpay");
const crypto = require("crypto");
const Booking = require("../models/Booking");
const Service = require("../models/Service");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ==============================
// Create Razorpay Booking Order (Manual Slot with personal info)
// ==============================
exports.createBookingOrder = async (req, res) => {
  try {
    const { userId, services, customerDetails } = req.body;

    if (!userId || !Array.isArray(services) || services.length === 0 || !customerDetails) {
      return res.status(400).json({ message: "Invalid payload" });
    }

    let total = 0;
    const validServiceData = [];

    for (const entry of services) {
      const service = await Service.findById(entry.serviceId);
      if (!service) continue;

      total += service.price;
      validServiceData.push({
        service: service._id,
        date: entry.date,
        time: entry.time,
      });
    }

    if (validServiceData.length === 0) {
      return res.status(400).json({ message: "No valid services found" });
    }

    const razorpayOrder = await razorpay.orders.create({
      amount: total * 100,
      currency: "INR",
      receipt: `receipt_booking_${Date.now()}`,
    });

    await Booking.create({
      user: userId,
      services: validServiceData.map((s) => s.service),
      customSlots: validServiceData.map((s) => ({
        service: s.service,
        date: s.date,
        time: s.time,
      })),
      total,
      customerDetails: {
        name: customerDetails.name,
        email: customerDetails.email,
        contact: customerDetails.contact,
      },
      paymentStatus: "pending",
      paymentId: razorpayOrder.id,
    });

    res.status(200).json({
      success: true,
      orderId: razorpayOrder.id,
      amount: total * 100,
    });
  } catch (err) {
    console.error("Booking order creation error:", err);
    res.status(500).json({ message: "Failed to create booking order" });
  }
};

// ==============================
// Confirm Booking After Payment
// ==============================
exports.confirmBooking = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: "Missing payment verification data" });
    }

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    const booking = await Booking.findOne({ paymentId: razorpay_order_id });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.paymentStatus = "paid";
    booking.paymentId = razorpay_payment_id;

    await booking.save();

    res.status(200).json({ success: true, message: "Booking confirmed" });
  } catch (err) {
    console.error("Booking confirmation error:", err);
    res.status(500).json({ message: "Error verifying booking payment" });
  }
};

// ==============================
// User Booking History
// ==============================
exports.getBookingHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "Missing user ID" });
    }

    const bookings = await Booking.find({ user: userId })
      .populate("services")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: bookings });
  } catch (err) {
    console.error("Booking history error:", err);
    res.status(500).json({ message: "Error fetching booking history" });
  }
};

// /controllers/bookingController.js

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email') // get user name and email
      .populate('services', 'name price') // get service names
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: bookings });
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ success: false, message: 'Error fetching bookings' });
  }
};
// /controllers/bookingController.js
exports.adminConfirmBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

    booking.paymentStatus = "paid";
    await booking.save();

    res.status(200).json({ success: true, message: "Booking confirmed successfully" });
  } catch (err) {
    console.error('Admin booking confirm error:', err);
    res.status(500).json({ success: false, message: "Error confirming booking" });
  }
};
