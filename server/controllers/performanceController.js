const Performance = require("../models/Performance");
const mongoose = require("mongoose");

// =====================================================
// GET ALL PERFORMANCE RECORDS
// GET /api/performance
// =====================================================

const getPerformances = async (req, res) => {
  try {
    const performances = await Performance.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: performances.length,
      performances,
    });
  } catch (error) {
    console.error("Get Performance Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch performance records",
      error: error.message,
    });
  }
};

// =====================================================
// GET SINGLE PERFORMANCE
// GET /api/performance/:id
// =====================================================

const getPerformanceById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid performance ID",
      });
    }

    const performance =
      await Performance.findById(id);

    if (!performance) {
      return res.status(404).json({
        success: false,
        message: "Performance record not found",
      });
    }

    res.status(200).json({
      success: true,
      performance,
    });
  } catch (error) {
    console.error(
      "Get Performance By ID Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch performance record",
      error: error.message,
    });
  }
};

// =====================================================
// ADD PERFORMANCE
// POST /api/performance
// =====================================================

const addPerformance = async (req, res) => {
  try {
    const {
      rollNumber,
      studentName,
      subject,
      examType,
      marks,
      totalMarks,
      grade,
      remarks,
      status,
    } = req.body;

    // Required fields
    if (
      !rollNumber ||
      !studentName ||
      !subject ||
      !examType ||
      marks === undefined ||
      totalMarks === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Roll number, student name, subject, exam type, marks and total marks are required",
      });
    }

    const cleanRollNumber =
      String(rollNumber).trim();

    const cleanStudentName =
      String(studentName).trim();

    const cleanSubject =
      String(subject).trim();

    const cleanExamType =
      String(examType).trim();

    const numericMarks =
      Number(marks);

    const numericTotalMarks =
      Number(totalMarks);

    if (
      Number.isNaN(numericMarks) ||
      Number.isNaN(numericTotalMarks)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Marks and total marks must be valid numbers",
      });
    }

    if (numericTotalMarks <= 0) {
      return res.status(400).json({
        success: false,
        message:
          "Total marks must be greater than 0",
      });
    }

    if (
      numericMarks < 0 ||
      numericMarks > numericTotalMarks
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Marks must be between 0 and total marks",
      });
    }

    const performance =
      await Performance.create({
        rollNumber: cleanRollNumber,
        studentName: cleanStudentName,
        subject: cleanSubject,
        examType: cleanExamType,
        marks: numericMarks,
        totalMarks: numericTotalMarks,
        grade: grade
          ? String(grade).trim()
          : "",
        remarks: remarks
          ? String(remarks).trim()
          : "",
        status:
          status === "Fail"
            ? "Fail"
            : "Pass",
      });

    res.status(201).json({
      success: true,
      message:
        "Performance added successfully",
      performance,
    });
  } catch (error) {
    console.error(
      "Add Performance Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to add performance record",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE PERFORMANCE
// PUT /api/performance/:id
// =====================================================

const updatePerformance = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid performance ID",
      });
    }

    const performance =
      await Performance.findById(id);

    if (!performance) {
      return res.status(404).json({
        success: false,
        message: "Performance record not found",
      });
    }

    const {
      rollNumber,
      studentName,
      subject,
      examType,
      marks,
      totalMarks,
      grade,
      remarks,
      status,
    } = req.body;

    if (
      rollNumber !== undefined &&
      String(rollNumber).trim() !== ""
    ) {
      performance.rollNumber =
        String(rollNumber).trim();
    }

    if (
      studentName !== undefined &&
      String(studentName).trim() !== ""
    ) {
      performance.studentName =
        String(studentName).trim();
    }

    if (
      subject !== undefined &&
      String(subject).trim() !== ""
    ) {
      performance.subject =
        String(subject).trim();
    }

    if (
      examType !== undefined &&
      String(examType).trim() !== ""
    ) {
      performance.examType =
        String(examType).trim();
    }

    if (marks !== undefined) {
      const numericMarks =
        Number(marks);

      if (Number.isNaN(numericMarks)) {
        return res.status(400).json({
          success: false,
          message:
            "Marks must be a valid number",
        });
      }

      performance.marks =
        numericMarks;
    }

    if (totalMarks !== undefined) {
      const numericTotalMarks =
        Number(totalMarks);

      if (
        Number.isNaN(numericTotalMarks) ||
        numericTotalMarks <= 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Total marks must be greater than 0",
        });
      }

      performance.totalMarks =
        numericTotalMarks;
    }

    if (
      performance.marks < 0 ||
      performance.marks >
        performance.totalMarks
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Marks must be between 0 and total marks",
      });
    }

    if (grade !== undefined) {
      performance.grade =
        String(grade).trim();
    }

    if (remarks !== undefined) {
      performance.remarks =
        String(remarks).trim();
    }

    if (status !== undefined) {
      performance.status =
        status === "Fail"
          ? "Fail"
          : "Pass";
    }

    await performance.save();

    res.status(200).json({
      success: true,
      message:
        "Performance updated successfully",
      performance,
    });
  } catch (error) {
    console.error(
      "Update Performance Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to update performance record",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE PERFORMANCE
// DELETE /api/performance/:id
// =====================================================

const deletePerformance = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid performance ID",
      });
    }

    const performance =
      await Performance.findById(id);

    if (!performance) {
      return res.status(404).json({
        success: false,
        message: "Performance record not found",
      });
    }

    await Performance.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message:
        "Performance deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete Performance Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to delete performance record",
      error: error.message,
    });
  }
};

// =====================================================
// EXPORT
// =====================================================

module.exports = {
  getPerformances,
  getPerformanceById,
  addPerformance,
  updatePerformance,
  deletePerformance,
};