const express = require("express");

const {
  getParents,
  getParentById,
  addParent,
  updateParent,
  deleteParent,
} = require("../controllers/parentController");

const router = express.Router();

// =====================================================
// GET ALL PARENTS
// GET /api/parents
// =====================================================

router.get("/", getParents);

// =====================================================
// GET SINGLE PARENT
// GET /api/parents/:id
// =====================================================

router.get("/:id", getParentById);

// =====================================================
// ADD PARENT
// POST /api/parents
// =====================================================

router.post("/", addParent);

// =====================================================
// UPDATE PARENT
// PUT /api/parents/:id
// =====================================================

router.put("/:id", updateParent);

// =====================================================
// DELETE PARENT
// DELETE /api/parents/:id
// =====================================================

router.delete("/:id", deleteParent);

module.exports = router;