const Student = require("../models/Student");
const mongoose = require("mongoose");

// =====================================================
// GET ALL STUDENTS
// GET /api/students
// =====================================================

const getStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: students.length,
      students,
    });
  } catch (error) {
    console.error("Get Students Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch students",
      error: error.message,
    });
  }
};

// =====================================================
// GET SINGLE STUDENT
// GET /api/students/:id
// =====================================================

const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID",
      });
    }

    const student = await Student.findById(id)
      .select("-password");

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    console.error("Get Student Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch student",
      error: error.message,
    });
  }
};

// =====================================================
// ADD STUDENT
// POST /api/students
// =====================================================

const addStudent = async (req, res) => {
  try {
    const {
      name,
      rollNumber,
      phoneNumber,
      password,
      classNumber,
      section,
    } = req.body;

    // =================================================
    // REQUIRED FIELDS
    // =================================================

    if (
      !name ||
      !rollNumber ||
      !phoneNumber ||
      !password ||
      classNumber === undefined ||
      !section
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, roll number, phone number, password, class and section are required",
      });
    }

    const cleanName = name.trim();

    const cleanRollNumber =
      rollNumber.trim();

    const cleanPhoneNumber =
      phoneNumber.trim();

    const cleanClass =
      Number(classNumber);

    const cleanSection =
      section.trim().toUpperCase();

    // =================================================
    // PHONE VALIDATION
    // =================================================

    if (!/^[0-9]{10}$/.test(cleanPhoneNumber)) {
      return res.status(400).json({
        success: false,
        message:
          "Phone number must contain exactly 10 digits",
      });
    }

    // =================================================
    // CLASS VALIDATION
    // =================================================

    if (
      !Number.isInteger(cleanClass) ||
      cleanClass < 1 ||
      cleanClass > 10
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Class must be between 1 and 10",
      });
    }

    // =================================================
    // SECTION VALIDATION
    // =================================================

    if (!["A", "B", "C"].includes(cleanSection)) {
      return res.status(400).json({
        success: false,
        message:
          "Section must be A, B or C",
      });
    }

    // =================================================
    // DUPLICATE CHECK
    // =================================================

    const existingStudent =
      await Student.findOne({
        $or: [
          {
            rollNumber: cleanRollNumber,
          },
          {
            phoneNumber: cleanPhoneNumber,
          },
        ],
      });

    if (existingStudent) {
      if (
        existingStudent.rollNumber ===
        cleanRollNumber
      ) {
        return res.status(409).json({
          success: false,
          message:
            "A student with this roll number already exists",
        });
      }

      if (
        existingStudent.phoneNumber ===
        cleanPhoneNumber
      ) {
        return res.status(409).json({
          success: false,
          message:
            "A student with this phone number already exists",
        });
      }
    }

    // =================================================
    // CREATE STUDENT
    // =================================================

    const student =
      await Student.create({
        name: cleanName,
        rollNumber: cleanRollNumber,
        phoneNumber: cleanPhoneNumber,
        password,
        classNumber: cleanClass,
        section: cleanSection,
      });

    const studentResponse =
      student.toObject();

    delete studentResponse.password;

    res.status(201).json({
      success: true,
      message:
        "Student added successfully",
      student: studentResponse,
    });
  } catch (error) {
    console.error(
      "Add Student Error:",
      error
    );

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "A student with this roll number or phone number already exists",
      });
    }

    res.status(500).json({
      success: false,
      message:
        "Failed to add student",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE STUDENT
// PUT /api/students/:id
// =====================================================

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID",
      });
    }

    const student =
      await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const {
      name,
      rollNumber,
      phoneNumber,
      password,
      classNumber,
      section,
    } = req.body;

    // =================================================
    // DUPLICATE CHECK
    // =================================================

    const duplicateConditions = [];

    if (
      rollNumber !== undefined &&
      rollNumber.trim() !== ""
    ) {
      duplicateConditions.push({
        rollNumber:
          rollNumber.trim(),
      });
    }

    if (
      phoneNumber !== undefined &&
      phoneNumber.trim() !== ""
    ) {
      duplicateConditions.push({
        phoneNumber:
          phoneNumber.trim(),
      });
    }

    if (duplicateConditions.length > 0) {
      const duplicateStudent =
        await Student.findOne({
          $or: duplicateConditions,
          _id: { $ne: id },
        });

      if (duplicateStudent) {
        return res.status(409).json({
          success: false,
          message:
            "Another student already has this roll number or phone number",
        });
      }
    }

    // =================================================
    // NAME
    // =================================================

    if (
      name !== undefined &&
      name.trim() !== ""
    ) {
      student.name =
        name.trim();
    }

    // =================================================
    // ROLL NUMBER
    // =================================================

    if (
      rollNumber !== undefined &&
      rollNumber.trim() !== ""
    ) {
      student.rollNumber =
        rollNumber.trim();
    }

    // =================================================
    // PHONE NUMBER
    // =================================================

    if (
      phoneNumber !== undefined &&
      phoneNumber.trim() !== ""
    ) {
      const cleanPhone =
        phoneNumber.trim();

      if (!/^[0-9]{10}$/.test(cleanPhone)) {
        return res.status(400).json({
          success: false,
          message:
            "Phone number must contain exactly 10 digits",
        });
      }

      student.phoneNumber =
        cleanPhone;
    }

    // =================================================
    // PASSWORD
    // =================================================

    if (
      password !== undefined &&
      password.trim() !== ""
    ) {
      student.password =
        password.trim();
    }

    // =================================================
    // CLASS
    // =================================================

    if (
      classNumber !== undefined &&
      classNumber !== ""
    ) {
      const newClass =
        Number(classNumber);

      if (
        !Number.isInteger(newClass) ||
        newClass < 1 ||
        newClass > 10
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Class must be between 1 and 10",
        });
      }

      student.classNumber =
        newClass;
    }

    // =================================================
    // SECTION
    // =================================================

    if (
      section !== undefined &&
      section !== ""
    ) {
      const newSection =
        section
          .trim()
          .toUpperCase();

      if (
        !["A", "B", "C"].includes(
          newSection
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Section must be A, B or C",
        });
      }

      student.section =
        newSection;
    }

    await student.save();

    const studentResponse =
      student.toObject();

    delete studentResponse.password;

    res.status(200).json({
      success: true,
      message:
        "Student updated successfully",
      student: studentResponse,
    });
  } catch (error) {
    console.error(
      "Update Student Error:",
      error
    );

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "A student with this roll number or phone number already exists",
      });
    }

    res.status(500).json({
      success: false,
      message:
        "Failed to update student",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE STUDENT
// DELETE /api/students/:id
// =====================================================

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID",
      });
    }

    const student =
      await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message:
          "Student not found",
      });
    }

    await Student.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message:
        "Student deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete Student Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to delete student",
      error: error.message,
    });
  }
};

// =====================================================
// STUDENT LOGIN
// POST /api/students/login
// =====================================================

const studentLogin = async (req, res) => {
  try {
    const {
      rollNumber,
      password,
    } = req.body;

    if (!rollNumber || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Roll number and password are required",
      });
    }

    const student =
      await Student.findOne({
        rollNumber:
          rollNumber.trim(),
      });

    if (!student) {
      return res.status(404).json({
        success: false,
        message:
          "Student not found",
      });
    }

    if (
      student.password !==
      password
    ) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid password",
      });
    }

    const studentResponse =
      student.toObject();

    delete studentResponse.password;

    res.status(200).json({
      success: true,
      message:
        "Login successful",
      student:
        studentResponse,
    });
  } catch (error) {
    console.error(
      "Student Login Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Login failed",
      error: error.message,
    });
  }
};

// =====================================================
// EXPORT
// =====================================================

module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent,
  studentLogin,
};