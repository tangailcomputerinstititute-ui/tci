const express = require("express");
const multer = require("multer");
//Multer
const {
  getAllStudent,
  createStudent,
  deleteStudent,
} = require("../controller/student.controller");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", getAllStudent);
router.post("/", upload.single("file"), createStudent);
router.delete("/:id", deleteStudent);

module.exports = router;
