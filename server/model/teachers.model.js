const mongoose = require("mongoose");
const teacherSchema = mongoose.Schema({
  teacherName: String,
  selectedCourse: String,
  descriptions: String,
  teacherImageUrl: String,
  teacherImageId: String,
});

module.exports = mongoose.model("teachers", teacherSchema);
