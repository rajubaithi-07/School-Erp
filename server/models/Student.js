const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    // =====================================================
    // STUDENT NAME
    // =====================================================
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // =====================================================
    // ROLL NUMBER
    // =====================================================
    rollNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    // =====================================================
    // PHONE NUMBER
    // =====================================================
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    // =====================================================
    // PASSWORD
    // =====================================================
    password: {
      type: String,
      required: true,
    },

    // =====================================================
    // CLASS / GRADE
    // 1 TO 10
    // =====================================================
    classNumber: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },

    // =====================================================
    // SECTION
    // A / B / C
    // =====================================================
    section: {
      type: String,
      required: true,
      enum: ["A", "B", "C"],
      uppercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Student",
  studentSchema
);