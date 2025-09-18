const express = require("express");
const {
  getAllTeacher,
  createTeacher,
  deleteTeacher,
} = require("../controller/teacher.controller");
const multer = require("multer");

const router = express.Router();

// Multer memory storage (লোকাল সেভ না করে মেমোরিতে রাখবে)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes
router.get("/", getAllTeacher);
router.post("/", upload.single("teacherImage"), createTeacher);
router.delete("/:id", deleteTeacher);

module.exports = router;
