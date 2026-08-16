const Examination = require("../models/Examination");

// =====================================================
// GET ALL EXAMINATION RECORDS
// =====================================================

const getExaminations = async (req, res) => {
  try {
    const examinations = await Examination.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: examinations.length,
      examinations,
    });
  } catch (error) {
    console.error(
      "Get Examinations Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to load examination records",
      error: error.message,
    });
  }
};

// =====================================================
// GET SINGLE EXAMINATION
// =====================================================

const getExaminationById = async (req, res) => {
  try {
    const examination =
      await Examination.findById(req.params.id);

    if (!examination) {
      return res.status(404).json({
        success: false,
        message: "Examination record not found",
      });
    }

    res.status(200).json({
      success: true,
      examination,
    });
  } catch (error) {
    console.error(
      "Get Examination Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to load examination record",
      error: error.message,
    });
  }
};

// =====================================================
// CREATE EXAMINATION
// =====================================================

const createExamination = async (req, res) => {
  try {
    const {
      studentName,
      rollNumber,
      examName,
      subject,
      examDate,
      totalMarks,
      obtainedMarks,
      grade,
      status,
      remarks,
    } = req.body;

    if (!studentName || !rollNumber) {
      return res.status(400).json({
        success: false,
        message:
          "Student name and roll number are required",
      });
    }

    if (!examName || !subject) {
      return res.status(400).json({
        success: false,
        message:
          "Exam name and subject are required",
      });
    }

    if (
      totalMarks === undefined ||
      totalMarks === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Total marks are required",
      });
    }

    if (
      obtainedMarks === undefined ||
      obtainedMarks === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Obtained marks are required",
      });
    }

    if (
      Number(obtainedMarks) >
      Number(totalMarks)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Obtained marks cannot be greater than total marks",
      });
    }

    const examination =
      await Examination.create({
        studentName: studentName.trim(),
        rollNumber: rollNumber.trim(),
        examName: examName.trim(),
        subject: subject.trim(),
        examDate: examDate || null,
        totalMarks: Number(totalMarks),
        obtainedMarks: Number(obtainedMarks),
        grade: grade || "",
        status: status || "Pass",
        remarks: remarks || "",
      });

    res.status(201).json({
      success: true,
      message:
        "Examination record created successfully",
      examination,
    });
  } catch (error) {
    console.error(
      "Create Examination Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to create examination record",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE EXAMINATION
// =====================================================

const updateExamination = async (req, res) => {
  try {
    const {
      studentName,
      rollNumber,
      examName,
      subject,
      examDate,
      totalMarks,
      obtainedMarks,
      grade,
      status,
      remarks,
    } = req.body;

    if (
      totalMarks !== undefined &&
      obtainedMarks !== undefined &&
      Number(obtainedMarks) >
        Number(totalMarks)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Obtained marks cannot be greater than total marks",
      });
    }

    const examination =
      await Examination.findByIdAndUpdate(
        req.params.id,
        {
          studentName:
            studentName !== undefined
              ? studentName.trim()
              : undefined,

          rollNumber:
            rollNumber !== undefined
              ? rollNumber.trim()
              : undefined,

          examName:
            examName !== undefined
              ? examName.trim()
              : undefined,

          subject:
            subject !== undefined
              ? subject.trim()
              : undefined,

          examDate:
            examDate !== undefined
              ? examDate || null
              : undefined,

          totalMarks:
            totalMarks !== undefined
              ? Number(totalMarks)
              : undefined,

          obtainedMarks:
            obtainedMarks !== undefined
              ? Number(obtainedMarks)
              : undefined,

          grade:
            grade !== undefined
              ? grade
              : undefined,

          status:
            status !== undefined
              ? status
              : undefined,

          remarks:
            remarks !== undefined
              ? remarks
              : undefined,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!examination) {
      return res.status(404).json({
        success: false,
        message: "Examination record not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Examination record updated successfully",
      examination,
    });
  } catch (error) {
    console.error(
      "Update Examination Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to update examination record",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE EXAMINATION
// =====================================================

const deleteExamination = async (req, res) => {
  try {
    const examination =
      await Examination.findByIdAndDelete(
        req.params.id
      );

    if (!examination) {
      return res.status(404).json({
        success: false,
        message: "Examination record not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Examination record deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete Examination Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to delete examination record",
      error: error.message,
    });
  }
};

// =====================================================
// EXPORT
// =====================================================

module.exports = {
  getExaminations,
  getExaminationById,
  createExamination,
  updateExamination,
  deleteExamination,
};