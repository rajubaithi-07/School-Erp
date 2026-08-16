import { useEffect, useState } from "react";

function StudentDashboard() {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    try {
      const storedStudent = localStorage.getItem("student");

      if (storedStudent) {
        setStudent(JSON.parse(storedStudent));
      }
    } catch (error) {
      console.error("Student session error:", error);
    }
  }, []);

  const studentName = student?.name || student?.studentName || "Student";
  const rollNumber = student?.rollNumber || "-";
  const department = student?.department || "CSE";
  const semester = student?.semester || "Semester 1";
  const email = student?.email || "-";

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      {/* =====================================================
          WELCOME SECTION
      ===================================================== */}

      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          padding: "34px",
          marginBottom: "28px",
          boxShadow: "0 8px 25px rgba(15, 23, 42, 0.06)",
        }}
      >
        <div
          style={{
            color: "#2563eb",
            fontSize: "15px",
            fontWeight: "700",
            letterSpacing: "1px",
            marginBottom: "14px",
          }}
        >
          STUDENT PORTAL
        </div>

        <h1
          style={{
            margin: "0 0 12px",
            fontSize: "26px",
            fontWeight: "500",
            color: "#111827",
          }}
        >
          Welcome, {studentName} 👋
        </h1>

        <p
          style={{
            margin: 0,
            color: "#64748b",
            fontSize: "16px",
          }}
        >
          Here you can view your academic information,
          attendance, performance and examinations.
        </p>
      </div>

      {/* =====================================================
          STUDENT INFORMATION
      ===================================================== */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4, minmax(0, 1fr))",
          gap: "28px",
          marginBottom: "30px",
        }}
      >
        {/* Roll Number */}

        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#111827",
              fontSize: "16px",
              marginBottom: "10px",
            }}
          >
            <span>🎓</span>
            <span>Roll Number</span>
          </div>

          <div
            style={{
              color: "#475569",
              fontSize: "15px",
            }}
          >
            {rollNumber}
          </div>
        </div>

        {/* Department */}

        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#111827",
              fontSize: "16px",
              marginBottom: "10px",
            }}
          >
            <span>📚</span>
            <span>Department</span>
          </div>

          <div
            style={{
              color: "#475569",
              fontSize: "15px",
            }}
          >
            {department}
          </div>
        </div>

        {/* Semester */}

        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#111827",
              fontSize: "16px",
              marginBottom: "10px",
            }}
          >
            <span>📖</span>
            <span>Semester</span>
          </div>

          <div
            style={{
              color: "#475569",
              fontSize: "15px",
            }}
          >
            {semester}
          </div>
        </div>

        {/* Email */}

        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#111827",
              fontSize: "16px",
              marginBottom: "10px",
            }}
          >
            <span>📧</span>
            <span>Email</span>
          </div>

          <div
            style={{
              color: "#475569",
              fontSize: "15px",
              wordBreak: "break-word",
            }}
          >
            {email}
          </div>
        </div>
      </div>

      {/* =====================================================
          ACADEMIC DASHBOARD
      ===================================================== */}

      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          padding: "34px",
          boxShadow: "0 8px 25px rgba(15, 23, 42, 0.06)",
        }}
      >
        <div
          style={{
            color: "#2563eb",
            fontSize: "15px",
            fontWeight: "700",
            letterSpacing: "1px",
            marginBottom: "14px",
          }}
        >
          ACADEMIC DASHBOARD
        </div>

        <h2
          style={{
            margin: "0 0 12px",
            fontSize: "23px",
            fontWeight: "500",
            color: "#111827",
          }}
        >
          Your Student Portal
        </h2>

        <p
          style={{
            margin: 0,
            color: "#64748b",
            fontSize: "16px",
            lineHeight: "1.7",
          }}
        >
          Use the navigation menu on the left to access
          your attendance, performance, examinations,
          courses, activities and reports.
        </p>
      </div>
    </div>
  );
}

export default StudentDashboard;