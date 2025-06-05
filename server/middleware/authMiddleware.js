const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const JWT_SECRET = process.env.JWT_SECRET_KEY || "your_jwt_secret_key";

// ✅ Middleware: Verify User Authentication
exports.authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ success: false, message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);
    req.user = decoded;  // Attach user data to request
    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: "Invalid token." });
  }
};

// ✅ Middleware: Role-Based Authorization
exports.roleMiddleware = (roles) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found." });
      }

      if (!roles.includes(user.role)) {
        return res.status(403).json({ success: false, message: "Access denied. Insufficient permissions." });
      }

      next();
    } catch (error) {
      return res.status(500).json({ success: false, message: "Server error." });
    }
  };
};
