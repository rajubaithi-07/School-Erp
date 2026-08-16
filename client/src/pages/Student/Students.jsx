import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../styles/students.css";

const API_URL = "http://localhost:5000/api/students";

function Students() {
  const navigate = useNavigate();
  const location = useLocation();

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  // =========================================================
  // PORTAL ACCESS
  // =========================================================

  const isParent = location.pathname.startsWith("/parent");
  const isFaculty = location.pathname.startsWith("/faculty");
  const isStudent = location.pathname.startsWith("/student");

  // Only Admin gets Add / Edit / Delete access
  const isAdmin = location.pathname.startsWith("/admin");

  // Parent, Faculty and Student are VIEW ONLY
  const isReadOnly =
    isParent ||
    isFaculty ||
    isStudent;

  // =========================================================
  // FETCH STUDENTS
  // =========================================================

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to fetch students"
        );
      }

      const studentList =
        result.students ||
        result.data ||
        [];

      setStudents(
        Array.isArray(studentList)
          ? studentList
          : []
      );
    } catch (err) {
      console.error(
        "Fetch Students Error:",
        err
      );

      setError(
        err.message ||
          "Unable to load students. Please make sure the server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    fetchStudents();
  }, []);

  // =========================================================
  // SEARCH
  // =========================================================

  const filteredStudents = useMemo(() => {
    const value = search
      .trim()
      .toLowerCase();

    if (!value) {
      return students;
    }

    return students.filter((student) => {
      return (
        String(student.name || "")
          .toLowerCase()
          .includes(value) ||

        String(student.rollNumber || "")
          .toLowerCase()
          .includes(value) ||

        String(student.email || "")
          .toLowerCase()
          .includes(value) ||

        String(student.department || "")
          .toLowerCase()
          .includes(value) ||

        String(student.semester || "")
          .toLowerCase()
          .includes(value)
      );
    });
  }, [students, search]);

  // =========================================================
  // DELETE MODAL
  // =========================================================

  const openDeleteModal = (student) => {
    // Safety check
    if (!isAdmin) {
      return;
    }

    setSelectedStudent(student);
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    if (deleting) {
      return;
    }

    setDeleteModal(false);
    setSelectedStudent(null);
  };

  // =========================================================
  // DELETE STUDENT
  // ADMIN ONLY
  // =========================================================

  const deleteStudent = async () => {
    if (!isAdmin) {
      return;
    }

    if (!selectedStudent) {
      return;
    }

    const studentId =
      selectedStudent._id ||
      selectedStudent.id;

    if (!studentId) {
      alert("Student ID not found.");
      return;
    }

    try {
      setDeleting(true);

      const response = await fetch(
        `${API_URL}/${studentId}`,
        {
          method: "DELETE",
        }
      );

      let result = {};

      try {
        result = await response.json();
      } catch {
        result = {};
      }

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to delete student."
        );
      }

      const deletedName =
        selectedStudent.name ||
        "Student";

      setStudents((previousStudents) =>
        previousStudents.filter(
          (student) =>
            (student._id || student.id) !==
            studentId
        )
      );

      setDeleteModal(false);
      setSelectedStudent(null);

      setSuccessMessage(
        `${deletedName} was deleted successfully.`
      );

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (err) {
      console.error(
        "Delete Student Error:",
        err
      );

      alert(
        err.message ||
          "Failed to delete student."
      );
    } finally {
      setDeleting(false);
    }
  };

  // =========================================================
  // STUDENT NAME
  // =========================================================

  const getStudentName = (student) => {
    return (
      student.name ||
      student.fullName ||
      "Unknown Student"
    );
  };

  // =========================================================
  // VIEW STUDENT
  // =========================================================

  const handleView = (student) => {
    const studentId =
      student._id ||
      student.id;

    // Admin can use the existing detail page
    if (isAdmin) {
      navigate(
        `/admin/students/${studentId}`
      );
      return;
    }

    // Parent / Faculty / Student = View Only
    alert(
      `Student Details\n\n` +
        `Name: ${
          getStudentName(student)
        }\n` +
        `Roll Number: ${
          student.rollNumber || "-"
        }\n` +
        `Email: ${
          student.email || "-"
        }\n` +
        `Department: ${
          student.department || "-"
        }\n` +
        `Semester: ${
          student.semester
            ? `Semester ${student.semester}`
            : "-"
        }`
    );
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="student-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="student-page-header">

        <div>
          <span className="page-label">
            STUDENT MANAGEMENT
          </span>

          <h1>
            {isParent
              ? "My Child"
              : "Students"}
          </h1>

          <p>
            {isParent
              ? "View student profile and academic information."
              : isFaculty
              ? "View student profiles and academic information."
              : isStudent
              ? "View student information."
              : "Manage student profiles, academic records and information."}
          </p>
        </div>

        {/* =================================================
            ADMIN ONLY - ADD STUDENT
        ================================================= */}

        {isAdmin && (
          <Link
            to="/admin/students/add"
            className="add-student-btn"
          >
            + Add Student
          </Link>
        )}

      </div>

      {/* =====================================================
          SUCCESS MESSAGE
      ===================================================== */}

      {successMessage && (
        <div className="student-success-message">

          <span className="success-message-icon">
            ✓
          </span>

          <span>
            {successMessage}
          </span>

        </div>
      )}

      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <div className="student-stats">

        <div className="student-stat-card">

          <div className="student-stat-icon">
            🎓
          </div>

          <div>
            <span>
              Total Students
            </span>

            <h2>
              {students.length}
            </h2>
          </div>

        </div>

        <div className="student-stat-card">

          <div className="student-stat-icon">
            👨‍🎓
          </div>

          <div>
            <span>
              Showing
            </span>

            <h2>
              {filteredStudents.length}
            </h2>
          </div>

        </div>

      </div>

      {/* =====================================================
          STUDENT PANEL
      ===================================================== */}

      <div className="student-panel">

        <div className="student-panel-header">

          <div>
            <h2>
              Student Records
            </h2>

            <p>
              {isParent
                ? "View registered student information."
                : isReadOnly
                ? "View student information."
                : "View and manage registered students."}
            </p>
          </div>

          {/* SEARCH */}

          <div className="student-search">

            <span className="search-icon">
              🔍
            </span>

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search students..."
            />

          </div>

        </div>

        {/* =====================================================
            LOADING
        ===================================================== */}

        {loading && (
          <div className="student-loading">

            <div className="loading-spinner"></div>

            <h3>
              Loading Students...
            </h3>

            <p>
              Please wait while we fetch
              student records.
            </p>

          </div>
        )}

        {/* =====================================================
            ERROR
        ===================================================== */}

        {!loading && error && (
          <div className="student-error">

            <div className="student-error-icon">
              ⚠️
            </div>

            <h3>
              Unable to Load Students
            </h3>

            <p>
              {error}
            </p>

            <button
              onClick={fetchStudents}
              className="retry-btn"
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
          filteredStudents.length === 0 && (

            <div className="no-students">

              <div className="no-students-icon">
                🎓
              </div>

              <h3>
                {search
                  ? "No Matching Students"
                  : "No Students Found"}
              </h3>

              <p>
                {search
                  ? "Try another search."
                  : "There are no student records yet."}
              </p>

              {/* ADMIN ONLY */}

              {isAdmin && !search && (
                <Link
                  to="/admin/students/add"
                  className="add-first-student-btn"
                >
                  + Add First Student
                </Link>
              )}

            </div>
          )}

        {/* =====================================================
            STUDENT TABLE
        ===================================================== */}

        {!loading &&
          !error &&
          filteredStudents.length > 0 && (

            <div className="student-table-wrapper">

              <table className="student-table">

                <thead>

                  <tr>

                    <th>
                      #
                    </th>

                    <th>
                      Name
                    </th>

                    <th>
                      Roll Number
                    </th>

                    <th>
                      Email
                    </th>

                    <th>
                      Department
                    </th>

                    <th>
                      Semester
                    </th>

                    <th>
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredStudents.map(
                    (student, index) => {

                      const studentId =
                        student._id ||
                        student.id;

                      const studentName =
                        getStudentName(
                          student
                        );

                      const firstLetter =
                        studentName
                          .charAt(0)
                          .toUpperCase();

                      return (
                        <tr
                          key={
                            studentId ||
                            index
                          }
                        >

                          {/* NUMBER */}

                          <td>
                            {index + 1}
                          </td>

                          {/* NAME */}

                          <td>

                            <div className="student-name">

                              <div className="student-avatar">
                                {firstLetter}
                              </div>

                              <strong>
                                {studentName}
                              </strong>

                            </div>

                          </td>

                          {/* ROLL NUMBER */}

                          <td>
                            {student.rollNumber ||
                              "-"}
                          </td>

                          {/* EMAIL */}

                          <td>
                            {student.email ||
                              "-"}
                          </td>

                          {/* DEPARTMENT */}

                          <td>
                            {student.department ||
                              "-"}
                          </td>

                          {/* SEMESTER */}

                          <td>
                            {student.semester
                              ? `Semester ${student.semester}`
                              : "-"}
                          </td>

                          {/* ACTIONS */}

                          <td>

                            <div className="student-actions">

                              {/* VIEW - EVERYONE */}

                              <button
                                className="view-btn"
                                onClick={() =>
                                  handleView(
                                    student
                                  )
                                }
                              >
                                View
                              </button>

                              {/* =================================================
                                  ADMIN ONLY
                              ================================================= */}

                              {isAdmin && (
                                <>
                                  <button
                                    className="edit-btn"
                                    onClick={() =>
                                      navigate(
                                        `/admin/students/edit/${studentId}`
                                      )
                                    }
                                  >
                                    Edit
                                  </button>

                                  <button
                                    className="delete-btn"
                                    onClick={() =>
                                      openDeleteModal(
                                        student
                                      )
                                    }
                                  >
                                    Delete
                                  </button>
                                </>
                              )}

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
          DELETE CONFIRMATION MODAL
          ADMIN ONLY
      ===================================================== */}

      {isAdmin &&
        deleteModal &&
        selectedStudent && (

          <div
            className="delete-modal-overlay"
            onClick={
              closeDeleteModal
            }
          >

            <div
              className="delete-modal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <div className="delete-modal-icon">
                ⚠️
              </div>

              <h2>
                Delete Student?
              </h2>

              <p>
                Are you sure you want to delete
                <strong>
                  {" "}
                  {getStudentName(
                    selectedStudent
                  )}
                </strong>
                ?
              </p>

              <span className="delete-warning-text">
                This action cannot be undone.
              </span>

              <div className="delete-modal-actions">

                <button
                  type="button"
                  className="delete-cancel-btn"
                  onClick={
                    closeDeleteModal
                  }
                  disabled={deleting}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="delete-confirm-btn"
                  onClick={
                    deleteStudent
                  }
                  disabled={deleting}
                >
                  {deleting
                    ? "Deleting..."
                    : "Yes, Delete"}
                </button>

              </div>

            </div>

          </div>
        )}

    </div>
  );
}

export default Students;