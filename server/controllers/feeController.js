const Fee = require("../models/Fee");
const mongoose = require("mongoose");

// =====================================================
// GET ALL FEES
// GET /api/fees
// =====================================================

const getFees = async (req, res) => {
  try {
    const fees = await Fee.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: fees.length,
      fees,
    });
  } catch (error) {
    console.error("Get Fees Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch fees",
      error: error.message,
    });
  }
};

// =====================================================
// GET SINGLE FEE
// GET /api/fees/:id
// =====================================================

const getFeeById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid fee ID",
      });
    }

    const fee = await Fee.findById(id);

    if (!fee) {
      return res.status(404).json({
        success: false,
        message: "Fee record not found",
      });
    }

    res.status(200).json({
      success: true,
      fee,
    });
  } catch (error) {
    console.error("Get Fee Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch fee",
      error: error.message,
    });
  }
};

// =====================================================
// ADD FEE
// POST /api/fees
// =====================================================

const addFee = async (req, res) => {
  try {
    const {
      studentName,
      rollNumber,
      feeType,
      amount,
      paidAmount,
      dueDate,
      paymentDate,
      paymentMethod,
      status,
      remarks,
    } = req.body;

    // Required fields
    if (
      !studentName ||
      !rollNumber ||
      !feeType ||
      amount === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Student name, roll number, fee type and amount are required",
      });
    }

    const cleanStudentName = studentName.trim();
    const cleanRollNumber = rollNumber.trim();
    const cleanFeeType = feeType.trim();

    const totalAmount = Number(amount);
    const totalPaidAmount =
      paidAmount === undefined ||
      paidAmount === ""
        ? 0
        : Number(paidAmount);

    if (
      Number.isNaN(totalAmount) ||
      totalAmount < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Amount must be a valid number",
      });
    }

    if (
      Number.isNaN(totalPaidAmount) ||
      totalPaidAmount < 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Paid amount must be a valid number",
      });
    }

    if (totalPaidAmount > totalAmount) {
      return res.status(400).json({
        success: false,
        message:
          "Paid amount cannot be greater than total amount",
      });
    }

    // Automatically calculate status
    let calculatedStatus = "Pending";

    if (totalPaidAmount === totalAmount) {
      calculatedStatus = "Paid";
    } else if (totalPaidAmount > 0) {
      calculatedStatus = "Partial";
    } else if (
      dueDate &&
      new Date(dueDate) < new Date()
    ) {
      calculatedStatus = "Overdue";
    }

    const fee = await Fee.create({
      studentName: cleanStudentName,
      rollNumber: cleanRollNumber,
      feeType: cleanFeeType,
      amount: totalAmount,
      paidAmount: totalPaidAmount,
      dueDate: dueDate || undefined,
      paymentDate: paymentDate || undefined,
      paymentMethod:
        paymentMethod?.trim() || "Cash",
      status: status || calculatedStatus,
      remarks: remarks?.trim() || "",
    });

    res.status(201).json({
      success: true,
      message: "Fee added successfully",
      fee,
    });
  } catch (error) {
    console.error("Add Fee Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add fee",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE FEE
// PUT /api/fees/:id
// =====================================================

const updateFee = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid fee ID",
      });
    }

    const fee = await Fee.findById(id);

    if (!fee) {
      return res.status(404).json({
        success: false,
        message: "Fee record not found",
      });
    }

    const {
      studentName,
      rollNumber,
      feeType,
      amount,
      paidAmount,
      dueDate,
      paymentDate,
      paymentMethod,
      status,
      remarks,
    } = req.body;

    if (
      studentName !== undefined &&
      studentName.trim() !== ""
    ) {
      fee.studentName = studentName.trim();
    }

    if (
      rollNumber !== undefined &&
      rollNumber.trim() !== ""
    ) {
      fee.rollNumber = rollNumber.trim();
    }

    if (
      feeType !== undefined &&
      feeType.trim() !== ""
    ) {
      fee.feeType = feeType.trim();
    }

    if (amount !== undefined && amount !== "") {
      const newAmount = Number(amount);

      if (
        Number.isNaN(newAmount) ||
        newAmount < 0
      ) {
        return res.status(400).json({
          success: false,
          message: "Amount must be a valid number",
        });
      }

      fee.amount = newAmount;
    }

    if (
      paidAmount !== undefined &&
      paidAmount !== ""
    ) {
      const newPaidAmount = Number(paidAmount);

      if (
        Number.isNaN(newPaidAmount) ||
        newPaidAmount < 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Paid amount must be a valid number",
        });
      }

      fee.paidAmount = newPaidAmount;
    }

    if (
      fee.paidAmount >
      fee.amount
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Paid amount cannot be greater than total amount",
      });
    }

    if (dueDate !== undefined) {
      fee.dueDate =
        dueDate === ""
          ? undefined
          : dueDate;
    }

    if (paymentDate !== undefined) {
      fee.paymentDate =
        paymentDate === ""
          ? undefined
          : paymentDate;
    }

    if (paymentMethod !== undefined) {
      fee.paymentMethod =
        paymentMethod.trim() || "Cash";
    }

    if (remarks !== undefined) {
      fee.remarks = remarks.trim();
    }

    // Automatically update status
    if (status !== undefined && status !== "") {
      fee.status = status;
    } else {
      if (fee.paidAmount === fee.amount) {
        fee.status = "Paid";
      } else if (fee.paidAmount > 0) {
        fee.status = "Partial";
      } else if (
        fee.dueDate &&
        new Date(fee.dueDate) < new Date()
      ) {
        fee.status = "Overdue";
      } else {
        fee.status = "Pending";
      }
    }

    await fee.save();

    res.status(200).json({
      success: true,
      message: "Fee updated successfully",
      fee,
    });
  } catch (error) {
    console.error("Update Fee Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update fee",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE FEE
// DELETE /api/fees/:id
// =====================================================

const deleteFee = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid fee ID",
      });
    }

    const fee = await Fee.findById(id);

    if (!fee) {
      return res.status(404).json({
        success: false,
        message: "Fee record not found",
      });
    }

    await Fee.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Fee deleted successfully",
    });
  } catch (error) {
    console.error("Delete Fee Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete fee",
      error: error.message,
    });
  }
};

// =====================================================
// EXPORT
// =====================================================

module.exports = {
  getFees,
  getFeeById,
  addFee,
  updateFee,
  deleteFee,
};