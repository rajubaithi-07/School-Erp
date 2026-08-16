const express = require("express");

const router = express.Router();

const {
  getActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
} = require("../controllers/activityController");

// GET all activities
router.get("/", getActivities);

// GET single activity
router.get("/:id", getActivityById);

// CREATE activity
router.post("/", createActivity);

// UPDATE activity
router.put("/:id", updateActivity);

// DELETE activity
router.delete("/:id", deleteActivity);

module.exports = router;