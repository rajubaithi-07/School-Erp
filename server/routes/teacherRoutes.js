const express = require("express");

const router = express.Router();

const {
  getTeachers,
  getTeacherById,
  addTeacher,
  updateTeacher,
  deleteTeacher,
} = require("../controllers/teacherController");


// =====================================================
// GET ALL TEACHERS
// GET /api/teachers
// =====================================================

router.get("/", getTeachers);


// =====================================================
// GET SINGLE TEACHER
// GET /api/teachers/:id
// =====================================================

router.get("/:id", getTeacherById);


// =====================================================
// ADD TEACHER
// POST /api/teachers
// =====================================================

router.post("/", addTeacher);


// =====================================================
// UPDATE TEACHER
// PUT /api/teachers/:id
// =====================================================

router.put("/:id", updateTeacher);


// =====================================================
// DELETE TEACHER
// DELETE /api/teachers/:id
// =====================================================

router.delete("/:id", deleteTeacher);


module.exports = router;