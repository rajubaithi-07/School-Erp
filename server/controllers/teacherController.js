const Teacher = require("../models/Teacher");


// =====================================================
// GET ALL TEACHERS
// GET /api/teachers
// =====================================================

const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      teachers,
    });

  } catch (error) {
    console.error(
      "Get Teachers Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch teachers",
      error: error.message,
    });
  }
};


// =====================================================
// GET SINGLE TEACHER
// GET /api/teachers/:id
// =====================================================

const getTeacherById = async (req, res) => {
  try {
    const teacher =
      await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    res.status(200).json({
      success: true,
      teacher,
    });

  } catch (error) {
    console.error(
      "Get Teacher Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch teacher",
      error: error.message,
    });
  }
};


// =====================================================
// ADD TEACHER
// POST /api/teachers
// =====================================================

const addTeacher = async (req, res) => {
  try {
    const {
      name,
      fullName,
      employeeId,
      empId,
      email,
      phone,
      mobile,
      department,
      subject,
      subjects,
      qualification,
      experience,
    } = req.body;


    const teacherName =
      name || fullName;


    if (!teacherName) {
      return res.status(400).json({
        success: false,
        message: "Teacher name is required",
      });
    }


    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }


    const existingTeacher =
      await Teacher.findOne({
        email: email.toLowerCase(),
      });


    if (existingTeacher) {
      return res.status(400).json({
        success: false,
        message:
          "A teacher with this email already exists",
      });
    }


    const teacher =
      await Teacher.create({
        name: teacherName,
        fullName: fullName || teacherName,

        employeeId:
          employeeId || empId || "",

        email:
          email.toLowerCase(),

        phone:
          phone || mobile || "",

        department:
          department || "",

        subject:
          subject || subjects || "",

        qualification:
          qualification || "",

        experience:
          experience || "",
      });


    res.status(201).json({
      success: true,
      message:
        "Teacher added successfully",
      teacher,
    });

  } catch (error) {
    console.error(
      "Add Teacher Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to add teacher",
      error: error.message,
    });
  }
};


// =====================================================
// UPDATE TEACHER
// PUT /api/teachers/:id
// =====================================================

const updateTeacher = async (req, res) => {
  try {
    const {
      name,
      fullName,
      employeeId,
      empId,
      email,
      phone,
      mobile,
      department,
      subject,
      subjects,
      qualification,
      experience,
    } = req.body;


    const teacher =
      await Teacher.findById(
        req.params.id
      );


    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }


    if (name || fullName) {
      teacher.name =
        name || fullName;

      teacher.fullName =
        fullName || name;
    }


    if (
      employeeId !== undefined ||
      empId !== undefined
    ) {
      teacher.employeeId =
        employeeId || empId;
    }


    if (email !== undefined) {
      teacher.email =
        email.toLowerCase();
    }


    if (
      phone !== undefined ||
      mobile !== undefined
    ) {
      teacher.phone =
        phone || mobile;
    }


    if (department !== undefined) {
      teacher.department =
        department;
    }


    if (
      subject !== undefined ||
      subjects !== undefined
    ) {
      teacher.subject =
        subject || subjects;
    }


    if (qualification !== undefined) {
      teacher.qualification =
        qualification;
    }


    if (experience !== undefined) {
      teacher.experience =
        experience;
    }


    const updatedTeacher =
      await teacher.save();


    res.status(200).json({
      success: true,
      message:
        "Teacher updated successfully",
      teacher: updatedTeacher,
    });

  } catch (error) {
    console.error(
      "Update Teacher Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to update teacher",
      error: error.message,
    });
  }
};


// =====================================================
// DELETE TEACHER
// DELETE /api/teachers/:id
// =====================================================

const deleteTeacher = async (req, res) => {
  try {
    const teacher =
      await Teacher.findByIdAndDelete(
        req.params.id
      );


    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }


    res.status(200).json({
      success: true,
      message:
        "Teacher deleted successfully",
    });

  } catch (error) {
    console.error(
      "Delete Teacher Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to delete teacher",
      error: error.message,
    });
  }
};


// =====================================================
// EXPORT
// =====================================================

module.exports = {
  getTeachers,
  getTeacherById,
  addTeacher,
  updateTeacher,
  deleteTeacher,
};