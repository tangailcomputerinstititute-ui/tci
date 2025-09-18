const mongoose = require("mongoose");
const courseSchema = mongoose.Schema({
  courseName: String,
  courseTitel: [
    {
      titelName: String,
    },
  ],
  courseDuration: String,
  tags: [
    {
      tagName: String,
    },
  ],
});

module.exports = mongoose.model("couorses", courseSchema);
