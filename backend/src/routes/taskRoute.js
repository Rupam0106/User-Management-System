const express = require("express");
const { isAuthenticate } = require("../middlewares/auth");
const { createTask, getAllTask } = require("../controllers/taskController");

const router = express.Router();

router.route("/create").post(isAuthenticate, createTask);
router.route("/list").get(isAuthenticate, getAllTask);

module.exports = router;
