import { useEffect, useMemo, useState } from "react";
import "../../styles/fees.css";

const API_URL = "http://localhost:5000/api/fees";

const emptyForm = {
  studentName: "",
  rollNumber: "",
  feeType: "",
  amount: "",
  paidAmount: "",
  dueDate: "",
  paymentDate: "",
  paymentMethod: "Cash",
  status: "Pending",
  remarks: "",
};

function Fees() {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    ...emptyForm,
  });

  // =====================================================
  // LOAD FEES
  // =====================================================

  const loadFees = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Unable to load fees");
      }

      const result = await response.json();

      const feeList =
        result.fees ||
        result.data ||
        [];

      setFees(
        Array.isArray(feeList)
          ? feeList
          : []
      );
    } catch (err) {
      console.error(
        "Fee API Error:",
        err
      );

      setError(
        "Unable to load fees. Please check that the server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFees();
  }, []);

  // =====================================================
  // SEARCH
  // =====================================================

  const filteredFees = useMemo(() => {
    const value = search
      .toLowerCase()
      .trim();

    if (!value) {
      return fees;
    }

    return fees.filter((fee) => {
      return (
        String(fee.studentName || "")
          .toLowerCase()
          .includes(value) ||

        String(fee.rollNumber || "")
          .toLowerCase()
          .includes(value) ||

        String(fee.feeType || "")
          .toLowerCase()
          .includes(value) ||

        String(fee.status || "")
          .toLowerCase()
          .includes(value) ||

        String(fee.paymentMethod || "")
          .toLowerCase()
          .includes(value)
      );
    });
  }, [fees, search]);

  // =====================================================
  // STATISTICS
  // =====================================================

  const totalAmount = fees.reduce(
    (total, fee) =>
      total + Number(fee.amount || 0),
    0
  );

  const paidAmount = fees.reduce(
    (total, fee) =>
      total + Number(fee.paidAmount || 0),
    0
  );

  const pendingAmount = Math.max(
    totalAmount - paidAmount,
    0
  );

  const paidCount = fees.filter(
    (fee) => fee.status === "Paid"
  ).length;

  const pendingCount = fees.filter(
    (fee) =>
      fee.status === "Pending" ||
      fee.status === "Partial" ||
      fee.status === "Overdue"
  ).length;

  // =====================================================
  // FORMAT CURRENCY
  // =====================================================

  const formatAmount = (amount) => {
    return `₹${Number(
      amount || 0
    ).toLocaleString("en-IN")}`;
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    const parsedDate = new Date(date);

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return "-";
    }

    return parsedDate.toLocaleDateString(
      "en-IN"
    );
  };

  // =====================================================
  // FORM BALANCE
  // =====================================================

  const formBalance = Math.max(
    Number(form.amount || 0) -
      Number(form.paidAmount || 0),
    0
  );

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================================
  // OPEN ADD MODAL
  // =====================================================

  const openAddModal = () => {
    setEditingId(null);

    setForm({
      ...emptyForm,
    });

    setShowModal(true);
  };

  // =====================================================
  // OPEN EDIT MODAL
  // =====================================================

  const openEditModal = (fee) => {
    setEditingId(
      fee._id || fee.id
    );

    setForm({
      studentName:
        fee.studentName || "",

      rollNumber:
        fee.rollNumber || "",

      feeType:
        fee.feeType || "",

      amount:
        fee.amount ?? "",

      paidAmount:
        fee.paidAmount ?? "",

      dueDate: fee.dueDate
        ? String(
            fee.dueDate
          ).substring(0, 10)
        : "",

      paymentDate:
        fee.paymentDate
          ? String(
              fee.paymentDate
            ).substring(0, 10)
          : "",

      paymentMethod:
        fee.paymentMethod ||
        "Cash",

      status:
        fee.status ||
        "Pending",

      remarks:
        fee.remarks || "",
    });

    setShowModal(true);
  };

  // =====================================================
  // CLOSE MODAL
  // =====================================================

  const closeModal = () => {
    if (saving) {
      return;
    }

    setShowModal(false);
    setEditingId(null);

    setForm({
      ...emptyForm,
    });
  };

  // =====================================================
  // SAVE FEE
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.studentName.trim()) {
      alert(
        "Please enter student name."
      );
      return;
    }

    if (!form.rollNumber.trim()) {
      alert(
        "Please enter roll number."
      );
      return;
    }

    if (!form.feeType.trim()) {
      alert(
        "Please select fee type."
      );
      return;
    }

    if (
      form.amount === "" ||
      Number(form.amount) < 0
    ) {
      alert(
        "Please enter a valid amount."
      );
      return;
    }

    if (
      form.paidAmount !== "" &&
      Number(form.paidAmount) < 0
    ) {
      alert(
        "Please enter a valid paid amount."
      );
      return;
    }

    if (
      Number(form.paidAmount || 0) >
      Number(form.amount)
    ) {
      alert(
        "Paid amount cannot be greater than total amount."
      );
      return;
    }

    try {
      setSaving(true);

      const method = editingId
        ? "PUT"
        : "POST";

      const url = editingId
        ? `${API_URL}/${editingId}`
        : API_URL;

      const response = await fetch(
        url,
        {
          method,
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            studentName:
              form.studentName.trim(),

            rollNumber:
              form.rollNumber.trim(),

            feeType:
              form.feeType.trim(),

            amount:
              Number(form.amount),

            paidAmount:
              Number(
                form.paidAmount || 0
              ),

            dueDate:
              form.dueDate || null,

            paymentDate:
              form.paymentDate || null,

            paymentMethod:
              form.paymentMethod,

            status:
              form.status,

            remarks:
              form.remarks.trim(),
          }),
        }
      );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Unable to save fee"
        );
      }

      alert(
        editingId
          ? "Fee updated successfully!"
          : "Fee added successfully!"
      );

      setShowModal(false);
      setEditingId(null);

      setForm({
        ...emptyForm,
      });

      await loadFees();
    } catch (err) {
      console.error(
        "Save Fee Error:",
        err
      );

      alert(
        err.message ||
          "Something went wrong while saving fee."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // DELETE FEE
  // =====================================================

  const handleDelete = async (fee) => {
    const id =
      fee._id || fee.id;

    if (!id) {
      alert(
        "Fee ID not found."
      );
      return;
    }

    const confirmed =
      window.confirm(
        `Are you sure you want to delete the fee record for ${fee.studentName}?`
      );

    if (!confirmed) {
      return;
    }

    try {
      const response =
        await fetch(
          `${API_URL}/${id}`,
          {
            method: "DELETE",
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Unable to delete fee"
        );
      }

      alert(
        "Fee deleted successfully."
      );

      await loadFees();
    } catch (err) {
      console.error(
        "Delete Fee Error:",
        err
      );

      alert(
        err.message ||
          "Unable to delete fee."
      );
    }
  };

  // =====================================================
  // VIEW FEE
  // =====================================================

  const handleView = (fee) => {
    const balance = Math.max(
      Number(fee.amount || 0) -
        Number(
          fee.paidAmount || 0
        ),
      0
    );

    alert(
      `Fee Details\n\n` +
        `Student: ${
          fee.studentName || "-"
        }\n` +
        `Roll Number: ${
          fee.rollNumber || "-"
        }\n` +
        `Fee Type: ${
          fee.feeType || "-"
        }\n` +
        `Total Amount: ${
          formatAmount(
            fee.amount
          )
        }\n` +
        `Paid Amount: ${
          formatAmount(
            fee.paidAmount
          )
        }\n` +
        `Balance: ${
          formatAmount(
            balance
          )
        }\n` +
        `Due Date: ${
          formatDate(
            fee.dueDate
          )
        }\n` +
        `Payment Date: ${
          formatDate(
            fee.paymentDate
          )
        }\n` +
        `Payment Method: ${
          fee.paymentMethod || "-"
        }\n` +
        `Status: ${
          fee.status || "-"
        }\n` +
        `Remarks: ${
          fee.remarks || "-"
        }`
    );
  };

  // =====================================================
  // STATUS CLASS
  // =====================================================

  const getStatusClass = (
    status
  ) => {
    switch (status) {
      case "Paid":
        return "paid";

      case "Partial":
        return "partial";

      case "Overdue":
        return "overdue";

      default:
        return "pending";
    }
  };

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <div className="fees-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="fees-header">

        <div>

          <div className="fees-label">
            FEE MANAGEMENT
          </div>

          <h1>
            Fees
          </h1>

          <p>
            Manage student fee payments,
            dues and financial records.
          </p>

        </div>

        <button
          className="add-fee-btn"
          onClick={openAddModal}
        >
          <span>+</span>
          Add Fee
        </button>

      </div>

      {/* =================================================
          STATISTICS
      ================================================= */}

      <div className="fee-stat-grid">

        {/* TOTAL */}

        <div className="fee-stat-card">

          <div className="fee-stat-icon">
            💰
          </div>

          <div className="fee-stat-info">

            <span>
              Total Fees
            </span>

            <strong>
              {formatAmount(
                totalAmount
              )}
            </strong>

          </div>

        </div>

        {/* PAID */}

        <div className="fee-stat-card">

          <div className="fee-stat-icon">
            ✅
          </div>

          <div className="fee-stat-info">

            <span>
              Paid
            </span>

            <strong>
              {formatAmount(
                paidAmount
              )}
            </strong>

            <small>
              {paidCount} records
            </small>

          </div>

        </div>

        {/* PENDING */}

        <div className="fee-stat-card">

          <div className="fee-stat-icon">
            ⏳
          </div>

          <div className="fee-stat-info">

            <span>
              Pending
            </span>

            <strong>
              {formatAmount(
                pendingAmount
              )}
            </strong>

            <small>
              {pendingCount} records
            </small>

          </div>

        </div>

      </div>

      {/* =================================================
          FEE RECORDS
      ================================================= */}

      <div className="fee-records">

        <div className="records-header">

          <div>

            <h2>
              Fee Records
            </h2>

            <p>
              View and manage registered
              student fee records.
            </p>

          </div>

          <div className="fee-search">

            <span>
              🔍
            </span>

            <input
              type="text"
              placeholder="Search fees..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

          </div>

        </div>

        {/* =================================================
            LOADING
        ================================================= */}

        {loading && (

          <div className="fee-state">

            <div className="loading-spinner"></div>

            <h3>
              Loading Fees...
            </h3>

            <p>
              Please wait while we fetch
              fee records.
            </p>

          </div>

        )}

        {/* =================================================
            ERROR
        ================================================= */}

        {!loading &&
          error && (

            <div className="fee-state error-state">

              <div className="state-icon">
                ⚠️
              </div>

              <h3>
                Unable to Load Fees
              </h3>

              <p>
                {error}
              </p>

              <button
                className="retry-btn"
                onClick={loadFees}
              >
                Retry
              </button>

            </div>

          )}

        {/* =================================================
            EMPTY
        ================================================= */}

        {!loading &&
          !error &&
          filteredFees.length === 0 && (

            <div className="fee-state">

              <div className="empty-fee-icon">
                💰
              </div>

              <h3>
                No Fee Records Found
              </h3>

              <p>
                {search
                  ? "No fee records match your search."
                  : "There are no fee records yet."}
              </p>

              {!search && (

                <button
                  className="add-first-btn"
                  onClick={
                    openAddModal
                  }
                >
                  + Add First Fee
                </button>

              )}

            </div>

          )}

        {/* =================================================
            TABLE
        ================================================= */}

        {!loading &&
          !error &&
          filteredFees.length > 0 && (

            <div className="fee-table-wrapper">

              <table className="fee-table">

                <thead>

                  <tr>

                    <th>
                      STUDENT
                    </th>

                    <th>
                      FEE TYPE
                    </th>

                    <th>
                      AMOUNT
                    </th>

                    <th>
                      PAID
                    </th>

                    <th>
                      BALANCE
                    </th>

                    <th>
                      DUE DATE
                    </th>

                    <th>
                      STATUS
                    </th>

                    <th>
                      ACTIONS
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredFees.map(
                    (fee, index) => {

                      const id =
                        fee._id ||
                        fee.id ||
                        index;

                      const balance =
                        Math.max(
                          Number(
                            fee.amount ||
                              0
                          ) -
                            Number(
                              fee.paidAmount ||
                                0
                            ),
                          0
                        );

                      return (

                        <tr
                          key={id}
                        >

                          {/* STUDENT */}

                          <td>

                            <div className="student-profile">

                              <div className="student-avatar">
                                🎓
                              </div>

                              <div>

                                <strong>
                                  {
                                    fee.studentName ||
                                    "Unknown Student"
                                  }
                                </strong>

                                <small>
                                  Roll Number:{" "}
                                  {
                                    fee.rollNumber ||
                                    "-"
                                  }
                                </small>

                              </div>

                            </div>

                          </td>

                          {/* FEE TYPE */}

                          <td>

                            <span className="fee-type-badge">
                              {
                                fee.feeType ||
                                "-"
                              }
                            </span>

                          </td>

                          {/* AMOUNT */}

                          <td>

                            <strong>
                              {formatAmount(
                                fee.amount
                              )}
                            </strong>

                          </td>

                          {/* PAID */}

                          <td>

                            <span className="paid-amount">
                              {formatAmount(
                                fee.paidAmount
                              )}
                            </span>

                          </td>

                          {/* BALANCE */}

                          <td>

                            <span
                              className={
                                balance > 0
                                  ? "balance-due"
                                  : "balance-clear"
                              }
                            >
                              {formatAmount(
                                balance
                              )}
                            </span>

                          </td>

                          {/* DUE DATE */}

                          <td>
                            {formatDate(
                              fee.dueDate
                            )}
                          </td>

                          {/* STATUS */}

                          <td>

                            <span
                              className={`fee-status-badge ${getStatusClass(
                                fee.status
                              )}`}
                            >
                              {
                                fee.status ||
                                "Pending"
                              }
                            </span>

                          </td>

                          {/* ACTIONS */}

                          <td>

                            <div className="fee-actions">

                              <button
                                className="view-btn"
                                onClick={() =>
                                  handleView(
                                    fee
                                  )
                                }
                              >
                                View
                              </button>

                              <button
                                className="edit-btn"
                                onClick={() =>
                                  openEditModal(
                                    fee
                                  )
                                }
                              >
                                Edit
                              </button>

                              <button
                                className="delete-btn"
                                onClick={() =>
                                  handleDelete(
                                    fee
                                  )
                                }
                              >
                                Delete
                              </button>

                            </div>

                          </td>

                        </tr>

                      );
                    }
                  )}

                </tbody>

              </table>

            </div>

          )}

      </div>

      {/* =================================================
          ADD / EDIT MODAL
      ================================================= */}

      {showModal && (

        <div
          className="fee-modal-overlay"
          onClick={closeModal}
        >

          <div
            className="fee-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="modal-header">

              <div>

                <h2>
                  {editingId
                    ? "Edit Fee"
                    : "Add Fee"}
                </h2>

                <p>
                  {editingId
                    ? "Update fee payment information."
                    : "Enter student fee information to create a new record."}
                </p>

              </div>

              <button
                className="modal-close"
                onClick={
                  closeModal
                }
                disabled={saving}
              >
                ×
              </button>

            </div>

            {/* FORM */}

            <form
              className="fee-form"
              onSubmit={
                handleSubmit
              }
            >

              {/* STUDENT INFORMATION */}

              <div className="form-section-title">
                Student Information
              </div>

              <div className="form-grid">

                <div className="form-group">

                  <label>
                    Student Name *
                  </label>

                  <input
                    name="studentName"
                    value={
                      form.studentName
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter student name"
                    required
                  />

                </div>

                <div className="form-group">

                  <label>
                    Roll Number *
                  </label>

                  <input
                    name="rollNumber"
                    value={
                      form.rollNumber
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter roll number"
                    required
                  />

                </div>

              </div>

              {/* FEE INFORMATION */}

              <div className="form-section-title">
                Fee Information
              </div>

              <div className="form-grid">

                {/* FEE TYPE */}

                <div className="form-group">

                  <label>
                    Fee Type *
                  </label>

                  <select
                    name="feeType"
                    value={
                      form.feeType
                    }
                    onChange={
                      handleChange
                    }
                    required
                  >

                    <option value="">
                      Select Fee Type
                    </option>

                    <option value="Tuition Fee">
                      Tuition Fee
                    </option>

                    <option value="Transport Fee">
                      Transport Fee
                    </option>

                    <option value="Examination Fee">
                      Examination Fee
                    </option>

                    <option value="Hostel Fee">
                      Hostel Fee
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>

                </div>

                {/* TOTAL AMOUNT */}

                <div className="form-group">

                  <label>
                    Total Amount *
                  </label>

                  <input
                    type="number"
                    name="amount"
                    value={
                      form.amount
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter amount"
                    min="0"
                    required
                  />

                </div>

                {/* PAID AMOUNT */}

                <div className="form-group">

                  <label>
                    Paid Amount
                  </label>

                  <input
                    type="number"
                    name="paidAmount"
                    value={
                      form.paidAmount
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter paid amount"
                    min="0"
                  />

                </div>

                {/* BALANCE */}

                <div className="form-group">

                  <label>
                    Balance
                  </label>

                  <input
                    type="text"
                    value={formatAmount(
                      formBalance
                    )}
                    readOnly
                    className="balance-input"
                  />

                </div>

                {/* STATUS */}

                <div className="form-group">

                  <label>
                    Status
                  </label>

                  <select
                    name="status"
                    value={
                      form.status
                    }
                    onChange={
                      handleChange
                    }
                  >

                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Partial">
                      Partial
                    </option>

                    <option value="Paid">
                      Paid
                    </option>

                    <option value="Overdue">
                      Overdue
                    </option>

                  </select>

                </div>

              </div>

              {/* PAYMENT INFORMATION */}

              <div className="form-section-title">
                Payment Information
              </div>

              <div className="form-grid">

                {/* DUE DATE */}

                <div className="form-group">

                  <label>
                    Due Date
                  </label>

                  <input
                    type="date"
                    name="dueDate"
                    value={
                      form.dueDate
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>

                {/* PAYMENT DATE */}

                <div className="form-group">

                  <label>
                    Payment Date
                  </label>

                  <input
                    type="date"
                    name="paymentDate"
                    value={
                      form.paymentDate
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>

                {/* PAYMENT METHOD */}

                <div className="form-group">

                  <label>
                    Payment Method
                  </label>

                  <select
                    name="paymentMethod"
                    value={
                      form.paymentMethod
                    }
                    onChange={
                      handleChange
                    }
                  >

                    <option value="Cash">
                      Cash
                    </option>

                    <option value="UPI">
                      UPI
                    </option>

                    <option value="Card">
                      Card
                    </option>

                    <option value="Bank Transfer">
                      Bank Transfer
                    </option>

                    <option value="Cheque">
                      Cheque
                    </option>

                  </select>

                </div>

              </div>

              {/* ADDITIONAL INFORMATION */}

              <div className="form-section-title">
                Additional Information
              </div>

              <div className="form-grid">

                <div className="form-group full-width">

                  <label>
                    Remarks
                  </label>

                  <textarea
                    name="remarks"
                    value={
                      form.remarks
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter remarks"
                    rows="3"
                  />

                </div>

              </div>

              {/* BUTTONS */}

              <div className="form-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={
                    closeModal
                  }
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-fee-btn"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Fee"
                    : "Add Fee"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Fees;