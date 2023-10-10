const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");

// login
router.post("/login", adminController.adminLogin);

// register
router.post("/register", adminController.registerAdmin);

module.exports = router;
