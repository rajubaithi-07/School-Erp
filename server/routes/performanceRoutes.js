const express = require("express");

const {
  getPerformances,
  getPerformanceById,
  addPerformance,
  updatePerformance,
  deletePerformance,
} = require("../controllers/performanceController");

const router = express.Router();

// =====================================================
// GET ALL PERFORMANCE RECORDS
// GET /api/performance
// =====================================================

router.get("/", getPerformances);

// =====================================================
// GET SINGLE PERFORMANCE
// GET /api/performance/:id
// =====================================================

router.get("/:id", getPerformanceById);

// =====================================================
// ADD PERFORMANCE
// POST /api/performance
// =====================================================

router.post("/", addPerformance);

// =====================================================
// UPDATE PERFORMANCE
// PUT /api/performance/:id
// =====================================================

router.put("/:id", updatePerformance);

// =====================================================
// DELETE PERFORMANCE
// DELETE /api/performance/:id
// =====================================================

router.delete("/:id", deletePerformance);

// =====================================================
// EXPORT ROUTER
// =====================================================

module.exports = router;