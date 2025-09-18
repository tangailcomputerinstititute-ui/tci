const Course = require("../model/course.model");

const getAllCourses = async (req, res) => {
  try {
    const getCourses = await Course.find();
    res.status(200).json(getCourses);
  } catch (error) {
    console.error(error);
  }
};

const createCourse = async (req, res) => {
  try {
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.status(201).json({ message: "New Course Added successfully" });
  } catch (error) {
    console.error(error);
  }
};

const deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllCourses, createCourse, deleteCourse };
