const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// =====================================================
// MIDDLEWARE
// =====================================================

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =====================================================
// ROOT ROUTE
// =====================================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "School ERP Backend Running Successfully",
  });
});

// =====================================================
// STUDENT ROUTES
// =====================================================

const studentRoutes = require("./routes/studentRoutes");

app.use("/api/students", studentRoutes);

// =====================================================
// TEACHER ROUTES
// =====================================================

const teacherRoutes = require("./routes/teacherRoutes");

app.use("/api/teachers", teacherRoutes);

// =====================================================
// PARENT ROUTES
// =====================================================

const parentRoutes = require("./routes/parentRoutes");

app.use("/api/parents", parentRoutes);

// =====================================================
// ATTENDANCE ROUTES
// =====================================================

const attendanceRoutes = require("./routes/attendanceRoutes");

app.use("/api/attendance", attendanceRoutes);

// =====================================================
// PERFORMANCE ROUTES
// =====================================================

const performanceRoutes = require("./routes/performanceRoutes");

app.use("/api/performance", performanceRoutes);

// =====================================================
// FEES ROUTES
// =====================================================

const feeRoutes = require("./routes/feeRoutes");

app.use("/api/fees", feeRoutes);

// =====================================================
// EXAMINATION ROUTES
// =====================================================

const examinationRoutes = require("./routes/examinationRoutes");

app.use("/api/examinations", examinationRoutes);

// =====================================================
// COURSE ROUTES
// =====================================================

const courseRoutes = require("./routes/courseRoutes");

app.use("/api/courses", courseRoutes);

// =====================================================
// ACTIVITY ROUTES
// =====================================================

const activityRoutes = require("./routes/activityRoutes");

app.use("/api/activities", activityRoutes);

// =====================================================
// ADMIN ROUTES
// =====================================================

const adminRoutes = require("./routes/adminRoutes");

app.use("/api/admin", adminRoutes);

// =====================================================
// MODELS
// =====================================================

const Student = require("./models/Student");
const Teacher = require("./models/Teacher");
const Parent = require("./models/Parent");
const Attendance = require("./models/Attendance");
const Performance = require("./models/Performance");
const Fee = require("./models/Fee");
const Examination = require("./models/Examination");
const Course = require("./models/Course");
const Activity = require("./models/Activity");

// =====================================================
// DASHBOARD API
// =====================================================

app.get("/api/dashboard", async (req, res) => {
  try {
    const [
      studentCount,
      teacherCount,
      parentCount,
      attendanceCount,
      performanceCount,
      feeCount,
      examinationCount,
      courseCount,
      activityCount,
    ] = await Promise.all([
      Student.countDocuments(),
      Teacher.countDocuments(),
      Parent.countDocuments(),
      Attendance.countDocuments(),
      Performance.countDocuments(),
      Fee.countDocuments(),
      Examination.countDocuments(),
      Course.countDocuments(),
      Activity.countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      students: studentCount,
      teachers: teacherCount,
      parents: parentCount,
      attendance: attendanceCount,
      performance: performanceCount,
      fees: feeCount,
      examinations: examinationCount,
      courses: courseCount,
      activities: activityCount,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard",
      error: error.message,
    });
  }
});

// =====================================================
// 404 ROUTE
// =====================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// =====================================================
// GLOBAL ERROR HANDLER
// =====================================================

app.use((error, req, res, next) => {
  console.error("Server Error:", error);

  res.status(error.status || 500).json({
    success: false,
    message:
      error.message ||
      "Internal server error",
    error: error.message,
  });
});

// =====================================================
// EXPORT APP
// =====================================================

module.exports = app;