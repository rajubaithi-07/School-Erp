const mongoose = require("mongoose");

const examinationSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
      trim: true,
    },

    rollNumber: {
      type: String,
      required: true,
      trim: true,
    },

    examName: {
      type: String,
      required: true,
      trim: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    examDate: {
      type: Date,
    },

    totalMarks: {
      type: Number,
      required: true,
      min: 0,
    },

    obtainedMarks: {
      type: Number,
      required: true,
      min: 0,
    },

    grade: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
      type: String,
      enum: ["Pass", "Fail", "Absent"],
      default: "Pass",
    },

    remarks: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Automatically calculate percentage and grade
examinationSchema.virtual("percentage").get(function () {
  if (!this.totalMarks) {
    return 0;
  }

  return (
    (this.obtainedMarks / this.totalMarks) *
    100
  ).toFixed(2);
});

examinationSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model(
  "Examination",
  examinationSchema
);