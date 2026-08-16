const express = require("express");

const router = express.Router();

const {
  getExaminations,
  getExaminationById,
  createExamination,
  updateExamination,
  deleteExamination,
} = require("../controllers/examinationController");

// =====================================================
// GET ALL EXAMINATION RECORDS
// GET /api/examinations
// =====================================================

router.get("/", getExaminations);

// =====================================================
// GET SINGLE EXAMINATION
// GET /api/examinations/:id
// =====================================================

router.get("/:id", getExaminationById);

// =====================================================
// CREATE EXAMINATION
// POST /api/examinations
// =====================================================

router.post("/", createExamination);

// =====================================================
// UPDATE EXAMINATION
// PUT /api/examinations/:id
// =====================================================

router.put("/:id", updateExamination);

// =====================================================
// DELETE EXAMINATION
// DELETE /api/examinations/:id
// =====================================================

router.delete("/:id", deleteExamination);

module.exports = router;