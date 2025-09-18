const mongoose = require("mongoose");
const slideSchema = mongoose.Schema({
  tag: String,
  caption: String,
  slideImageUrl: String,
  slideImageId: String,
});

const Slide = mongoose.model("slide", slideSchema);

module.exports = Slide;
