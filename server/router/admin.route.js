const express = require("express");
const {
  getAdmin,
  createAdmin,
  getAllAdmins,
  updateAdmin,
  deleteAdmin,
} = require("../controller/admin.controller");
const router = express.Router();

router.get("/", getAllAdmins);
router.get("/:adminName", getAdmin);
router.post("/", createAdmin);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);

module.exports = router;
