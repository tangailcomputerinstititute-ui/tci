const SiteInfo = require("../model/site.model");

const createSiteInfo = async (req, res) => {
  try {
    const {
      siteName,
      address,
      mobile,
      siteVideoUrl,
      siteDescription,
      siteDescriptionTitel,
    } = req.body;
    const newInfo = new SiteInfo({
      siteName,
      address,
      mobile,
      siteVideoUrl,
      siteDescription,
      siteDescriptionTitel,
    });
    await newInfo.save();
    res.json(newInfo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Get site info (single document ধরে নিচ্ছি)
const getSiteInfo = async (req, res) => {
  try {
    const info = await SiteInfo.findOne();
    res.json(info);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update site info
const updateSiteInfo = async (req, res) => {
  try {
    const {
      siteName,
      address,
      mobile,
      siteVideoUrl,
      siteDescription,
      siteDescriptionTitel,
    } = req.body;
    const updated = await SiteInfo.findOneAndUpdate(
      {}, // single doc ধরে নিচ্ছি
      {
        siteName,
        address,
        mobile,
        siteVideoUrl,
        siteDescription,
        siteDescriptionTitel,
      },
      { new: true, upsert: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getSiteInfo, updateSiteInfo, createSiteInfo };
