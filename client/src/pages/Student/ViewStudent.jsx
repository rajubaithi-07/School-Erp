import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../../styles/students.css";

function ViewStudent() {
  const { id } = useParams();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================================
  // FETCH STUDENT
  // =========================================================

  const fetchStudent = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `http://localhost:5000/api/students/${id}`
      );

      if (!response.ok) {
        throw new Error(
          `Server returned ${response.status}`
        );
      }

      const result = await response.json();

      const studentData =
        result.student ||
        result.data ||
        result;

      setStudent(studentData);
    } catch (err) {
      console.error("View Student Error:", err);

      setError(
        "Unable to load student details. Please check the server."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, [id]);

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="student-page">

        <div className="student-panel">

          <div className="student-loading">

            <div className="loading-spinner"></div>

            <h3>
              Loading Student...
            </h3>

            <p>
              Please wait while we fetch
              the student details.
            </p>

          </div>

        </div>

      </div>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error) {
    return (
      <div className="student-page">

        <div className="student-panel">

          <div className="student-error">

            <div className="student-error-icon">
              ⚠️
            </div>

            <h3>
              Unable to Load Student
            </h3>

            <p>
              {error}
            </p>

            <Link
              to="/admin/students"
              className="student-cancel-btn"
            >
              ← Back to Students
            </Link>

          </div>

        </div>

      </div>
    );
  }

  // =========================================================
  // STUDENT NOT FOUND
  // =========================================================

  if (!student) {
    return (
      <div className="student-page">

        <div className="student-panel">

          <div className="no-students">

            <div className="no-students-icon">
              🎓
            </div>

            <h3>
              Student Not Found
            </h3>

            <p>
              The requested student record
              does not exist.
            </p>

            <Link
              to="/admin/students"
              className="add-first-student-btn"
            >
              ← Back to Students
            </Link>

          </div>

        </div>

      </div>
    );
  }

  // =========================================================
  // STUDENT DATA
  // =========================================================

  const studentName =
    student.name ||
    student.fullName ||
    "Unknown Student";

  const firstLetter = studentName
    .charAt(0)
    .toUpperCase();

  const studentId =
    student._id ||
    student.id ||
    "-";

  const semester = student.semester
    ? `Semester ${student.semester}`
    : "-";

  const phone =
    student.phone ||
    student.mobile ||
    "-";

  // =========================================================
  // MAIN PAGE
  // =========================================================

  return (
    <div className="student-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="student-page-header">

        <div>

          <span className="page-label">
            STUDENT MANAGEMENT
          </span>

          <h1>
            Student Details
          </h1>

          <p>
            View complete information about
            the registered student.
          </p>

        </div>

        <Link
          to="/admin/students"
          className="student-back-btn"
        >
          ← Back to Students
        </Link>

      </div>


      {/* =====================================================
          STUDENT PROFILE CARD
      ===================================================== */}

      <div className="student-profile-card">

        {/* ===================================================
            PROFILE HEADER
        =================================================== */}

        <div className="student-profile-header">

          <div className="student-profile-avatar">
            {firstLetter}
          </div>

          <div className="student-profile-title">

            <h2>
              {studentName}
            </h2>

            <p>
              {student.department ||
                "Department not available"}
            </p>

          </div>

        </div>


        {/* ===================================================
            BASIC INFORMATION
        =================================================== */}

        <div className="student-details-section">

          <h3>
            Basic Information
          </h3>

          <div className="student-details-grid">

            <div className="student-detail-item">

              <span>
                FULL NAME
              </span>

              <strong>
                {studentName}
              </strong>

            </div>


            <div className="student-detail-item">

              <span>
                ROLL NUMBER
              </span>

              <strong>
                {student.rollNumber || "-"}
              </strong>

            </div>


            <div className="student-detail-item">

              <span>
                EMAIL
              </span>

              <strong>
                {student.email || "-"}
              </strong>

            </div>


            <div className="student-detail-item">

              <span>
                PHONE
              </span>

              <strong>
                {phone}
              </strong>

            </div>


            <div className="student-detail-item">

              <span>
                DEPARTMENT
              </span>

              <strong>
                {student.department || "-"}
              </strong>

            </div>


            <div className="student-detail-item">

              <span>
                SEMESTER
              </span>

              <strong>
                {semester}
              </strong>

            </div>

          </div>

        </div>


        {/* ===================================================
            ACADEMIC INFORMATION
        =================================================== */}

        <div className="student-details-section">

          <h3>
            Academic Information
          </h3>

          <div className="student-details-grid">

            <div className="student-detail-item">

              <span>
                DEPARTMENT
              </span>

              <strong>
                {student.department || "-"}
              </strong>

            </div>


            <div className="student-detail-item">

              <span>
                SEMESTER
              </span>

              <strong>
                {semester}
              </strong>

            </div>


            <div className="student-detail-item">

              <span>
                STUDENT ID
              </span>

              <strong className="student-id-value">
                {studentId}
              </strong>

            </div>


            <div className="student-detail-item">

              <span>
                STATUS
              </span>

              <strong className="student-status-active">
                Active
              </strong>

            </div>

          </div>

        </div>


        {/* ===================================================
            ACTIONS
        =================================================== */}

        <div className="student-profile-actions">

          <Link
            to="/admin/students"
            className="student-cancel-btn"
          >
            ← Back
          </Link>

          <Link
            to={`/admin/students/edit/${studentId}`}
            className="student-edit-profile-btn"
          >
            Edit Student
          </Link>

        </div>

      </div>

    </div>
  );
}

export default ViewStudent;