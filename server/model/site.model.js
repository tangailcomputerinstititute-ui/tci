const mongoose = require("mongoose");

const siteInfoSchema = new mongoose.Schema(
  {
    siteName: {
      type: String,
    },
    address: {
      type: String,
    },
    mobile: {
      type: String,
    },
    siteVideoUrl: {
      type: String,
    },
    siteDescription: {
      type: String,
    },
    siteDescriptionTitel: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SiteInfo", siteInfoSchema);
