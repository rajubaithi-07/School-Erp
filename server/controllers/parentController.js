const Parent = require("../models/Parent");
const mongoose = require("mongoose");

// =====================================================
// GET ALL PARENTS
// GET /api/parents
// =====================================================

const getParents = async (req, res) => {
  try {
    const parents = await Parent.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: parents.length,
      parents,
    });
  } catch (error) {
    console.error("Get Parents Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch parents",
      error: error.message,
    });
  }
};

// =====================================================
// GET SINGLE PARENT
// GET /api/parents/:id
// =====================================================

const getParentById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid parent ID",
      });
    }

    const parent = await Parent.findById(id).select("-password");

    if (!parent) {
      return res.status(404).json({
        success: false,
        message: "Parent not found",
      });
    }

    res.status(200).json({
      success: true,
      parent,
    });
  } catch (error) {
    console.error("Get Parent Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch parent",
      error: error.message,
    });
  }
};

// =====================================================
// ADD PARENT
// POST /api/parents
// =====================================================

const addParent = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      relationship,
      studentName,
      studentRollNumber,
      password,
      status,
    } = req.body;

    // Required fields
    if (!name || !email || !studentName || !studentRollNumber) {
      return res.status(400).json({
        success: false,
        message:
          "Name, email, student name and student roll number are required",
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanStudentName = studentName.trim();
    const cleanStudentRollNumber = studentRollNumber.trim();

    // Check duplicate email
    const existingParent = await Parent.findOne({
      email: cleanEmail,
    });

    if (existingParent) {
      return res.status(409).json({
        success: false,
        message: "A parent with this email already exists",
      });
    }

    const parent = await Parent.create({
      name: cleanName,
      email: cleanEmail,
      phone: phone ? phone.trim() : "",
      relationship: relationship
        ? relationship.trim()
        : "Parent",
      studentName: cleanStudentName,
      studentRollNumber: cleanStudentRollNumber,
      password: password || "",
      status: status || "Active",
    });

    const parentResponse = parent.toObject();

    delete parentResponse.password;

    res.status(201).json({
      success: true,
      message: "Parent added successfully",
      parent: parentResponse,
    });
  } catch (error) {
    console.error("Add Parent Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add parent",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE PARENT
// PUT /api/parents/:id
// =====================================================

const updateParent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid parent ID",
      });
    }

    const parent = await Parent.findById(id);

    if (!parent) {
      return res.status(404).json({
        success: false,
        message: "Parent not found",
      });
    }

    const {
      name,
      email,
      phone,
      relationship,
      studentName,
      studentRollNumber,
      password,
      status,
    } = req.body;

    // Check duplicate email
    if (email !== undefined && email.trim() !== "") {
      const cleanEmail = email.trim().toLowerCase();

      const duplicateParent = await Parent.findOne({
        email: cleanEmail,
        _id: { $ne: id },
      });

      if (duplicateParent) {
        return res.status(409).json({
          success: false,
          message: "Another parent already uses this email",
        });
      }

      parent.email = cleanEmail;
    }

    if (name !== undefined && name.trim() !== "") {
      parent.name = name.trim();
    }

    if (phone !== undefined) {
      parent.phone = phone.trim();
    }

    if (
      relationship !== undefined &&
      relationship.trim() !== ""
    ) {
      parent.relationship = relationship.trim();
    }

    if (
      studentName !== undefined &&
      studentName.trim() !== ""
    ) {
      parent.studentName = studentName.trim();
    }

    if (
      studentRollNumber !== undefined &&
      studentRollNumber.trim() !== ""
    ) {
      parent.studentRollNumber =
        studentRollNumber.trim();
    }

    if (
      password !== undefined &&
      password.trim() !== ""
    ) {
      parent.password = password;
    }

    if (
      status !== undefined &&
      status !== ""
    ) {
      parent.status = status;
    }

    await parent.save();

    const parentResponse = parent.toObject();

    delete parentResponse.password;

    res.status(200).json({
      success: true,
      message: "Parent updated successfully",
      parent: parentResponse,
    });
  } catch (error) {
    console.error("Update Parent Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update parent",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE PARENT
// DELETE /api/parents/:id
// =====================================================

const deleteParent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid parent ID",
      });
    }

    const parent = await Parent.findById(id);

    if (!parent) {
      return res.status(404).json({
        success: false,
        message: "Parent not found",
      });
    }

    await Parent.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Parent deleted successfully",
    });
  } catch (error) {
    console.error("Delete Parent Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete parent",
      error: error.message,
    });
  }
};

// =====================================================
// EXPORT
// =====================================================

module.exports = {
  getParents,
  getParentById,
  addParent,
  updateParent,
  deleteParent,
};