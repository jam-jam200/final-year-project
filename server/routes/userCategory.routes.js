const express = require("express");
const router = express.Router();
const { create, getAll } = require("../controllers/userCategoryController");
const authController = require("../controllers/authController");

router.get("/", getAll);
router.post("/create", create);

module.exports = router;
