import { useEffect, useMemo, useState } from "react";

function StudentPerformance() {
  const [student, setStudent] = useState(null);
  const [performances, setPerformances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL =
    "http://localhost:5000/api/performance";

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

      const studentData =
        JSON.parse(storedStudent);

      setStudent(studentData);
    } catch (err) {
      console.error(
        "Student Session Error:",
        err
      );

      setError(
        "Unable to load student information."
      );

      setLoading(false);
    }
  }, []);

  // =====================================================
  // FETCH PERFORMANCE
  // =====================================================

  useEffect(() => {
    if (!student) {
      return;
    }

    const loadPerformance = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await fetch(API_URL);

        const result =
          await response.json();

        if (!response.ok) {
          throw new Error(
            result.message ||
              "Failed to fetch performance"
          );
        }

        const allRecords =
          result.performances ||
          result.performance ||
          result.data ||
          [];

        const studentRecords =
          allRecords.filter(
            (record) =>
              String(
                record.rollNumber || ""
              )
                .trim()
                .toLowerCase() ===
              String(
                student.rollNumber || ""
              )
                .trim()
                .toLowerCase()
          );

        setPerformances(
          studentRecords
        );
      } catch (err) {
        console.error(
          "Student Performance Error:",
          err
        );

        setError(
          err.message ||
            "Unable to load performance records."
        );
      } finally {
        setLoading(false);
      }
    };

    loadPerformance();
  }, [student]);

  // =====================================================
  // STATISTICS
  // =====================================================

  const totalRecords =
    performances.length;

  const passed =
    performances.filter(
      (record) =>
        String(
          record.status || ""
        ).toLowerCase() === "pass"
    ).length;

  const failed =
    performances.filter(
      (record) =>
        String(
          record.status || ""
        ).toLowerCase() === "fail"
    ).length;

  const averagePercentage =
    useMemo(() => {
      if (performances.length === 0) {
        return "0.0";
      }

      let totalPercentage = 0;
      let validRecords = 0;

      performances.forEach(
        (record) => {
          const marks =
            Number(record.marks) || 0;

          const totalMarks =
            Number(record.totalMarks) || 0;

          if (totalMarks > 0) {
            totalPercentage +=
              (marks / totalMarks) * 100;

            validRecords++;
          }
        }
      );

      if (validRecords === 0) {
        return "0.0";
      }

      return (
        totalPercentage /
        validRecords
      ).toFixed(1);
    }, [performances]);

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
            padding: "60px",
            borderRadius: "16px",
            textAlign: "center",
          }}
        >
          <h2>
            Loading Performance...
          </h2>

          <p
            style={{
              color: "#64748b",
            }}
          >
            Please wait while we fetch your
            academic performance.
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
            padding: "50px",
            borderRadius: "16px",
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
            Unable to Load Performance
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
          }}
        >
          📈 Performance
        </h1>

        <p
          style={{
            color: "#64748b",
            marginTop: "8px",
          }}
        >
          View your examination marks,
          grades and academic performance.
        </p>
      </div>

      {/* STUDENT INFORMATION */}

      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          padding: "25px",
          marginBottom: "25px",
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
            "repeat(4, 1fr)",
          gap: "18px",
          marginBottom: "25px",
        }}
      >
        <div
          style={statCardStyle}
        >
          <span>
            Total Records
          </span>

          <h2>
            {totalRecords}
          </h2>
        </div>

        <div
          style={statCardStyle}
        >
          <span>
            Passed
          </span>

          <h2
            style={{
              color: "#16a34a",
            }}
          >
            {passed}
          </h2>
        </div>

        <div
          style={statCardStyle}
        >
          <span>
            Failed
          </span>

          <h2
            style={{
              color: "#dc2626",
            }}
          >
            {failed}
          </h2>
        </div>

        <div
          style={statCardStyle}
        >
          <span>
            Average
          </span>

          <h2
            style={{
              color: "#2563eb",
            }}
          >
            {averagePercentage}%
          </h2>
        </div>
      </div>

      {/* PERFORMANCE RECORDS */}

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
            }}
          >
            Performance Records
          </h2>

          <p
            style={{
              color: "#64748b",
              marginBottom: 0,
            }}
          >
            Your examination and academic
            performance history.
          </p>
        </div>

        {performances.length === 0 ? (
          <div
            style={{
              padding: "70px 20px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "50px",
              }}
            >
              📊
            </div>

            <h3>
              No Performance Records
            </h3>

            <p
              style={{
                color: "#64748b",
              }}
            >
              No performance records were
              found for your roll number.
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
                    Subject
                  </th>

                  <th style={cellStyle}>
                    Exam
                  </th>

                  <th style={cellStyle}>
                    Marks
                  </th>

                  <th style={cellStyle}>
                    Percentage
                  </th>

                  <th style={cellStyle}>
                    Grade
                  </th>

                  <th style={cellStyle}>
                    Status
                  </th>

                  <th style={cellStyle}>
                    Remarks
                  </th>
                </tr>
              </thead>

              <tbody>
                {performances.map(
                  (record, index) => {
                    const marks =
                      Number(
                        record.marks
                      ) || 0;

                    const totalMarks =
                      Number(
                        record.totalMarks
                      ) || 0;

                    const percentage =
                      totalMarks > 0
                        ? (
                            (marks /
                              totalMarks) *
                            100
                          ).toFixed(1)
                        : "0.0";

                    const isPass =
                      String(
                        record.status || ""
                      ).toLowerCase() ===
                      "pass";

                    return (
                      <tr
                        key={
                          record._id ||
                          record.id ||
                          index
                        }
                      >
                        <td style={cellStyle}>
                          <strong>
                            {record.subject ||
                              "-"}
                          </strong>
                        </td>

                        <td style={cellStyle}>
                          {record.examType ||
                            "-"}
                        </td>

                        <td style={cellStyle}>
                          <strong>
                            {marks}
                          </strong>
                          {" / "}
                          {totalMarks}
                        </td>

                        <td style={cellStyle}>
                          {percentage}%
                        </td>

                        <td style={cellStyle}>
                          <strong>
                            {record.grade ||
                              "-"}
                          </strong>
                        </td>

                        <td style={cellStyle}>
                          <span
                            style={{
                              padding:
                                "6px 12px",
                              borderRadius:
                                "20px",
                              background:
                                isPass
                                  ? "#dcfce7"
                                  : "#fee2e2",
                              color:
                                isPass
                                  ? "#166534"
                                  : "#991b1b",
                              fontWeight:
                                "600",
                            }}
                          >
                            {record.status ||
                              "-"}
                          </span>
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

const statCardStyle = {
  background: "#ffffff",
  padding: "22px",
  borderRadius: "14px",
};

const cellStyle = {
  padding: "16px",
  borderBottom:
    "1px solid #e2e8f0",
};

export default StudentPerformance;