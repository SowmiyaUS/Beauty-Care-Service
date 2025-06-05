const express = require("express");
const router = express.Router();
const { createEnquiry, getAllEnquiries } = require("../controllers/enquiryController");

router.post("/create", createEnquiry);
router.get("/get-all", getAllEnquiries);

module.exports = router;
