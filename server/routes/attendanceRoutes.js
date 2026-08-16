const express = require("express");

const {
  getAttendance,
  getAttendanceById,
  addAttendance,
  updateAttendance,
  deleteAttendance,
} = require("../controllers/attendanceController");

const router = express.Router();

// =====================================================
// GET ALL ATTENDANCE
// GET /api/attendance
// =====================================================

router.get("/", getAttendance);

// =====================================================
// GET SINGLE ATTENDANCE
// GET /api/attendance/:id
// =====================================================

router.get("/:id", getAttendanceById);

// =====================================================
// ADD ATTENDANCE
// POST /api/attendance
// =====================================================

router.post("/", addAttendance);

// =====================================================
// UPDATE ATTENDANCE
// PUT /api/attendance/:id
// =====================================================

router.put("/:id", updateAttendance);

// =====================================================
// DELETE ATTENDANCE
// DELETE /api/attendance/:id
// =====================================================

router.delete("/:id", deleteAttendance);

module.exports = router;