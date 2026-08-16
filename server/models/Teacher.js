const mongoose = require("mongoose");


// =====================================================
// TEACHER SCHEMA
// =====================================================

const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    fullName: {
      type: String,
      trim: true,
    },

    employeeId: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    department: {
      type: String,
      trim: true,
    },

    subject: {
      type: String,
      trim: true,
    },

    qualification: {
      type: String,
      trim: true,
    },

    experience: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);


// =====================================================
// EXPORT MODEL
// =====================================================

module.exports = mongoose.model(
  "Teacher",
  teacherSchema
);