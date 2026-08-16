import React from "react";
import { useLocation } from "react-router-dom";

const child = {
  name: "Manish",
  rollNumber: "224",
  department: "CSE",
  semester: "Semester 1",
  email: "manish@gmail.com",
};

const attendanceData = [
  {
    subject: "Mathematics",
    total: 30,
    present: 27,
    percentage: 90,
  },
  {
    subject: "Computer Science",
    total: 30,
    present: 28,
    percentage: 93,
  },
  {
    subject: "English",
    total: 28,
    present: 25,
    percentage: 89,
  },
  {
    subject: "Physics",
    total: 25,
    present: 22,
    percentage: 88,
  },
];

const performanceData = [
  {
    subject: "Mathematics",
    marks: 88,
    grade: "A",
  },
  {
    subject: "Computer Science",
    marks: 92,
    grade: "A+",
  },
  {
    subject: "English",
    marks: 84,
    grade: "A",
  },
  {
    subject: "Physics",
    marks: 79,
    grade: "B+",
  },
];

const examinationData = [
  {
    name: "Mid Term Examination",
    subject: "Mathematics",
    date: "20 Sep 2026",
    status: "Upcoming",
  },
  {
    name: "Mid Term Examination",
    subject: "Computer Science",
    date: "22 Sep 2026",
    status: "Upcoming",
  },
  {
    name: "Internal Assessment",
    subject: "English",
    date: "25 Sep 2026",
    status: "Upcoming",
  },
];

const feeData = [
  {
    type: "Tuition Fee",
    amount: "₹25,000",
    status: "Paid",
  },
  {
    type: "Examination Fee",
    amount: "₹2,000",
    status: "Paid",
  },
  {
    type: "Transport Fee",
    amount: "₹5,000",
    status: "Pending",
  },
];

function ParentPage() {
  const location = useLocation();

  const path = location.pathname;

  // =====================================================
  // PAGE INFORMATION
  // =====================================================

  let title = "Parent Portal";
  let eyebrow = "PARENT PORTAL";
  let description = "";
  let icon = "👨‍👩‍👦";

  if (path.includes("/child")) {
    title = "My Child";
    eyebrow = "STUDENT INFORMATION";
    description = "View your child's personal and academic information.";
    icon = "🎓";
  }

  if (path.includes("/attendance")) {
    title = "Attendance";
    eyebrow = "ATTENDANCE";
    description = "View your child's attendance records.";
    icon = "🗓️";
  }

  if (path.includes("/performance")) {
    title = "Performance";
    eyebrow = "ACADEMIC PERFORMANCE";
    description = "View your child's academic performance and grades.";
    icon = "📈";
  }

  if (path.includes("/examinations")) {
    title = "Examinations";
    eyebrow = "EXAMINATIONS";
    description = "View upcoming and completed examinations.";
    icon = "📄";
  }

  if (path.includes("/fees")) {
    title = "Fees";
    eyebrow = "FEE INFORMATION";
    description = "View your child's fee details and payment status.";
    icon = "💳";
  }

  if (path.includes("/reports")) {
    title = "Reports";
    eyebrow = "ACADEMIC REPORTS";
    description = "View academic reports and student records.";
    icon = "📋";
  }

  // =====================================================
  // COMMON STYLES
  // =====================================================

  const pageStyle = {
    minHeight: "100vh",
    background: "#f1f5f9",
    padding: "32px",
    boxSizing: "border-box",
  };

  const cardStyle = {
    background: "#ffffff",
    borderRadius: "18px",
    padding: "32px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 2px 10px rgba(15, 23, 42, 0.06)",
    marginBottom: "24px",
  };

  const headingStyle = {
    margin: 0,
    fontSize: "28px",
    color: "#0f172a",
  };

  const labelStyle = {
    display: "block",
    color: "#64748b",
    fontSize: "14px",
    marginBottom: "8px",
  };

  const valueStyle = {
    color: "#0f172a",
    fontSize: "17px",
    fontWeight: "600",
  };

  // =====================================================
  // MY CHILD
  // =====================================================

  const renderChild = () => (
    <>
      <div style={cardStyle}>
        <div
          style={{
            color: "#2563eb",
            fontWeight: "800",
            letterSpacing: "1.5px",
            marginBottom: "12px",
          }}
        >
          {eyebrow}
        </div>

        <h1 style={headingStyle}>
          {icon} {title}
        </h1>

        <p
          style={{
            color: "#64748b",
            fontSize: "16px",
            marginTop: "12px",
          }}
        >
          {description}
        </p>
      </div>

      <div style={cardStyle}>
        <h2
          style={{
            marginTop: 0,
            color: "#0f172a",
          }}
        >
          Student Details
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "28px",
            marginTop: "25px",
          }}
        >
          <div>
            <span style={labelStyle}>Student Name</span>
            <strong style={valueStyle}>{child.name}</strong>
          </div>

          <div>
            <span style={labelStyle}>Roll Number</span>
            <strong style={valueStyle}>
              {child.rollNumber}
            </strong>
          </div>

          <div>
            <span style={labelStyle}>Department</span>
            <strong style={valueStyle}>
              {child.department}
            </strong>
          </div>

          <div>
            <span style={labelStyle}>Semester</span>
            <strong style={valueStyle}>
              {child.semester}
            </strong>
          </div>

          <div>
            <span style={labelStyle}>Email</span>
            <strong style={valueStyle}>
              {child.email}
            </strong>
          </div>
        </div>
      </div>
    </>
  );

  // =====================================================
  // ATTENDANCE
  // =====================================================

  const renderAttendance = () => (
    <>
      <div style={cardStyle}>
        <div
          style={{
            color: "#2563eb",
            fontWeight: "800",
            letterSpacing: "1.5px",
            marginBottom: "12px",
          }}
        >
          {eyebrow}
        </div>

        <h1 style={headingStyle}>
          {icon} {title}
        </h1>

        <p style={{ color: "#64748b" }}>
          {description}
        </p>
      </div>

      <div style={cardStyle}>
        <h2>Attendance Records</h2>

        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
            }}
          >
            <thead>
              <tr>
                <th style={thStyle}>Subject</th>
                <th style={thStyle}>Total Classes</th>
                <th style={thStyle}>Present</th>
                <th style={thStyle}>Percentage</th>
              </tr>
            </thead>

            <tbody>
              {attendanceData.map((item) => (
                <tr key={item.subject}>
                  <td style={tdStyle}>{item.subject}</td>
                  <td style={tdStyle}>{item.total}</td>
                  <td style={tdStyle}>{item.present}</td>
                  <td style={tdStyle}>
                    <span
                      style={{
                        color:
                          item.percentage >= 75
                            ? "#15803d"
                            : "#dc2626",
                        fontWeight: "700",
                      }}
                    >
                      {item.percentage}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  // =====================================================
  // PERFORMANCE
  // =====================================================

  const renderPerformance = () => (
    <>
      <div style={cardStyle}>
        <div
          style={{
            color: "#2563eb",
            fontWeight: "800",
            letterSpacing: "1.5px",
            marginBottom: "12px",
          }}
        >
          {eyebrow}
        </div>

        <h1 style={headingStyle}>
          {icon} {title}
        </h1>

        <p style={{ color: "#64748b" }}>
          {description}
        </p>
      </div>

      <div style={cardStyle}>
        <h2>Academic Performance</h2>

        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
            }}
          >
            <thead>
              <tr>
                <th style={thStyle}>Subject</th>
                <th style={thStyle}>Marks</th>
                <th style={thStyle}>Grade</th>
              </tr>
            </thead>

            <tbody>
              {performanceData.map((item) => (
                <tr key={item.subject}>
                  <td style={tdStyle}>{item.subject}</td>
                  <td style={tdStyle}>{item.marks}</td>
                  <td style={tdStyle}>
                    <span
                      style={{
                        padding: "6px 12px",
                        borderRadius: "8px",
                        background: "#eff6ff",
                        color: "#2563eb",
                        fontWeight: "700",
                      }}
                    >
                      {item.grade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  // =====================================================
  // EXAMINATIONS
  // =====================================================

  const renderExaminations = () => (
    <>
      <div style={cardStyle}>
        <div
          style={{
            color: "#2563eb",
            fontWeight: "800",
            letterSpacing: "1.5px",
            marginBottom: "12px",
          }}
        >
          {eyebrow}
        </div>

        <h1 style={headingStyle}>
          {icon} {title}
        </h1>

        <p style={{ color: "#64748b" }}>
          {description}
        </p>
      </div>

      <div style={cardStyle}>
        <h2>Examination Schedule</h2>

        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
            }}
          >
            <thead>
              <tr>
                <th style={thStyle}>Examination</th>
                <th style={thStyle}>Subject</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>

            <tbody>
              {examinationData.map((item, index) => (
                <tr key={index}>
                  <td style={tdStyle}>{item.name}</td>
                  <td style={tdStyle}>{item.subject}</td>
                  <td style={tdStyle}>{item.date}</td>
                  <td style={tdStyle}>
                    <span
                      style={{
                        color: "#2563eb",
                        fontWeight: "700",
                      }}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  // =====================================================
  // FEES
  // =====================================================

  const renderFees = () => (
    <>
      <div style={cardStyle}>
        <div
          style={{
            color: "#2563eb",
            fontWeight: "800",
            letterSpacing: "1.5px",
            marginBottom: "12px",
          }}
        >
          {eyebrow}
        </div>

        <h1 style={headingStyle}>
          {icon} {title}
        </h1>

        <p style={{ color: "#64748b" }}>
          {description}
        </p>
      </div>

      <div style={cardStyle}>
        <h2>Fee Details</h2>

        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
            }}
          >
            <thead>
              <tr>
                <th style={thStyle}>Fee Type</th>
                <th style={thStyle}>Amount</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>

            <tbody>
              {feeData.map((item) => (
                <tr key={item.type}>
                  <td style={tdStyle}>{item.type}</td>
                  <td style={tdStyle}>{item.amount}</td>
                  <td style={tdStyle}>
                    <span
                      style={{
                        color:
                          item.status === "Paid"
                            ? "#15803d"
                            : "#dc2626",
                        fontWeight: "700",
                      }}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  // =====================================================
  // REPORTS
  // =====================================================

  const renderReports = () => (
    <>
      <div style={cardStyle}>
        <div
          style={{
            color: "#2563eb",
            fontWeight: "800",
            letterSpacing: "1.5px",
            marginBottom: "12px",
          }}
        >
          {eyebrow}
        </div>

        <h1 style={headingStyle}>
          {icon} {title}
        </h1>

        <p style={{ color: "#64748b" }}>
          {description}
        </p>
      </div>

      <div style={cardStyle}>
        <h2>Academic Reports</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <ReportCard
            title="Academic Report"
            description="View overall academic performance."
          />

          <ReportCard
            title="Attendance Report"
            description="View attendance summary."
          />

          <ReportCard
            title="Examination Report"
            description="View examination results."
          />
        </div>
      </div>
    </>
  );

  // =====================================================
  // RETURN PAGE
  // =====================================================

  return (
    <div style={pageStyle}>
      {path.includes("/child") && renderChild()}

      {path.includes("/attendance") &&
        renderAttendance()}

      {path.includes("/performance") &&
        renderPerformance()}

      {path.includes("/examinations") &&
        renderExaminations()}

      {path.includes("/fees") && renderFees()}

      {path.includes("/reports") && renderReports()}
    </div>
  );
}

// =====================================================
// TABLE STYLES
// =====================================================

const thStyle = {
  textAlign: "left",
  padding: "15px",
  background: "#f8fafc",
  color: "#475569",
  fontSize: "14px",
  borderBottom: "1px solid #e2e8f0",
};

const tdStyle = {
  padding: "16px 15px",
  color: "#334155",
  borderBottom: "1px solid #e2e8f0",
};

// =====================================================
// REPORT CARD
// =====================================================

function ReportCard({ title, description }) {
  return (
    <div
      style={{
        padding: "24px",
        border: "1px solid #dbe3ef",
        borderRadius: "14px",
        background: "#ffffff",
      }}
    >
      <div
        style={{
          fontSize: "30px",
          marginBottom: "15px",
        }}
      >
        📄
      </div>

      <h3
        style={{
          margin: "0 0 8px",
          color: "#0f172a",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          margin: 0,
          color: "#64748b",
        }}
      >
        {description}
      </p>
    </div>
  );
}

export default ParentPage;