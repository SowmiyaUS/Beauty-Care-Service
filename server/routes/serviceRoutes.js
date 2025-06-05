const express = require("express");
const router = express.Router();
const {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  getSlotsForService
} = require("../controllers/serviceController");

// Routes
router.get("/get", getAllServices);
router.get("/:id", getServiceById);
router.post("/create", createService);
router.put("/update/:id", updateService);
router.delete("/delete/:id", deleteService);
router.get("/slots/get", getSlotsForService);

module.exports = router;
