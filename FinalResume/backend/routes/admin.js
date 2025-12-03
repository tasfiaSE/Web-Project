// routes/admin.js
const express = require("express");
const router = express.Router();
const { Resume } = require("../models/resume"); // your resume model
const { verifyAdmin } = require("../middleware/auth"); // middleware to check admin

// GET all resumes
router.get("/resumes", verifyAdmin, async (req, res) => {
  try {
    const resumes = await Resume.find().populate("user", "name email"); // include user info
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch resumes", error: err.message });
  }
});

module.exports = router;
