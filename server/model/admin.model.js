const mongoose = require("mongoose");
const adminSchema = mongoose.Schema({
  adminName: String,
  adminPassword: String,
  adminType: String,
});

module.exports = mongoose.model("admin", adminSchema);
