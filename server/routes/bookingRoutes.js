const express = require("express");
const router = express.Router();
const {
  createBookingOrder,
  confirmBooking,
  getBookingHistory,
  getAllBookings,
  adminConfirmBooking
} = require("../controllers/bookingController");

router.post("/create-order", createBookingOrder);
router.post("/verify-payment", confirmBooking);
router.get("/history/:userId", getBookingHistory);
// /routes/bookingRoutes.js
router.get('/get/all', getAllBookings);
// /routes/bookingRoutes.js
router.put('/confirm/:id', adminConfirmBooking);



module.exports = router;
