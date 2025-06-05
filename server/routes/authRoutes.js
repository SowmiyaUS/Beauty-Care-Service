const express = require("express");
const {
  signUp,
  signIn,
  getUserDetails
} = require("../controllers/authController");
const {
  authMiddleware,
  roleMiddleware
} = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Public Routes
router.post("/signup", signUp);
router.post("/signin", signIn);

// ✅ Protected Route: Get logged-in user details
router.get("/me", authMiddleware, getUserDetails);

// ✅ Protected Route: Admin-only access
router.get("/admin", authMiddleware, roleMiddleware(["admin"]), (req, res) => {
  res.json({ success: true, message: "Welcome Admin!" });
});

module.exports = router;
