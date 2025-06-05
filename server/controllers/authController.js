const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const JWT_SECRET = process.env.JWT_SECRET_KEY || "your_jwt_secret_key";
const JWT_EXPIRATION = "24h";

// ✅ User Sign Up
const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRATION }
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    });

  } catch (error) {
    console.error("SignUp Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ User Sign In
const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRATION }
    );

    res.json({
      success: true,
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (error) {
    console.error("SignIn Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Get User Details
const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("GetUserDetails Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ User Logout
const logout = (req, res) => {
  res.json({ success: true, message: "Logged out successfully" });
};

module.exports = {
  signUp,
  signIn,
  getUserDetails,
  logout
};
