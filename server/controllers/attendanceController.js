const Attendance = require("../models/Attendance");
const mongoose = require("mongoose");

// =====================================================
// GET ALL ATTENDANCE
// GET /api/attendance
// =====================================================

const getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .sort({ date: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: attendance.length,
      attendance,
    });
  } catch (error) {
    console.error("Get Attendance Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch attendance",
      error: error.message,
    });
  }
};

// =====================================================
// GET SINGLE ATTENDANCE
// GET /api/attendance/:id
// =====================================================

const getAttendanceById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid attendance ID",
      });
    }

    const attendance = await Attendance.findById(id);

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance record not found",
      });
    }

    res.status(200).json({
      success: true,
      attendance,
    });
  } catch (error) {
    console.error("Get Attendance Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch attendance",
      error: error.message,
    });
  }
};

// =====================================================
// ADD ATTENDANCE
// POST /api/attendance
// =====================================================

const addAttendance = async (req, res) => {
  try {
    const {
      studentName,
      rollNumber,
      date,
      status,
      className,
      department,
      remarks,
    } = req.body;

    if (!studentName || !rollNumber || !date) {
      return res.status(400).json({
        success: false,
        message:
          "Student name, roll number and date are required",
      });
    }

    const attendance = await Attendance.create({
      studentName: studentName.trim(),
      rollNumber: rollNumber.trim(),
      date,
      status: status || "Present",
      className: className
        ? className.trim()
        : "",
      department: department
        ? department.trim()
        : "",
      remarks: remarks
        ? remarks.trim()
        : "",
    });

    res.status(201).json({
      success: true,
      message: "Attendance added successfully",
      attendance,
    });
  } catch (error) {
    console.error("Add Attendance Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add attendance",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE ATTENDANCE
// PUT /api/attendance/:id
// =====================================================

const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid attendance ID",
      });
    }

    const attendance = await Attendance.findById(id);

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance record not found",
      });
    }

    const {
      studentName,
      rollNumber,
      date,
      status,
      className,
      department,
      remarks,
    } = req.body;

    if (studentName !== undefined) {
      attendance.studentName = studentName.trim();
    }

    if (rollNumber !== undefined) {
      attendance.rollNumber = rollNumber.trim();
    }

    if (date !== undefined && date !== "") {
      attendance.date = date;
    }

    if (status !== undefined && status !== "") {
      attendance.status = status;
    }

    if (className !== undefined) {
      attendance.className = className.trim();
    }

    if (department !== undefined) {
      attendance.department = department.trim();
    }

    if (remarks !== undefined) {
      attendance.remarks = remarks.trim();
    }

    await attendance.save();

    res.status(200).json({
      success: true,
      message: "Attendance updated successfully",
      attendance,
    });
  } catch (error) {
    console.error("Update Attendance Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update attendance",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE ATTENDANCE
// DELETE /api/attendance/:id
// =====================================================

const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid attendance ID",
      });
    }

    const attendance = await Attendance.findById(id);

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance record not found",
      });
    }

    await Attendance.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Attendance deleted successfully",
    });
  } catch (error) {
    console.error("Delete Attendance Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete attendance",
      error: error.message,
    });
  }
};

// =====================================================
// EXPORT
// =====================================================

module.exports = {
  getAttendance,
  getAttendanceById,
  addAttendance,
  updateAttendance,
  deleteAttendance,
};