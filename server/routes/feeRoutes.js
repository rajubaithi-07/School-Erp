const express = require("express");

const {
  getFees,
  getFeeById,
  addFee,
  updateFee,
  deleteFee,
} = require("../controllers/feeController");

const router = express.Router();

// =====================================================
// GET ALL FEES
// GET /api/fees
// =====================================================

router.get("/", getFees);

// =====================================================
// GET SINGLE FEE
// GET /api/fees/:id
// =====================================================

router.get("/:id", getFeeById);

// =====================================================
// ADD FEE
// POST /api/fees
// =====================================================

router.post("/", addFee);

// =====================================================
// UPDATE FEE
// PUT /api/fees/:id
// =====================================================

router.put("/:id", updateFee);

// =====================================================
// DELETE FEE
// DELETE /api/fees/:id
// =====================================================

router.delete("/:id", deleteFee);

module.exports = router;