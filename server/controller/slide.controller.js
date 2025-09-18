const Slide = require("../model/slide.model");
const cloudinary = require("../config/cloudinary");

// Create Slide
const createSlide = async (req, res) => {
  try {
    let slideImageUrl = "";
    let slideImageId = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload_stream(
        { folder: "slides" },
        async (error, result) => {
          if (error) return res.status(500).json({ error });

          slideImageUrl = result.secure_url;
          slideImageId = result.public_id;

          const newSlide = new Slide({
            tag: req.body.tag,
            caption: req.body.caption,
            slideImageUrl,
            slideImageId,
          });

          const savedSlide = await newSlide.save();
          res.status(201).json(savedSlide);
        }
      );
      result.end(req.file.buffer); // stream end
    } else {
      res.status(400).json({ message: "No image provided" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Slides
const getSlides = async (req, res) => {
  try {
    const slides = await Slide.find().sort({ _id: -1 });
    res.json(slides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Slide
const deleteSlide = async (req, res) => {
  try {
    const slide = await Slide.findById(req.params.id);
    if (!slide) return res.status(404).json({ message: "Slide not found" });

    // Delete from Cloudinary
    if (slide.slideImageId) {
      await cloudinary.uploader.destroy(slide.slideImageId);
    }

    await slide.deleteOne();
    res.json({ message: "Slide deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createSlide, getSlides, deleteSlide };
