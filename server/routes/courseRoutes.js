const express = require("express");

const router = express.Router();

const {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

// =====================================================
// COURSE ROUTES
// =====================================================

// GET all courses
router.get("/", getCourses);

// GET single course
router.get("/:id", getCourseById);

// CREATE course
router.post("/", createCourse);

// UPDATE course
router.put("/:id", updateCourse);

// DELETE course
router.delete("/:id", deleteCourse);

module.exports = router;