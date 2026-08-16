const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema(
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

    feeType: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    paidAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    dueDate: {
      type: Date,
    },

    paymentDate: {
      type: Date,
    },

    paymentMethod: {
      type: String,
      default: "Cash",
      trim: true,
    },

    status: {
      type: String,
      enum: ["Paid", "Pending", "Partial", "Overdue"],
      default: "Pending",
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

module.exports = mongoose.model("Fee", feeSchema);