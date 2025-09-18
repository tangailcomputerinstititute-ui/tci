const Admin = require("../model/admin.model");

// নতুন Admin তৈরি
const createAdmin = async (req, res) => {
  try {
    const { adminType, adminName, adminPassword } = req.body;

    const newAdmin = new Admin({
      adminType,
      adminName: adminName.toLowerCase(), // সবসময় lowercase এ save হবে
      adminPassword,
    });

    await newAdmin.save();
    res.status(201).json(newAdmin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// সব Admin পাওয়া
const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// নির্দিষ্ট Admin পাওয়া
const getAdmin = async (req, res) => {
  try {
    const { adminName } = req.params;

    const admin = await Admin.findOne({ adminName: adminName.toLowerCase() });
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    res.json(admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin update
const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { adminName, adminPassword } = req.body; // <-- name fix

    const updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      {
        ...(adminName && { adminName: adminName.toLowerCase() }),
        ...(adminPassword && { adminPassword }),
      },
      { new: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    res.json(updatedAdmin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin ডিলিট
const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAdmin = await Admin.findOneAndDelete({
      _id: id,
    });

    if (!deletedAdmin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    res.json({ message: "Admin deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createAdmin,
  getAllAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin,
};
