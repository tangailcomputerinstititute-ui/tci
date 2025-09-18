const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  createSlide,
  getSlides,
  deleteSlide,
} = require("../controller/slide.controller");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create Slide (with image upload)
router.post("/", upload.single("slideImage"), createSlide);

// Get all Slides
router.get("/", getSlides);

// Delete Slide (with cloudinary image delete)
router.delete("/:id", deleteSlide);

module.exports = router;
