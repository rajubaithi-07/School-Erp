// ============================================================
// SCHOOL ERP - EXPRESS APP
// server/app.js
// ============================================================

const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// ------------------------------------------------------------
// EXPRESS APP
// ------------------------------------------------------------

const app = express();

// ------------------------------------------------------------
// CORS CONFIGURATION
// ------------------------------------------------------------

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",

  // Vercel Frontend
  "https://school-erp-theta-mocha.vercel.app",
];

// CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without an Origin header
      // (Postman, server-to-server, direct browser requests)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("Blocked CORS origin:", origin);

      return callback(null, false);
    },

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

// ------------------------------------------------------------
// HANDLE PREFLIGHT REQUESTS
// ------------------------------------------------------------

app.options("*", cors());

// ------------------------------------------------------------
// BODY PARSERS
// ------------------------------------------------------------

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ------------------------------------------------------------
// STATIC UPLOADS
// ------------------------------------------------------------

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// ------------------------------------------------------------
// REQUEST LOGGER
// ------------------------------------------------------------

app.use((req, res, next) => {
  console.log(
    `${new Date().toISOString()} ${req.method} ${req.originalUrl}`
  );

  next();
});

// ============================================================
// ROUTES
// ============================================================

const adminRoutes = require("./routes/adminRoutes");
const studentRoutes = require("./routes/studentRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const parentRoutes = require("./routes/parentRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const courseRoutes = require("./routes/courseRoutes");
const examinationRoutes = require("./routes/examinationRoutes");
const feeRoutes = require("./routes/feeRoutes");
const performanceRoutes = require("./routes/performanceRoutes");
const activityRoutes = require("./routes/activityRoutes");

// ------------------------------------------------------------
// API ROUTES
// ------------------------------------------------------------

app.use("/api/admin", adminRoutes);

app.use("/api/students", studentRoutes);

app.use("/api/teachers", teacherRoutes);

app.use("/api/parents", parentRoutes);

app.use("/api/attendance", attendanceRoutes);

app.use("/api/courses", courseRoutes);

app.use("/api/examinations", examinationRoutes);

app.use("/api/fees", feeRoutes);

app.use("/api/performance", performanceRoutes);

app.use("/api/activity", activityRoutes);

// ============================================================
// HEALTH CHECK
// ============================================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "School ERP Backend Running Successfully",
  });
});

// ------------------------------------------------------------
// API HEALTH CHECK
// ------------------------------------------------------------

app.get("/api", (req, res) => {
  res.status(200).json({
    success: true,
    message: "School ERP API Running Successfully",
  });
});

// ============================================================
// 404 HANDLER
// ============================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ============================================================
// ERROR HANDLER
// ============================================================

app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ============================================================
// EXPORT APP
// ============================================================

// IMPORTANT:
// Do NOT call app.listen() here.
// Vercel needs the Express app exported.

module.exports = app;