import { useEffect, useMemo, useState } from "react";
import "../../styles/performance.css";

const API_URL = "http://localhost:5000/api/performance";

const emptyForm = {
  rollNumber: "",
  studentName: "",
  subject: "",
  examType: "",
  marks: "",
  totalMarks: "100",
  grade: "",
  remarks: "",
  status: "Pass",
};

function Performance() {
  const [performances, setPerformances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState(emptyForm);

  // =====================================================
  // LOAD PERFORMANCE
  // =====================================================

  const loadPerformances = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(
          "Unable to load performance records"
        );
      }

      const result = await response.json();

      const performanceList =
        result.performances ||
        result.data ||
        [];

      setPerformances(
        Array.isArray(performanceList)
          ? performanceList
          : []
      );
    } catch (err) {
      console.error(
        "Performance API Error:",
        err
      );

      setError(
        "Unable to load performance records. Please check the server."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPerformances();
  }, []);

  // =====================================================
  // SEARCH
  // =====================================================

  const filteredPerformances = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) {
      return performances;
    }

    return performances.filter((record) => {
      return (
        String(record.studentName || "")
          .toLowerCase()
          .includes(value) ||

        String(record.rollNumber || "")
          .toLowerCase()
          .includes(value) ||

        String(record.subject || "")
          .toLowerCase()
          .includes(value) ||

        String(record.examType || "")
          .toLowerCase()
          .includes(value) ||

        String(record.grade || "")
          .toLowerCase()
          .includes(value) ||

        String(record.status || "")
          .toLowerCase()
          .includes(value)
      );
    });
  }, [performances, search]);

  // =====================================================
  // STATISTICS
  // =====================================================

  const totalRecords = performances.length;

  const passCount = performances.filter(
    (record) =>
      String(record.status || "").toLowerCase() ===
      "pass"
  ).length;

  const failCount = performances.filter(
    (record) =>
      String(record.status || "").toLowerCase() ===
      "fail"
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

    // Automatically calculate grade
    if (
      name === "marks" ||
      name === "totalMarks"
    ) {
      const marks =
        name === "marks"
          ? Number(value)
          : Number(form.marks);

      const total =
        name === "totalMarks"
          ? Number(value)
          : Number(form.totalMarks);

      if (
        total > 0 &&
        !Number.isNaN(marks)
      ) {
        const percentage =
          (marks / total) * 100;

        let calculatedGrade = "";

        if (percentage >= 90) {
          calculatedGrade = "A+";
        } else if (percentage >= 80) {
          calculatedGrade = "A";
        } else if (percentage >= 70) {
          calculatedGrade = "B";
        } else if (percentage >= 60) {
          calculatedGrade = "C";
        } else if (percentage >= 50) {
          calculatedGrade = "D";
        } else {
          calculatedGrade = "F";
        }

        setForm((previous) => ({
          ...previous,
          [name]: value,
          grade: calculatedGrade,
          status:
            percentage >= 35
              ? "Pass"
              : "Fail",
        }));
      }
    }
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

  const openEditModal = (record) => {
    setEditingId(
      record._id || record.id
    );

    setForm({
      rollNumber:
        record.rollNumber || "",

      studentName:
        record.studentName || "",

      subject:
        record.subject || "",

      examType:
        record.examType || "",

      marks:
        record.marks !== undefined
          ? String(record.marks)
          : "",

      totalMarks:
        record.totalMarks !== undefined
          ? String(record.totalMarks)
          : "100",

      grade:
        record.grade || "",

      remarks:
        record.remarks || "",

      status:
        record.status || "Pass",
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
  // SAVE PERFORMANCE
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.rollNumber.trim()) {
      alert("Please enter roll number.");
      return;
    }

    if (!form.studentName.trim()) {
      alert("Please enter student name.");
      return;
    }

    if (!form.subject.trim()) {
      alert("Please enter subject.");
      return;
    }

    if (!form.examType.trim()) {
      alert("Please enter exam type.");
      return;
    }

    if (form.marks === "") {
      alert("Please enter marks.");
      return;
    }

    if (form.totalMarks === "") {
      alert("Please enter total marks.");
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

      const response = await fetch(url, {
        method,

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          rollNumber:
            form.rollNumber.trim(),

          studentName:
            form.studentName.trim(),

          subject:
            form.subject.trim(),

          examType:
            form.examType.trim(),

          marks: Number(form.marks),

          totalMarks:
            Number(form.totalMarks),

          grade:
            form.grade.trim(),

          remarks:
            form.remarks.trim(),

          status:
            form.status,
        }),
      });

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Unable to save performance"
        );
      }

      alert(
        editingId
          ? "Performance updated successfully!"
          : "Performance added successfully!"
      );

      closeModal();

      await loadPerformances();
    } catch (err) {
      console.error(
        "Save Performance Error:",
        err
      );

      alert(
        err.message ||
          "Something went wrong while saving performance."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // DELETE PERFORMANCE
  // =====================================================

  const handleDelete = async (record) => {
    const id =
      record._id || record.id;

    if (!id) {
      alert(
        "Performance ID not found."
      );
      return;
    }

    const confirmed =
      window.confirm(
        `Are you sure you want to delete the performance record for ${record.studentName}?`
      );

    if (!confirmed) return;

    try {
      const response = await fetch(
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
            "Unable to delete performance"
        );
      }

      alert(
        "Performance deleted successfully."
      );

      await loadPerformances();
    } catch (err) {
      console.error(
        "Delete Performance Error:",
        err
      );

      alert(
        err.message ||
          "Unable to delete performance."
      );
    }
  };

  // =====================================================
  // VIEW PERFORMANCE
  // =====================================================

  const handleView = (record) => {
    alert(
      `Performance Details\n\n` +
        `Student: ${
          record.studentName || "-"
        }\n` +
        `Roll Number: ${
          record.rollNumber || "-"
        }\n` +
        `Subject: ${
          record.subject || "-"
        }\n` +
        `Exam Type: ${
          record.examType || "-"
        }\n` +
        `Marks: ${
          record.marks ?? "-"
        } / ${
          record.totalMarks ?? "-"
        }\n` +
        `Grade: ${
          record.grade || "-"
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
    <div className="performance-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="performance-header">

        <div>
          <div className="performance-label">
            PERFORMANCE MANAGEMENT
          </div>

          <h1>
            Performance
          </h1>

          <p>
            Manage student marks, grades,
            examinations and academic performance.
          </p>
        </div>

        <button
          className="add-performance-btn"
          onClick={openAddModal}
        >
          <span>+</span>
          Add Performance
        </button>

      </div>

      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <div className="performance-stat-grid">

        <div className="performance-stat-card">

          <div className="performance-stat-icon">
            📊
          </div>

          <div className="performance-stat-info">

            <span>
              Total Records
            </span>

            <strong>
              {totalRecords}
            </strong>

          </div>

        </div>

        <div className="performance-stat-card">

          <div className="performance-stat-icon">
            ✅
          </div>

          <div className="performance-stat-info">

            <span>
              Passed
            </span>

            <strong>
              {passCount}
            </strong>

          </div>

        </div>

        <div className="performance-stat-card">

          <div className="performance-stat-icon">
            ❌
          </div>

          <div className="performance-stat-info">

            <span>
              Failed
            </span>

            <strong>
              {failCount}
            </strong>

          </div>

        </div>

      </div>

      {/* =====================================================
          RECORDS
      ===================================================== */}

      <div className="performance-records">

        <div className="records-header">

          <div>

            <h2>
              Performance Records
            </h2>

            <p>
              View and manage student academic performance.
            </p>

          </div>

          <div className="performance-search">

            <span>🔍</span>

            <input
              type="text"
              placeholder="Search performance..."
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
          <div className="performance-state">

            <div className="loading-spinner"></div>

            <h3>
              Loading Performance...
            </h3>

            <p>
              Please wait while we fetch
              performance records.
            </p>

          </div>
        )}

        {/* =====================================================
            ERROR
        ===================================================== */}

        {!loading && error && (
          <div className="performance-state error-state">

            <div className="state-icon">
              ⚠️
            </div>

            <h3>
              Unable to Load Performance
            </h3>

            <p>
              {error}
            </p>

            <button
              className="retry-btn"
              onClick={loadPerformances}
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
          filteredPerformances.length === 0 && (

            <div className="performance-state">

              <div className="empty-performance-icon">
                📊
              </div>

              <h3>
                No Performance Records Found
              </h3>

              <p>
                {search
                  ? "No performance records match your search."
                  : "There are no performance records yet."}
              </p>

              {!search && (
                <button
                  className="add-first-btn"
                  onClick={openAddModal}
                >
                  + Add First Performance
                </button>
              )}

            </div>
          )}

        {/* =====================================================
            TABLE
        ===================================================== */}

        {!loading &&
          !error &&
          filteredPerformances.length > 0 && (

            <div className="performance-table-wrapper">

              <table className="performance-table">

                <thead>

                  <tr>
                    <th>STUDENT</th>
                    <th>SUBJECT</th>
                    <th>EXAM</th>
                    <th>MARKS</th>
                    <th>GRADE</th>
                    <th>STATUS</th>
                    <th>ACTIONS</th>
                  </tr>

                </thead>

                <tbody>

                  {filteredPerformances.map(
                    (record, index) => {

                      const id =
                        record._id ||
                        record.id ||
                        index;

                      return (
                        <tr key={id}>

                          {/* STUDENT */}

                          <td>

                            <div className="performance-student">

                              <div className="performance-avatar">
                                🎓
                              </div>

                              <div>

                                <strong>
                                  {record.studentName ||
                                    "Unnamed Student"}
                                </strong>

                                <small>
                                  Roll Number:{" "}
                                  {record.rollNumber ||
                                    "-"}
                                </small>

                              </div>

                            </div>

                          </td>

                          {/* SUBJECT */}

                          <td>
                            {record.subject ||
                              "-"}
                          </td>

                          {/* EXAM */}

                          <td>
                            {record.examType ||
                              "-"}
                          </td>

                          {/* MARKS */}

                          <td>

                            <strong className="marks-value">
                              {record.marks ?? "-"}
                            </strong>

                            <span className="marks-total">
                              {" "}
                              /{" "}
                              {record.totalMarks ??
                                "-"}
                            </span>

                          </td>

                          {/* GRADE */}

                          <td>

                            <span className="grade-badge">
                              {record.grade ||
                                "-"}
                            </span>

                          </td>

                          {/* STATUS */}

                          <td>

                            <span
                              className={`performance-status ${
                                String(
                                  record.status ||
                                    "Pass"
                                ).toLowerCase()
                              }`}
                            >
                              {record.status ||
                                "Pass"}
                            </span>

                          </td>

                          {/* ACTIONS */}

                          <td>

                            <div className="performance-actions">

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
          className="performance-modal-overlay"
          onClick={closeModal}
        >

          <div
            className="performance-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="modal-header">

              <div>

                <h2>
                  {editingId
                    ? "Edit Performance"
                    : "Add Performance"}
                </h2>

                <p>
                  {editingId
                    ? "Update student performance information."
                    : "Enter student marks and academic performance."}
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
              className="performance-form"
              onSubmit={handleSubmit}
            >

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

              </div>

              <div className="form-section-title">
                Examination Information
              </div>

              <div className="form-grid">

                <div className="form-group">

                  <label>
                    Subject *
                  </label>

                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="e.g. Mathematics"
                    required
                  />

                </div>

                <div className="form-group">

                  <label>
                    Exam Type *
                  </label>

                  <select
                    name="examType"
                    value={form.examType}
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Select Exam
                    </option>

                    <option value="Unit Test">
                      Unit Test
                    </option>

                    <option value="Mid Term">
                      Mid Term
                    </option>

                    <option value="Quarterly">
                      Quarterly
                    </option>

                    <option value="Half Yearly">
                      Half Yearly
                    </option>

                    <option value="Final Exam">
                      Final Exam
                    </option>

                  </select>

                </div>

                <div className="form-group">

                  <label>
                    Marks *
                  </label>

                  <input
                    type="number"
                    name="marks"
                    value={form.marks}
                    onChange={handleChange}
                    placeholder="Enter marks"
                    min="0"
                    required
                  />

                </div>

                <div className="form-group">

                  <label>
                    Total Marks *
                  </label>

                  <input
                    type="number"
                    name="totalMarks"
                    value={form.totalMarks}
                    onChange={handleChange}
                    placeholder="100"
                    min="1"
                    required
                  />

                </div>

                <div className="form-group">

                  <label>
                    Grade
                  </label>

                  <input
                    name="grade"
                    value={form.grade}
                    onChange={handleChange}
                    placeholder="Automatically calculated"
                  />

                </div>

                <div className="form-group">

                  <label>
                    Status
                  </label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >

                    <option value="Pass">
                      Pass
                    </option>

                    <option value="Fail">
                      Fail
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
                    placeholder="Enter performance remarks"
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
                  className="save-performance-btn"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Performance"
                    : "Add Performance"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default Performance;