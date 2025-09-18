const express = require("express");
const {
  createUser,
  getAllUser,
  deleteUser,
} = require("../controller/user.controller");
const router = express.Router();

router.get("/", getAllUser);
router.post("/", createUser);
router.delete("/:id", deleteUser);
module.exports = router;
