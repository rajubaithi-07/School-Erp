import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Examinations() {
  const location = useLocation();

  const isStudentPortal =
    location.pathname.startsWith("/student/");

  const [examinations, setExaminations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const [student, setStudent] = useState(null);

  const API_URL =
    "http://localhost:5000/api/examinations";

  // =====================================================
  // FORM
  // =====================================================

  const emptyForm = {
    studentName: "",
    rollNumber: "",
    examName: "",
    subject: "",
    examDate: "",
    startTime: "",
    endTime: "",
    roomNumber: "",
    totalMarks: "100",
    status: "Scheduled",
    remarks: "",
  };

  const [form, setForm] = useState(emptyForm);

  // =====================================================
  // GET STUDENT SESSION
  // =====================================================

  useEffect(() => {
    if (!isStudentPortal) {
      return;
    }

    try {
      const storedStudent =
        localStorage.getItem("student");

      if (storedStudent) {
        setStudent(JSON.parse(storedStudent));
      }
    } catch (error) {
      console.error(
        "Student session error:",
        error
      );
    }
  }, [isStudentPortal]);

  // =====================================================
  // LOAD EXAMINATIONS
  // =====================================================

  const loadExaminations = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to fetch examinations"
        );
      }

      const records =
        result.examinations ||
        result.examination ||
        result.data ||
        [];

      setExaminations(
        Array.isArray(records)
          ? records
          : []
      );
    } catch (err) {
      console.error(
        "Examination Fetch Error:",
        err
      );

      setError(
        err.message ||
          "Unable to load examinations."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExaminations();
  }, []);

  // =====================================================
  // FILTER STUDENT RECORDS
  // =====================================================

  const studentExaminations =
    isStudentPortal && student
      ? examinations.filter((record) => {
          const recordRoll =
            String(
              record.rollNumber || ""
            )
              .trim()
              .toLowerCase();

          const studentRoll =
            String(
              student.rollNumber || ""
            )
              .trim()
              .toLowerCase();

          return (
            recordRoll === studentRoll
          );
        })
      : examinations;

  // =====================================================
  // SEARCH
  // =====================================================

  const filteredExaminations =
    studentExaminations.filter(
      (record) => {
        const text = `
          ${record.studentName || ""}
          ${record.rollNumber || ""}
          ${record.examName || ""}
          ${record.subject || ""}
          ${record.roomNumber || ""}
          ${record.status || ""}
        `.toLowerCase();

        return text.includes(
          search.toLowerCase()
        );
      }
    );

  // =====================================================
  // STATISTICS
  // =====================================================

  const totalExaminations =
    filteredExaminations.length;

  const scheduledCount =
    filteredExaminations.filter(
      (record) =>
        String(
          record.status || ""
        ).toLowerCase() ===
        "scheduled"
    ).length;

  const completedCount =
    filteredExaminations.filter(
      (record) =>
        String(
          record.status || ""
        ).toLowerCase() ===
        "completed"
    ).length;

  const cancelledCount =
    filteredExaminations.filter(
      (record) =>
        String(
          record.status || ""
        ).toLowerCase() ===
        "cancelled"
    ).length;

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
  // OPEN ADD
  // =====================================================

  const openAddModal = () => {
    setEditingId(null);

    setForm({
      ...emptyForm,
    });

    setShowModal(true);
  };

  // =====================================================
  // OPEN EDIT
  // =====================================================

  const openEditModal = (record) => {
    setEditingId(
      record._id || record.id
    );

    setForm({
      studentName:
        record.studentName || "",

      rollNumber:
        record.rollNumber || "",

      examName:
        record.examName || "",

      subject:
        record.subject || "",

      examDate:
        record.examDate
          ? String(
              record.examDate
            ).slice(0, 10)
          : "",

      startTime:
        record.startTime || "",

      endTime:
        record.endTime || "",

      roomNumber:
        record.roomNumber || "",

      totalMarks:
        record.totalMarks !==
        undefined
          ? String(
              record.totalMarks
            )
          : "100",

      status:
        record.status ||
        "Scheduled",

      remarks:
        record.remarks || "",
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
  // SAVE EXAMINATION
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

    if (!form.examName.trim()) {
      alert(
        "Please enter examination name."
      );
      return;
    }

    if (!form.subject.trim()) {
      alert(
        "Please enter subject."
      );
      return;
    }

    if (!form.examDate) {
      alert(
        "Please select examination date."
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

      const response =
        await fetch(url, {
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

            examName:
              form.examName.trim(),

            subject:
              form.subject.trim(),

            examDate:
              form.examDate,

            startTime:
              form.startTime,

            endTime:
              form.endTime,

            roomNumber:
              form.roomNumber.trim(),

            totalMarks:
              Number(
                form.totalMarks
              ),

            status:
              form.status,

            remarks:
              form.remarks.trim(),
          }),
        });

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Unable to save examination"
        );
      }

      alert(
        editingId
          ? "Examination updated successfully!"
          : "Examination added successfully!"
      );

      closeModal();

      await loadExaminations();
    } catch (err) {
      console.error(
        "Save Examination Error:",
        err
      );

      alert(
        err.message ||
          "Unable to save examination."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (
    record
  ) => {
    const id =
      record._id || record.id;

    if (!id) {
      alert(
        "Examination ID not found."
      );
      return;
    }

    const confirmed =
      window.confirm(
        `Are you sure you want to delete the examination "${record.examName || "this examination"}"?`
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
            "Unable to delete examination"
        );
      }

      alert(
        "Examination deleted successfully."
      );

      await loadExaminations();
    } catch (err) {
      console.error(
        "Delete Examination Error:",
        err
      );

      alert(
        err.message ||
          "Unable to delete examination."
      );
    }
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    return new Date(
      date
    ).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =====================================================
  // STATUS STYLE
  // =====================================================

  const getStatusStyle = (
    status
  ) => {
    const value =
      String(
        status || ""
      ).toLowerCase();

    if (value === "completed") {
      return {
        background: "#dcfce7",
        color: "#166534",
      };
    }

    if (value === "cancelled") {
      return {
        background: "#fee2e2",
        color: "#991b1b",
      };
    }

    return {
      background: "#fef3c7",
      color: "#92400e",
    };
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100%",
          padding: "40px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            padding: "60px",
          }}
        >
          <h2>
            Loading Examinations...
          </h2>

          <p
            style={{
              color: "#64748b",
            }}
          >
            Please wait while we fetch
            examination records.
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          padding: "28px 30px",
          marginBottom: "25px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div>
          <div
            style={{
              color: "#2563eb",
              fontWeight: "700",
              fontSize: "14px",
              letterSpacing: "1px",
              marginBottom: "8px",
            }}
          >
            {isStudentPortal
              ? "STUDENT PORTAL"
              : "EXAMINATION MANAGEMENT"}
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "28px",
              fontWeight: "500",
              color: "#111827",
            }}
          >
            📄 Examinations
          </h1>

          <p
            style={{
              margin:
                "8px 0 0",
              color: "#64748b",
            }}
          >
            {isStudentPortal
              ? "View your examination schedule and examination details."
              : "Manage student examinations and schedules."}
          </p>
        </div>

        {/* =============================================
            ADD BUTTON
            HIDDEN FOR STUDENTS
        ============================================= */}

        {!isStudentPortal && (
          <button
            onClick={openAddModal}
            style={{
              border: "none",
              background: "#2563eb",
              color: "#ffffff",
              padding:
                "13px 20px",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
              whiteSpace:
                "nowrap",
            }}
          >
            + Add Examination
          </button>
        )}
      </div>

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div
          style={{
            background: "#fee2e2",
            color: "#991b1b",
            padding: "16px 20px",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        >
          {error}

          <button
            onClick={
              loadExaminations
            }
            style={{
              marginLeft: "15px",
              border: "none",
              background:
                "#dc2626",
              color: "#ffffff",
              padding:
                "7px 12px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Retry
          </button>
        </div>
      )}

      {/* =================================================
          STATISTICS
      ================================================= */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4, minmax(0, 1fr))",
          gap: "18px",
          marginBottom: "25px",
        }}
      >
        <StatCard
          title="Total Examinations"
          value={totalExaminations}
          color="#2563eb"
        />

        <StatCard
          title="Scheduled"
          value={scheduledCount}
          color="#d97706"
        />

        <StatCard
          title="Completed"
          value={completedCount}
          color="#16a34a"
        />

        <StatCard
          title="Cancelled"
          value={cancelledCount}
          color="#dc2626"
        />
      </div>

      {/* =================================================
          SEARCH
      ================================================= */}

      <div
        style={{
          background: "#ffffff",
          padding: "18px",
          borderRadius: "12px",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Search examinations..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          style={{
            width: "100%",
            padding: "13px 15px",
            border:
              "1px solid #cbd5e1",
            borderRadius: "8px",
            outline: "none",
            fontSize: "14px",
            boxSizing:
              "border-box",
          }}
        />
      </div>

      {/* =================================================
          TABLE
      ================================================= */}

      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "24px",
            borderBottom:
              "1px solid #e2e8f0",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "20px",
              fontWeight: "500",
            }}
          >
            Examination Records
          </h2>

          <p
            style={{
              margin:
                "7px 0 0",
              color: "#64748b",
            }}
          >
            {isStudentPortal
              ? "Your examination schedule and records."
              : "All examination records."}
          </p>
        </div>

        {filteredExaminations.length ===
        0 ? (
          <div
            style={{
              padding: "70px 20px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "50px",
                marginBottom: "15px",
              }}
            >
              📄
            </div>

            <h3>
              No Examination Records
            </h3>

            <p
              style={{
                color: "#64748b",
              }}
            >
              {search
                ? "No examinations match your search."
                : isStudentPortal
                ? "No examinations were found for your roll number."
                : "No examination records have been added yet."}
            </p>

            {!isStudentPortal && (
              <button
                onClick={
                  openAddModal
                }
                style={{
                  border: "none",
                  background:
                    "#2563eb",
                  color: "#ffffff",
                  padding:
                    "11px 18px",
                  borderRadius:
                    "8px",
                  cursor: "pointer",
                  fontWeight:
                    "600",
                }}
              >
                + Add First Examination
              </button>
            )}
          </div>
        ) : (
          <div
            style={{
              overflowX:
                "auto",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse:
                  "collapse",
              }}
            >
              <thead>
                <tr
                  style={{
                    background:
                      "#f8fafc",
                    textAlign:
                      "left",
                  }}
                >
                  <th
                    style={
                      tableHeaderStyle
                    }
                  >
                    STUDENT
                  </th>

                  <th
                    style={
                      tableHeaderStyle
                    }
                  >
                    EXAMINATION
                  </th>

                  <th
                    style={
                      tableHeaderStyle
                    }
                  >
                    SUBJECT
                  </th>

                  <th
                    style={
                      tableHeaderStyle
                    }
                  >
                    DATE
                  </th>

                  <th
                    style={
                      tableHeaderStyle
                    }
                  >
                    TIME
                  </th>

                  <th
                    style={
                      tableHeaderStyle
                    }
                  >
                    ROOM
                  </th>

                  <th
                    style={
                      tableHeaderStyle
                    }
                  >
                    STATUS
                  </th>

                  {/* Admin only */}

                  {!isStudentPortal && (
                    <th
                      style={
                        tableHeaderStyle
                      }
                    >
                      ACTIONS
                    </th>
                  )}
                </tr>
              </thead>

              <tbody>
                {filteredExaminations.map(
                  (
                    record,
                    index
                  ) => (
                    <tr
                      key={
                        record._id ||
                        record.id ||
                        index
                      }
                    >
                      <td
                        style={
                          tableCellStyle
                        }
                      >
                        <strong>
                          {record.studentName ||
                            "-"}
                        </strong>

                        <div
                          style={{
                            color:
                              "#64748b",
                            fontSize:
                              "12px",
                            marginTop:
                              "4px",
                          }}
                        >
                          Roll:{" "}
                          {record.rollNumber ||
                            "-"}
                        </div>
                      </td>

                      <td
                        style={
                          tableCellStyle
                        }
                      >
                        {record.examName ||
                          "-"}
                      </td>

                      <td
                        style={
                          tableCellStyle
                        }
                      >
                        {record.subject ||
                          "-"}
                      </td>

                      <td
                        style={
                          tableCellStyle
                        }
                      >
                        {formatDate(
                          record.examDate
                        )}
                      </td>

                      <td
                        style={
                          tableCellStyle
                        }
                      >
                        {record.startTime ||
                          "-"}
                        {record.endTime &&
                          ` - ${record.endTime}`}
                      </td>

                      <td
                        style={
                          tableCellStyle
                        }
                      >
                        {record.roomNumber ||
                          "-"}
                      </td>

                      <td
                        style={
                          tableCellStyle
                        }
                      >
                        <span
                          style={{
                            display:
                              "inline-block",
                            padding:
                              "6px 12px",
                            borderRadius:
                              "20px",
                            fontSize:
                              "12px",
                            fontWeight:
                              "600",
                            ...getStatusStyle(
                              record.status
                            ),
                          }}
                        >
                          {record.status ||
                            "Scheduled"}
                        </span>
                      </td>

                      {/* =================================
                          ADMIN ACTIONS ONLY
                      ================================= */}

                      {!isStudentPortal && (
                        <td
                          style={
                            tableCellStyle
                          }
                        >
                          <div
                            style={{
                              display:
                                "flex",
                              gap: "8px",
                            }}
                          >
                            <button
                              onClick={() =>
                                openEditModal(
                                  record
                                )
                              }
                              style={{
                                border:
                                  "none",
                                background:
                                  "#dbeafe",
                                color:
                                  "#1d4ed8",
                                padding:
                                  "7px 10px",
                                borderRadius:
                                  "6px",
                                cursor:
                                  "pointer",
                              }}
                            >
                              Edit
                            </button>

                            <button
                              onClick={() =>
                                handleDelete(
                                  record
                                )
                              }
                              style={{
                                border:
                                  "none",
                                background:
                                  "#fee2e2",
                                color:
                                  "#dc2626",
                                padding:
                                  "7px 10px",
                                borderRadius:
                                  "6px",
                                cursor:
                                  "pointer",
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* =================================================
          ADD / EDIT MODAL
          NEVER SHOWN FOR STUDENTS
      ================================================= */}

      {!isStudentPortal &&
        showModal && (
          <div
            onClick={closeModal}
            style={{
              position: "fixed",
              inset: 0,
              background:
                "rgba(15, 23, 42, 0.55)",
              display: "flex",
              alignItems:
                "center",
              justifyContent:
                "center",
              padding: "20px",
              zIndex: 1000,
            }}
          >
            <div
              onClick={(e) =>
                e.stopPropagation()
              }
              style={{
                width: "100%",
                maxWidth: "750px",
                maxHeight:
                  "90vh",
                overflowY:
                  "auto",
                background:
                  "#ffffff",
                borderRadius:
                  "16px",
                padding: "28px",
              }}
            >
              <div
                style={{
                  display:
                    "flex",
                  justifyContent:
                    "space-between",
                  alignItems:
                    "center",
                  marginBottom:
                    "25px",
                }}
              >
                <div>
                  <h2
                    style={{
                      margin: 0,
                    }}
                  >
                    {editingId
                      ? "Edit Examination"
                      : "Add Examination"}
                  </h2>

                  <p
                    style={{
                      color:
                        "#64748b",
                      margin:
                        "7px 0 0",
                    }}
                  >
                    Enter examination
                    details.
                  </p>
                </div>

                <button
                  onClick={
                    closeModal
                  }
                  disabled={saving}
                  style={{
                    border:
                      "none",
                    background:
                      "#f1f5f9",
                    fontSize:
                      "22px",
                    width:
                      "38px",
                    height:
                      "38px",
                    borderRadius:
                      "8px",
                    cursor:
                      "pointer",
                  }}
                >
                  ×
                </button>
              </div>

              <form
                onSubmit={
                  handleSubmit
                }
              >
                <div
                  style={{
                    display:
                      "grid",
                    gridTemplateColumns:
                      "1fr 1fr",
                    gap: "18px",
                  }}
                >
                  <FormField
                    label="Student Name *"
                  >
                    <input
                      name="studentName"
                      value={
                        form.studentName
                      }
                      onChange={
                        handleChange
                      }
                      required
                      placeholder="Enter student name"
                      style={
                        inputStyle
                      }
                    />
                  </FormField>

                  <FormField
                    label="Roll Number *"
                  >
                    <input
                      name="rollNumber"
                      value={
                        form.rollNumber
                      }
                      onChange={
                        handleChange
                      }
                      required
                      placeholder="Enter roll number"
                      style={
                        inputStyle
                      }
                    />
                  </FormField>

                  <FormField
                    label="Examination Name *"
                  >
                    <input
                      name="examName"
                      value={
                        form.examName
                      }
                      onChange={
                        handleChange
                      }
                      required
                      placeholder="e.g. Mid Term"
                      style={
                        inputStyle
                      }
                    />
                  </FormField>

                  <FormField
                    label="Subject *"
                  >
                    <input
                      name="subject"
                      value={
                        form.subject
                      }
                      onChange={
                        handleChange
                      }
                      required
                      placeholder="e.g. Mathematics"
                      style={
                        inputStyle
                      }
                    />
                  </FormField>

                  <FormField
                    label="Exam Date *"
                  >
                    <input
                      type="date"
                      name="examDate"
                      value={
                        form.examDate
                      }
                      onChange={
                        handleChange
                      }
                      required
                      style={
                        inputStyle
                      }
                    />
                  </FormField>

                  <FormField
                    label="Room Number"
                  >
                    <input
                      name="roomNumber"
                      value={
                        form.roomNumber
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="e.g. Room 101"
                      style={
                        inputStyle
                      }
                    />
                  </FormField>

                  <FormField
                    label="Start Time"
                  >
                    <input
                      type="time"
                      name="startTime"
                      value={
                        form.startTime
                      }
                      onChange={
                        handleChange
                      }
                      style={
                        inputStyle
                      }
                    />
                  </FormField>

                  <FormField
                    label="End Time"
                  >
                    <input
                      type="time"
                      name="endTime"
                      value={
                        form.endTime
                      }
                      onChange={
                        handleChange
                      }
                      style={
                        inputStyle
                      }
                    />
                  </FormField>

                  <FormField
                    label="Total Marks"
                  >
                    <input
                      type="number"
                      name="totalMarks"
                      value={
                        form.totalMarks
                      }
                      onChange={
                        handleChange
                      }
                      min="1"
                      style={
                        inputStyle
                      }
                    />
                  </FormField>

                  <FormField
                    label="Status"
                  >
                    <select
                      name="status"
                      value={
                        form.status
                      }
                      onChange={
                        handleChange
                      }
                      style={
                        inputStyle
                      }
                    >
                      <option value="Scheduled">
                        Scheduled
                      </option>

                      <option value="Completed">
                        Completed
                      </option>

                      <option value="Cancelled">
                        Cancelled
                      </option>
                    </select>
                  </FormField>

                  <div
                    style={{
                      gridColumn:
                        "1 / -1",
                    }}
                  >
                    <FormField
                      label="Remarks"
                    >
                      <textarea
                        name="remarks"
                        value={
                          form.remarks
                        }
                        onChange={
                          handleChange
                        }
                        rows="4"
                        placeholder="Enter remarks"
                        style={{
                          ...inputStyle,
                          resize:
                            "vertical",
                        }}
                      />
                    </FormField>
                  </div>
                </div>

                <div
                  style={{
                    display:
                      "flex",
                    justifyContent:
                      "flex-end",
                    gap: "12px",
                    marginTop:
                      "25px",
                  }}
                >
                  <button
                    type="button"
                    onClick={
                      closeModal
                    }
                    disabled={saving}
                    style={{
                      border:
                        "1px solid #cbd5e1",
                      background:
                        "#ffffff",
                      padding:
                        "11px 18px",
                      borderRadius:
                        "8px",
                      cursor:
                        "pointer",
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    style={{
                      border:
                        "none",
                      background:
                        "#2563eb",
                      color:
                        "#ffffff",
                      padding:
                        "11px 20px",
                      borderRadius:
                        "8px",
                      fontWeight:
                        "600",
                      cursor:
                        "pointer",
                    }}
                  >
                    {saving
                      ? "Saving..."
                      : editingId
                      ? "Update Examination"
                      : "Add Examination"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
    </div>
  );
}

// =====================================================
// STAT CARD
// =====================================================

function StatCard({
  title,
  value,
  color,
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "14px",
        padding: "22px",
      }}
    >
      <div
        style={{
          color: "#64748b",
          fontSize: "14px",
          marginBottom: "10px",
        }}
      >
        {title}
      </div>

      <strong
        style={{
          color,
          fontSize: "28px",
        }}
      >
        {value}
      </strong>
    </div>
  );
}

// =====================================================
// FORM FIELD
// =====================================================

function FormField({
  label,
  children,
}) {
  return (
    <div>
      <label
        style={{
          display: "block",
          marginBottom: "7px",
          fontWeight: "600",
          fontSize: "14px",
          color: "#334155",
        }}
      >
        {label}
      </label>

      {children}
    </div>
  );
}

// =====================================================
// STYLES
// =====================================================

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "11px 13px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  outline: "none",
  fontSize: "14px",
};

const tableHeaderStyle = {
  padding: "15px",
  borderBottom:
    "1px solid #e2e8f0",
  color: "#64748b",
  fontSize: "12px",
  fontWeight: "700",
  whiteSpace: "nowrap",
};

const tableCellStyle = {
  padding: "16px 15px",
  borderBottom:
    "1px solid #e2e8f0",
  color: "#334155",
  fontSize: "14px",
};

export default Examinations;