import { useEffect, useMemo, useState } from "react";
import "../../styles/attendance.css";

const API_URL = "http://localhost:5000/api/attendance";

const emptyForm = {
  studentName: "",
  rollNumber: "",
  date: "",
  status: "Present",
  remarks: "",
};

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState(emptyForm);

  // =====================================================
  // LOAD ATTENDANCE
  // =====================================================

  const loadAttendance = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Unable to load attendance");
      }

      const result = await response.json();

      const attendanceList =
        result.attendance ||
        result.data ||
        [];

      setAttendance(
        Array.isArray(attendanceList)
          ? attendanceList
          : []
      );
    } catch (err) {
      console.error("Attendance API Error:", err);

      setError(
        "Unable to load attendance. Please check the server."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAttendance();
  }, []);

  // =====================================================
  // SEARCH
  // =====================================================

  const filteredAttendance = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) {
      return attendance;
    }

    return attendance.filter((record) => {
      return (
        String(record.studentName || "")
          .toLowerCase()
          .includes(value) ||

        String(record.rollNumber || "")
          .toLowerCase()
          .includes(value) ||

        String(record.status || "")
          .toLowerCase()
          .includes(value) ||

        String(record.remarks || "")
          .toLowerCase()
          .includes(value)
      );
    });
  }, [attendance, search]);

  // =====================================================
  // STATISTICS
  // =====================================================

  const totalRecords = attendance.length;

  const presentCount = attendance.filter(
    (record) =>
      String(record.status || "").toLowerCase() ===
      "present"
  ).length;

  const absentCount = attendance.filter(
    (record) =>
      String(record.status || "").toLowerCase() ===
      "absent"
  ).length;

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================================
  // ADD ATTENDANCE
  // =====================================================

  const openAddModal = () => {
    setEditingId(null);

    setForm({
      ...emptyForm,
      date: new Date().toISOString().split("T")[0],
    });

    setShowModal(true);
  };

  // =====================================================
  // EDIT ATTENDANCE
  // =====================================================

  const openEditModal = (record) => {
    setEditingId(record._id || record.id);

    setForm({
      studentName: record.studentName || "",
      rollNumber: record.rollNumber || "",
      date: record.date
        ? String(record.date).substring(0, 10)
        : "",
      status: record.status || "Present",
      remarks: record.remarks || "",
    });

    setShowModal(true);
  };

  // =====================================================
  // CLOSE MODAL
  // =====================================================

  const closeModal = () => {
    if (saving) return;

    setShowModal(false);
    setEditingId(null);
    setForm({
      ...emptyForm,
    });
  };

  // =====================================================
  // SAVE ATTENDANCE
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.studentName.trim()) {
      alert("Please enter student name.");
      return;
    }

    if (!form.rollNumber.trim()) {
      alert("Please enter roll number.");
      return;
    }

    if (!form.date) {
      alert("Please select date.");
      return;
    }

    try {
      setSaving(true);

      const method = editingId ? "PUT" : "POST";

      const url = editingId
        ? `${API_URL}/${editingId}`
        : API_URL;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Unable to save attendance"
        );
      }

      alert(
        editingId
          ? "Attendance updated successfully!"
          : "Attendance added successfully!"
      );

      closeModal();

      await loadAttendance();
    } catch (err) {
      console.error(
        "Save Attendance Error:",
        err
      );

      alert(
        err.message ||
          "Something went wrong while saving attendance."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // DELETE ATTENDANCE
  // =====================================================

  const handleDelete = async (record) => {
    const id = record._id || record.id;

    if (!id) {
      alert("Attendance ID not found.");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete attendance for ${record.studentName}?`
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Unable to delete attendance"
        );
      }

      alert(
        "Attendance deleted successfully."
      );

      await loadAttendance();
    } catch (err) {
      console.error(
        "Delete Attendance Error:",
        err
      );

      alert(
        err.message ||
          "Unable to delete attendance."
      );
    }
  };

  // =====================================================
  // VIEW ATTENDANCE
  // =====================================================

  const handleView = (record) => {
    alert(
      `Attendance Details\n\n` +
        `Student: ${
          record.studentName || "-"
        }\n` +
        `Roll Number: ${
          record.rollNumber || "-"
        }\n` +
        `Date: ${
          record.date
            ? String(record.date).substring(0, 10)
            : "-"
        }\n` +
        `Status: ${
          record.status || "-"
        }\n` +
        `Remarks: ${
          record.remarks || "-"
        }`
    );
  };

  return (
    <div className="attendance-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="attendance-header">

        <div>
          <div className="attendance-label">
            ATTENDANCE MANAGEMENT
          </div>

          <h1>Attendance</h1>

          <p>
            Manage student attendance records
            and daily attendance information.
          </p>
        </div>

        <button
          className="add-attendance-btn"
          onClick={openAddModal}
        >
          <span>+</span>
          Mark Attendance
        </button>

      </div>

      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <div className="attendance-stat-grid">

        <div className="attendance-stat-card">

          <div className="attendance-stat-icon">
            📋
          </div>

          <div className="attendance-stat-info">
            <span>Total Records</span>

            <strong>
              {totalRecords}
            </strong>
          </div>

        </div>

        <div className="attendance-stat-card">

          <div className="attendance-stat-icon">
            ✅
          </div>

          <div className="attendance-stat-info">
            <span>Present</span>

            <strong>
              {presentCount}
            </strong>
          </div>

        </div>

        <div className="attendance-stat-card">

          <div className="attendance-stat-icon">
            ❌
          </div>

          <div className="attendance-stat-info">
            <span>Absent</span>

            <strong>
              {absentCount}
            </strong>
          </div>

        </div>

      </div>

      {/* =====================================================
          ATTENDANCE RECORDS
      ===================================================== */}

      <div className="attendance-records">

        <div className="records-header">

          <div>
            <h2>
              Attendance Records
            </h2>

            <p>
              View and manage student attendance.
            </p>
          </div>

          <div className="attendance-search">

            <span>🔍</span>

            <input
              type="text"
              placeholder="Search attendance..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

        </div>

        {/* =====================================================
            LOADING
        ===================================================== */}

        {loading && (
          <div className="attendance-state">

            <div className="loading-spinner"></div>

            <h3>
              Loading Attendance...
            </h3>

            <p>
              Please wait while we fetch
              attendance records.
            </p>

          </div>
        )}

        {/* =====================================================
            ERROR
        ===================================================== */}

        {!loading && error && (
          <div className="attendance-state error-state">

            <div className="state-icon">
              ⚠️
            </div>

            <h3>
              Unable to Load Attendance
            </h3>

            <p>
              {error}
            </p>

            <button
              className="retry-btn"
              onClick={loadAttendance}
            >
              Retry
            </button>

          </div>
        )}

        {/* =====================================================
            EMPTY
        ===================================================== */}

        {!loading &&
          !error &&
          filteredAttendance.length === 0 && (

            <div className="attendance-state">

              <div className="empty-attendance-icon">
                📋
              </div>

              <h3>
                No Attendance Found
              </h3>

              <p>
                {search
                  ? "No attendance records match your search."
                  : "There are no attendance records yet."}
              </p>

              {!search && (
                <button
                  className="add-first-btn"
                  onClick={openAddModal}
                >
                  + Mark First Attendance
                </button>
              )}

            </div>
          )}

        {/* =====================================================
            TABLE
        ===================================================== */}

        {!loading &&
          !error &&
          filteredAttendance.length > 0 && (

            <div className="attendance-table-wrapper">

              <table className="attendance-table">

                <thead>

                  <tr>
                    <th>STUDENT</th>
                    <th>ROLL NUMBER</th>
                    <th>DATE</th>
                    <th>STATUS</th>
                    <th>REMARKS</th>
                    <th>ACTIONS</th>
                  </tr>

                </thead>

                <tbody>

                  {filteredAttendance.map(
                    (record, index) => {

                      const id =
                        record._id ||
                        record.id ||
                        index;

                      return (
                        <tr key={id}>

                          {/* STUDENT */}

                          <td>

                            <div className="student-profile">

                              <div className="student-avatar">
                                🎓
                              </div>

                              <div>

                                <strong>
                                  {record.studentName ||
                                    "Unnamed Student"}
                                </strong>

                                <small>
                                  Attendance ID:{" "}
                                  {record._id
                                    ? String(
                                        record._id
                                      ).slice(-6)
                                    : id}
                                </small>

                              </div>

                            </div>

                          </td>

                          {/* ROLL NUMBER */}

                          <td>
                            {record.rollNumber ||
                              "-"}
                          </td>

                          {/* DATE */}

                          <td>
                            {record.date
                              ? new Date(
                                  record.date
                                ).toLocaleDateString()
                              : "-"}
                          </td>

                          {/* STATUS */}

                          <td>

                            <span
                              className={`attendance-status ${
                                String(
                                  record.status ||
                                    "Present"
                                ).toLowerCase()
                              }`}
                            >
                              {record.status ||
                                "Present"}
                            </span>

                          </td>

                          {/* REMARKS */}

                          <td>
                            {record.remarks ||
                              "-"}
                          </td>

                          {/* ACTIONS */}

                          <td>

                            <div className="attendance-actions">

                              <button
                                className="view-btn"
                                onClick={() =>
                                  handleView(
                                    record
                                  )
                                }
                              >
                                View
                              </button>

                              <button
                                className="edit-btn"
                                onClick={() =>
                                  openEditModal(
                                    record
                                  )
                                }
                              >
                                Edit
                              </button>

                              <button
                                className="delete-btn"
                                onClick={() =>
                                  handleDelete(
                                    record
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

      {/* =====================================================
          ADD / EDIT MODAL
      ===================================================== */}

      {showModal && (

        <div
          className="attendance-modal-overlay"
          onClick={closeModal}
        >

          <div
            className="attendance-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="modal-header">

              <div>

                <h2>
                  {editingId
                    ? "Edit Attendance"
                    : "Mark Attendance"}
                </h2>

                <p>
                  {editingId
                    ? "Update attendance information."
                    : "Enter student attendance information."}
                </p>

              </div>

              <button
                className="modal-close"
                onClick={closeModal}
                disabled={saving}
              >
                ×
              </button>

            </div>

            {/* FORM */}

            <form
              className="attendance-form"
              onSubmit={handleSubmit}
            >

              <div className="form-section-title">
                Attendance Information
              </div>

              <div className="form-grid">

                <div className="form-group">

                  <label>
                    Student Name *
                  </label>

                  <input
                    name="studentName"
                    value={form.studentName}
                    onChange={handleChange}
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
                    value={form.rollNumber}
                    onChange={handleChange}
                    placeholder="Enter roll number"
                    required
                  />

                </div>

                <div className="form-group">

                  <label>
                    Date *
                  </label>

                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="form-group">

                  <label>
                    Status *
                  </label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >

                    <option value="Present">
                      Present
                    </option>

                    <option value="Absent">
                      Absent
                    </option>

                    <option value="Late">
                      Late
                    </option>

                    <option value="Leave">
                      Leave
                    </option>

                  </select>

                </div>

                <div className="form-group full-width">

                  <label>
                    Remarks
                  </label>

                  <textarea
                    name="remarks"
                    value={form.remarks}
                    onChange={handleChange}
                    placeholder="Enter remarks"
                    rows="3"
                  />

                </div>

              </div>

              <div className="form-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={closeModal}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-attendance-btn"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Attendance"
                    : "Mark Attendance"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default Attendance;