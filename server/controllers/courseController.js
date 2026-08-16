const Course = require("../models/Course");

// =====================================================
// GET ALL COURSES
// =====================================================

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: courses.length,
      courses,
    });
  } catch (error) {
    console.error("Get Courses Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
      error: error.message,
    });
  }
};

// =====================================================
// GET SINGLE COURSE
// =====================================================

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(
      req.params.id
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    console.error("Get Course Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch course",
      error: error.message,
    });
  }
};

// =====================================================
// CREATE COURSE
// =====================================================

const createCourse = async (req, res) => {
  try {
    const {
      courseName,
      courseCode,
      department,
      teacherName,
      duration,
      totalStudents,
      description,
      status,
    } = req.body;

    if (
      !courseName ||
      !courseCode ||
      !department ||
      !teacherName ||
      !duration
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Course name, course code, department, teacher name and duration are required",
      });
    }

    const existingCourse =
      await Course.findOne({
        courseCode: courseCode.trim(),
      });

    if (existingCourse) {
      return res.status(400).json({
        success: false,
        message:
          "Course code already exists",
      });
    }

    const course = await Course.create({
      courseName: courseName.trim(),
      courseCode: courseCode.trim(),
      department: department.trim(),
      teacherName: teacherName.trim(),
      duration: duration.trim(),
      totalStudents:
        Number(totalStudents || 0),
      description:
        description?.trim() || "",
      status: status || "Active",
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    console.error(
      "Create Course Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE COURSE
// =====================================================

const updateCourse = async (req, res) => {
  try {
    const course =
      await Course.findById(
        req.params.id
      );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const {
      courseName,
      courseCode,
      department,
      teacherName,
      duration,
      totalStudents,
      description,
      status,
    } = req.body;

    if (
      courseCode &&
      courseCode.trim() !==
        course.courseCode
    ) {
      const existingCourse =
        await Course.findOne({
          courseCode:
            courseCode.trim(),
          _id: {
            $ne: req.params.id,
          },
        });

      if (existingCourse) {
        return res.status(400).json({
          success: false,
          message:
            "Course code already exists",
        });
      }
    }

    course.courseName =
      courseName?.trim() ||
      course.courseName;

    course.courseCode =
      courseCode?.trim() ||
      course.courseCode;

    course.department =
      department?.trim() ||
      course.department;

    course.teacherName =
      teacherName?.trim() ||
      course.teacherName;

    course.duration =
      duration?.trim() ||
      course.duration;

    if (totalStudents !== undefined) {
      course.totalStudents =
        Number(totalStudents);
    }

    course.description =
      description?.trim() || "";

    course.status =
      status || course.status;

    await course.save();

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course,
    });
  } catch (error) {
    console.error(
      "Update Course Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to update course",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE COURSE
// =====================================================

const deleteCourse = async (req, res) => {
  try {
    const course =
      await Course.findByIdAndDelete(
        req.params.id
      );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete Course Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to delete course",
      error: error.message,
    });
  }
};

// =====================================================
// EXPORT CONTROLLERS
// =====================================================

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};