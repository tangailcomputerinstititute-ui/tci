const express = require("express");
const {
  createCourse,
  getAllCourses,
  deleteCourse,
} = require("../controller/course.controller");

const router = express.Router();

router.get("/", getAllCourses);
router.post("/", createCourse);
router.delete("/:id", deleteCourse);
module.exports = router;
