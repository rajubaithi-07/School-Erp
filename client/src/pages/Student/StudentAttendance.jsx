import { useEffect, useMemo, useState } from "react";

function StudentAttendance() {
  const [attendance, setAttendance] = useState([]);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // GET LOGGED-IN STUDENT
  // =====================================================

  useEffect(() => {
    try {
      const storedStudent =
        localStorage.getItem("student");

      if (!storedStudent) {
        setError(
          "Student session not found. Please login again."
        );
        setLoading(false);
        return;
      }

      const parsedStudent =
        JSON.parse(storedStudent);

      setStudent(parsedStudent);
    } catch (err) {
      console.error(
        "Student Session Error:",
        err
      );

      setError(
        "Unable to read student session."
      );

      setLoading(false);
    }
  }, []);

  // =====================================================
  // FETCH ATTENDANCE
  // =====================================================

  useEffect(() => {
    if (!student) {
      return;
    }

    const fetchAttendance = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/attendance"
        );

        const result =
          await response.json();

        if (!response.ok) {
          throw new Error(
            result.message ||
              "Failed to fetch attendance"
          );
        }

        setAttendance(
          result.attendance || []
        );
      } catch (err) {
        console.error(
          "Attendance Fetch Error:",
          err
        );

        setError(
          err.message ||
            "Unable to load attendance."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [student]);

  // =====================================================
  // FILTER LOGGED-IN STUDENT
  // =====================================================

  const studentAttendance = useMemo(() => {
    if (!student) {
      return [];
    }

    const rollNumber = String(
      student.rollNumber || ""
    )
      .trim()
      .toLowerCase();

    return attendance.filter(
      (record) =>
        String(
          record.rollNumber || ""
        )
          .trim()
          .toLowerCase() === rollNumber
    );
  }, [attendance, student]);

  // =====================================================
  // STATISTICS
  // =====================================================

  const statistics = useMemo(() => {
    const total =
      studentAttendance.length;

    const present =
      studentAttendance.filter(
        (record) =>
          record.status === "Present"
      ).length;

    const absent =
      studentAttendance.filter(
        (record) =>
          record.status === "Absent"
      ).length;

    const late =
      studentAttendance.filter(
        (record) =>
          record.status === "Late"
      ).length;

    const leave =
      studentAttendance.filter(
        (record) =>
          record.status === "Leave"
      ).length;

    const percentage =
      total > 0
        ? ((present / total) * 100).toFixed(1)
        : "0.0";

    return {
      total,
      present,
      absent,
      late,
      leave,
      percentage,
    };
  }, [studentAttendance]);

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div
        style={{
          background: "#f1f5f9",
          padding: "10px 0",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            padding: "60px",
            textAlign: "center",
          }}
        >
          <h2>
            Loading Attendance...
          </h2>

          <p
            style={{
              color: "#64748b",
            }}
          >
            Please wait while we fetch your
            attendance records.
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <div
        style={{
          background: "#f1f5f9",
          padding: "10px 0",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            padding: "50px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "45px",
              marginBottom: "15px",
            }}
          >
            ⚠️
          </div>

          <h2>
            Unable to Load Attendance
          </h2>

          <p
            style={{
              color: "#64748b",
            }}
          >
            {error}
          </p>

          <button
            onClick={() =>
              window.location.reload()
            }
            style={{
              marginTop: "20px",
              padding: "12px 25px",
              background: "#2563eb",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // =====================================================
  // MAIN PAGE
  // =====================================================

  return (
    <div>
      {/* PAGE HEADER */}

      <div
        style={{
          marginBottom: "25px",
        }}
      >
        <div
          style={{
            color: "#2563eb",
            fontSize: "14px",
            fontWeight: "700",
            letterSpacing: "1px",
            marginBottom: "8px",
          }}
        >
          STUDENT PORTAL
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: "32px",
            color: "#111827",
          }}
        >
          🗓️ Attendance
        </h1>

        <p
          style={{
            color: "#64748b",
            marginTop: "8px",
          }}
        >
          View your attendance records and
          attendance percentage.
        </p>
      </div>

      {/* STUDENT INFORMATION */}

      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          padding: "25px",
          marginBottom: "25px",
          boxShadow:
            "0 5px 20px rgba(0,0,0,0.05)",
        }}
      >
        <h3
          style={{
            marginTop: 0,
            marginBottom: "25px",
          }}
        >
          {student?.name ||
            student?.studentName ||
            "Student"}
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(3, 1fr)",
            gap: "30px",
          }}
        >
          <div>
            <span
              style={{
                color: "#64748b",
                fontSize: "13px",
              }}
            >
              Roll Number
            </span>

            <strong
              style={{
                display: "block",
                marginTop: "8px",
                fontSize: "17px",
              }}
            >
              🎓 {student?.rollNumber || "-"}
            </strong>
          </div>

          <div>
            <span
              style={{
                color: "#64748b",
                fontSize: "13px",
              }}
            >
              Department
            </span>

            <strong
              style={{
                display: "block",
                marginTop: "8px",
                fontSize: "17px",
              }}
            >
              📚 {student?.department || "-"}
            </strong>
          </div>

          <div>
            <span
              style={{
                color: "#64748b",
                fontSize: "13px",
              }}
            >
              Semester
            </span>

            <strong
              style={{
                display: "block",
                marginTop: "8px",
                fontSize: "17px",
              }}
            >
              📖 {student?.semester || "-"}
            </strong>
          </div>
        </div>
      </div>

      {/* STATISTICS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(5, 1fr)",
          gap: "18px",
          marginBottom: "25px",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            padding: "22px",
            borderRadius: "14px",
          }}
        >
          <span style={{ color: "#64748b" }}>
            Attendance %
          </span>

          <h2
            style={{
              color: "#2563eb",
              marginBottom: 0,
            }}
          >
            {statistics.percentage}%
          </h2>
        </div>

        <div
          style={{
            background: "#ffffff",
            padding: "22px",
            borderRadius: "14px",
          }}
        >
          <span style={{ color: "#64748b" }}>
            Total Classes
          </span>

          <h2 style={{ marginBottom: 0 }}>
            {statistics.total}
          </h2>
        </div>

        <div
          style={{
            background: "#ffffff",
            padding: "22px",
            borderRadius: "14px",
          }}
        >
          <span style={{ color: "#64748b" }}>
            Present
          </span>

          <h2
            style={{
              color: "#16a34a",
              marginBottom: 0,
            }}
          >
            {statistics.present}
          </h2>
        </div>

        <div
          style={{
            background: "#ffffff",
            padding: "22px",
            borderRadius: "14px",
          }}
        >
          <span style={{ color: "#64748b" }}>
            Absent
          </span>

          <h2
            style={{
              color: "#dc2626",
              marginBottom: 0,
            }}
          >
            {statistics.absent}
          </h2>
        </div>

        <div
          style={{
            background: "#ffffff",
            padding: "22px",
            borderRadius: "14px",
          }}
        >
          <span style={{ color: "#64748b" }}>
            Late
          </span>

          <h2
            style={{
              color: "#d97706",
              marginBottom: 0,
            }}
          >
            {statistics.late}
          </h2>
        </div>
      </div>

      {/* ATTENDANCE RECORDS */}

      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "25px",
            borderBottom:
              "1px solid #e2e8f0",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "20px",
            }}
          >
            Attendance Records
          </h2>

          <p
            style={{
              color: "#64748b",
              marginBottom: 0,
            }}
          >
            Your recorded attendance history.
          </p>
        </div>

        {studentAttendance.length === 0 ? (
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
              🗓️
            </div>

            <h3>
              No Attendance Records
            </h3>

            <p
              style={{
                color: "#64748b",
              }}
            >
              No attendance records were found
              for your roll number.
            </p>
          </div>
        ) : (
          <div
            style={{
              overflowX: "auto",
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
                    background: "#f8fafc",
                    textAlign: "left",
                  }}
                >
                  <th style={cellStyle}>
                    DATE
                  </th>

                  <th style={cellStyle}>
                    STATUS
                  </th>

                  <th style={cellStyle}>
                    CLASS
                  </th>

                  <th style={cellStyle}>
                    DEPARTMENT
                  </th>

                  <th style={cellStyle}>
                    REMARKS
                  </th>
                </tr>
              </thead>

              <tbody>
                {studentAttendance.map(
                  (record, index) => {
                    let statusColor =
                      "#64748b";

                    let statusBackground =
                      "#f1f5f9";

                    if (
                      record.status ===
                      "Present"
                    ) {
                      statusColor =
                        "#166534";
                      statusBackground =
                        "#dcfce7";
                    }

                    if (
                      record.status ===
                      "Absent"
                    ) {
                      statusColor =
                        "#991b1b";
                      statusBackground =
                        "#fee2e2";
                    }

                    if (
                      record.status ===
                      "Late"
                    ) {
                      statusColor =
                        "#92400e";
                      statusBackground =
                        "#fef3c7";
                    }

                    if (
                      record.status ===
                      "Leave"
                    ) {
                      statusColor =
                        "#1e40af";
                      statusBackground =
                        "#dbeafe";
                    }

                    return (
                      <tr
                        key={
                          record._id ||
                          record.id ||
                          index
                        }
                      >
                        <td style={cellStyle}>
                          {formatDate(
                            record.date
                          )}
                        </td>

                        <td style={cellStyle}>
                          <span
                            style={{
                              padding:
                                "6px 12px",
                              borderRadius:
                                "20px",
                              background:
                                statusBackground,
                              color:
                                statusColor,
                              fontWeight:
                                "600",
                              fontSize:
                                "13px",
                            }}
                          >
                            {record.status ||
                              "-"}
                          </span>
                        </td>

                        <td style={cellStyle}>
                          {record.className ||
                            "-"}
                        </td>

                        <td style={cellStyle}>
                          {record.department ||
                            "-"}
                        </td>

                        <td style={cellStyle}>
                          {record.remarks ||
                            "-"}
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
    </div>
  );
}

const cellStyle = {
  padding: "16px",
  borderBottom:
    "1px solid #e2e8f0",
};

export default StudentAttendance;