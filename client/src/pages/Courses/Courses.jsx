import {
  useEffect,
  useMemo,
  useState,
} from "react";

import "../../styles/courses.css";

const API_URL =
  "http://localhost:5000/api/courses";

const emptyForm = {
  courseName: "",
  courseCode: "",
  description: "",
  department: "",
  teacherName: "",
  duration: "",
  status: "Active",
};

function Courses() {
  const [courses, setCourses] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);

  const [form, setForm] =
    useState({
      ...emptyForm,
    });

  // =====================================================
  // ROLE CHECK
  // =====================================================

  const isStudent =
    window.location.pathname.startsWith(
      "/student"
    );

  // =====================================================
  // LOAD COURSES
  // =====================================================

  const loadCourses = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await fetch(API_URL);

      if (!response.ok) {
        throw new Error(
          "Unable to load courses"
        );
      }

      const result =
        await response.json();

      const courseList =
        result.courses ||
        result.data ||
        [];

      setCourses(
        Array.isArray(courseList)
          ? courseList
          : []
      );
    } catch (err) {
      console.error(
        "Course API Error:",
        err
      );

      setError(
        "Unable to load courses. Please check that the server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  // =====================================================
  // SEARCH
  // =====================================================

  const filteredCourses =
    useMemo(() => {
      const value =
        search.toLowerCase().trim();

      if (!value) {
        return courses;
      }

      return courses.filter(
        (course) =>
          String(
            course.courseName || ""
          )
            .toLowerCase()
            .includes(value) ||

          String(
            course.courseCode || ""
          )
            .toLowerCase()
            .includes(value) ||

          String(
            course.department || ""
          )
            .toLowerCase()
            .includes(value) ||

          String(
            course.teacherName || ""
          )
            .toLowerCase()
            .includes(value)
      );
    }, [courses, search]);

  // =====================================================
  // STATISTICS
  // =====================================================

  const totalCourses =
    courses.length;

  const activeCourses =
    courses.filter(
      (course) =>
        course.status === "Active"
    ).length;

  const inactiveCourses =
    courses.filter(
      (course) =>
        course.status !== "Active"
    ).length;

  // =====================================================
  // FORM CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } =
      e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================================
  // OPEN ADD MODAL
  // =====================================================

  const openAddModal = () => {
    if (isStudent) {
      return;
    }

    setEditingId(null);

    setForm({
      ...emptyForm,
    });

    setShowModal(true);
  };

  // =====================================================
  // OPEN EDIT MODAL
  // =====================================================

  const openEditModal = (course) => {
    if (isStudent) {
      return;
    }

    setEditingId(
      course._id || course.id
    );

    setForm({
      courseName:
        course.courseName || "",

      courseCode:
        course.courseCode || "",

      description:
        course.description || "",

      department:
        course.department || "",

      teacherName:
        course.teacherName || "",

      duration:
        course.duration || "",

      status:
        course.status || "Active",
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
  // SAVE COURSE
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isStudent) {
      return;
    }

    if (!form.courseName.trim()) {
      alert(
        "Please enter course name."
      );
      return;
    }

    if (!form.courseCode.trim()) {
      alert(
        "Please enter course code."
      );
      return;
    }

    if (!form.department.trim()) {
      alert(
        "Please enter department."
      );
      return;
    }

    if (!form.teacherName.trim()) {
      alert(
        "Please enter teacher name."
      );
      return;
    }

    if (!form.duration.trim()) {
      alert(
        "Please enter course duration."
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

      const requestBody = {
        courseName:
          form.courseName.trim(),

        courseCode:
          form.courseCode.trim(),

        department:
          form.department.trim(),

        teacherName:
          form.teacherName.trim(),

        duration:
          form.duration.trim(),

        description:
          form.description.trim(),

        status:
          form.status,
      };

      const response =
        await fetch(url, {
          method,

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            requestBody
          ),
        });

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Unable to save course"
        );
      }

      alert(
        editingId
          ? "Course updated successfully!"
          : "Course added successfully!"
      );

      setShowModal(false);
      setEditingId(null);

      setForm({
        ...emptyForm,
      });

      await loadCourses();
    } catch (err) {
      console.error(
        "Save Course Error:",
        err
      );

      alert(
        err.message ||
          "Something went wrong while saving course."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // DELETE COURSE
  // =====================================================

  const handleDelete = async (course) => {
    if (isStudent) {
      return;
    }

    const id =
      course._id || course.id;

    if (!id) {
      alert(
        "Course ID not found."
      );
      return;
    }

    const confirmed =
      window.confirm(
        `Are you sure you want to delete ${course.courseName}?`
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
            "Unable to delete course"
        );
      }

      alert(
        "Course deleted successfully."
      );

      await loadCourses();
    } catch (err) {
      console.error(
        "Delete Course Error:",
        err
      );

      alert(
        err.message ||
          "Unable to delete course."
      );
    }
  };

  // =====================================================
  // VIEW COURSE
  // =====================================================

  const handleView = (course) => {
    alert(
      `Course Details\n\n` +
        `Course Name: ${
          course.courseName || "-"
        }\n` +
        `Course Code: ${
          course.courseCode || "-"
        }\n` +
        `Department: ${
          course.department || "-"
        }\n` +
        `Teacher: ${
          course.teacherName || "-"
        }\n` +
        `Duration: ${
          course.duration || "-"
        }\n` +
        `Status: ${
          course.status || "-"
        }\n` +
        `Description: ${
          course.description || "-"
        }`
    );
  };

  // =====================================================
  // STATUS CLASS
  // =====================================================

  const getStatusClass = (
    status
  ) => {
    return status === "Active"
      ? "active"
      : "inactive";
  };

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <div className="courses-page">

      {/* HEADER */}

      <div className="courses-header">

        <div>
          <div className="courses-label">
            COURSE MANAGEMENT
          </div>

          <h1>
            Courses
          </h1>

          <p>
            {isStudent
              ? "View your academic courses and teaching assignments."
              : "Manage academic courses, departments and teaching assignments."}
          </p>
        </div>

        {/* ADMIN ONLY */}

        {!isStudent && (
          <button
            type="button"
            className="add-course-btn"
            onClick={openAddModal}
          >
            <span>+</span>
            Add Course
          </button>
        )}

      </div>

      {/* STATISTICS */}

      <div className="course-stat-grid">

        <div className="course-stat-card">

          <div className="course-stat-icon">
            📚
          </div>

          <div className="course-stat-info">

            <span>
              Total Courses
            </span>

            <strong>
              {totalCourses}
            </strong>

            <small>
              Registered courses
            </small>

          </div>

        </div>

        <div className="course-stat-card">

          <div className="course-stat-icon">
            ✅
          </div>

          <div className="course-stat-info">

            <span>
              Active
            </span>

            <strong>
              {activeCourses}
            </strong>

            <small>
              Active courses
            </small>

          </div>

        </div>

        <div className="course-stat-card">

          <div className="course-stat-icon">
            ⏸️
          </div>

          <div className="course-stat-info">

            <span>
              Inactive
            </span>

            <strong>
              {inactiveCourses}
            </strong>

            <small>
              Inactive courses
            </small>

          </div>

        </div>

      </div>

      {/* COURSE RECORDS */}

      <div className="course-records">

        <div className="records-header">

          <div>

            <h2>
              Course Records
            </h2>

            <p>
              {isStudent
                ? "View available academic course information."
                : "View and manage registered academic courses."}
            </p>

          </div>

          <div className="course-search">

            <span>
              🔍
            </span>

            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

          </div>

        </div>

        {/* LOADING */}

        {loading && (
          <div className="course-state">

            <div className="loading-spinner" />

            <h3>
              Loading Courses...
            </h3>

            <p>
              Please wait while we fetch
              course records.
            </p>

          </div>
        )}

        {/* ERROR */}

        {!loading &&
          error && (
            <div className="course-state">

              <div className="state-icon">
                ⚠️
              </div>

              <h3>
                Unable to Load Courses
              </h3>

              <p>
                {error}
              </p>

              <button
                type="button"
                className="retry-btn"
                onClick={loadCourses}
              >
                Retry
              </button>

            </div>
          )}

        {/* EMPTY */}

        {!loading &&
          !error &&
          filteredCourses.length ===
            0 && (

            <div className="course-state">

              <div className="empty-course-icon">
                📚
              </div>

              <h3>
                No Course Records Found
              </h3>

              <p>
                {search
                  ? "No courses match your search."
                  : "There are no courses yet."}
              </p>

              {/* ADMIN ONLY */}

              {!isStudent &&
                !search && (
                  <button
                    type="button"
                    className="add-first-btn"
                    onClick={
                      openAddModal
                    }
                  >
                    + Add First Course
                  </button>
                )}

            </div>
          )}

        {/* TABLE */}

        {!loading &&
          !error &&
          filteredCourses.length >
            0 && (

            <div className="course-table-wrapper">

              <table className="course-table">

                <thead>

                  <tr>

                    <th>
                      COURSE
                    </th>

                    <th>
                      CODE
                    </th>

                    <th>
                      DEPARTMENT
                    </th>

                    <th>
                      TEACHER
                    </th>

                    <th>
                      DURATION
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

                  {filteredCourses.map(
                    (
                      course,
                      index
                    ) => {

                      const id =
                        course._id ||
                        course.id ||
                        index;

                      return (
                        <tr key={id}>

                          <td>

                            <div className="course-profile">

                              <div className="course-avatar">
                                📚
                              </div>

                              <div>

                                <strong>
                                  {
                                    course.courseName ||
                                    "Unnamed Course"
                                  }
                                </strong>

                                <small>
                                  {
                                    course.description ||
                                    "No description"
                                  }
                                </small>

                              </div>

                            </div>

                          </td>

                          <td>

                            <span className="course-code">
                              {
                                course.courseCode ||
                                "-"
                              }
                            </span>

                          </td>

                          <td>
                            {
                              course.department ||
                              "-"
                            }
                          </td>

                          <td>
                            {
                              course.teacherName ||
                              "-"
                            }
                          </td>

                          <td>
                            {
                              course.duration ||
                              "-"
                            }
                          </td>

                          <td>

                            <span
                              className={`course-status-badge ${getStatusClass(
                                course.status
                              )}`}
                            >
                              {
                                course.status ||
                                "Active"
                              }
                            </span>

                          </td>

                          <td>

                            <div className="course-actions">

                              {/* VIEW */}

                              <button
                                type="button"
                                className="view-btn"
                                onClick={() =>
                                  handleView(
                                    course
                                  )
                                }
                              >
                                View
                              </button>

                              {/* ADMIN */}

                              {!isStudent && (
                                <>
                                  <button
                                    type="button"
                                    className="edit-btn"
                                    onClick={() =>
                                      openEditModal(
                                        course
                                      )
                                    }
                                  >
                                    Edit
                                  </button>

                                  <button
                                    type="button"
                                    className="delete-btn"
                                    onClick={() =>
                                      handleDelete(
                                        course
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

      {/* ADD / EDIT MODAL */}

      {!isStudent &&
        showModal && (

          <div
            className="course-modal-overlay"
            onClick={closeModal}
          >

            <div
              className="course-modal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              {/* MODAL HEADER */}

              <div className="modal-header">

                <div>

                  <h2>
                    {editingId
                      ? "Edit Course"
                      : "Add Course"}
                  </h2>

                  <p>
                    {editingId
                      ? "Update course information."
                      : "Enter course information to create a new course."}
                  </p>

                </div>

                <button
                  type="button"
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
                className="course-form"
                onSubmit={
                  handleSubmit
                }
              >

                <div className="form-section-title">
                  Course Information
                </div>

                <div className="form-grid">

                  <div className="form-group">

                    <label>
                      Course Name *
                    </label>

                    <input
                      name="courseName"
                      value={
                        form.courseName
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Enter course name"
                      required
                    />

                  </div>

                  <div className="form-group">

                    <label>
                      Course Code *
                    </label>

                    <input
                      name="courseCode"
                      value={
                        form.courseCode
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Enter course code"
                      required
                    />

                  </div>

                  <div className="form-group">

                    <label>
                      Department *
                    </label>

                    <input
                      name="department"
                      value={
                        form.department
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Enter department"
                      required
                    />

                  </div>

                  <div className="form-group">

                    <label>
                      Teacher Name *
                    </label>

                    <input
                      name="teacherName"
                      value={
                        form.teacherName
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Enter teacher name"
                      required
                    />

                  </div>

                  <div className="form-group">

                    <label>
                      Duration *
                    </label>

                    <input
                      name="duration"
                      value={
                        form.duration
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="e.g. 4 Years"
                      required
                    />

                  </div>

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

                      <option value="Active">
                        Active
                      </option>

                      <option value="Inactive">
                        Inactive
                      </option>

                    </select>

                  </div>

                </div>

                <div className="form-section-title">
                  Additional Information
                </div>

                <div className="form-grid">

                  <div className="form-group full-width">

                    <label>
                      Description
                    </label>

                    <textarea
                      name="description"
                      value={
                        form.description
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Enter course description"
                      rows="4"
                    />

                  </div>

                </div>

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
                    className="save-course-btn"
                    disabled={saving}
                  >
                    {saving
                      ? "Saving..."
                      : editingId
                      ? "Update Course"
                      : "Add Course"}
                  </button>

                </div>

              </form>

            </div>

          </div>
        )}

    </div>
  );
}

export default Courses;