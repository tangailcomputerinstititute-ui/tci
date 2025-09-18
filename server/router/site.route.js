// routes/siteinfo.js
const express = require("express");
const {
  getSiteInfo,
  updateSiteInfo,
  createSiteInfo,
} = require("../controller/site.controller");
const router = express.Router();

// Get site info (single document ধরে নিচ্ছি)
router.get("/", getSiteInfo);
router.post("/", createSiteInfo);

// Update site info
router.put("/", updateSiteInfo);

module.exports = router;
