const express = require("express");

const router = express.Router();

const {
  getStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent,
  studentLogin,
} = require("../controllers/studentController");

// =====================================================
// STUDENT LOGIN
// =====================================================

router.post(
  "/login",
  studentLogin
);

// =====================================================
// GET ALL STUDENTS
// =====================================================

router.get(
  "/",
  getStudents
);

// =====================================================
// GET SINGLE STUDENT
// =====================================================

router.get(
  "/:id",
  getStudentById
);

// =====================================================
// ADD STUDENT
// =====================================================

router.post(
  "/",
  addStudent
);

// =====================================================
// UPDATE STUDENT
// =====================================================

router.put(
  "/:id",
  updateStudent
);

// =====================================================
// DELETE STUDENT
// =====================================================

router.delete(
  "/:id",
  deleteStudent
);

module.exports = router;