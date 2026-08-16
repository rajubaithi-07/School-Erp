import { useEffect, useMemo, useState } from "react";
import "../../styles/teachers.css";

const API_URL = "http://localhost:5000/api/teachers";

const emptyForm = {
  name: "",
  employeeId: "",
  email: "",
  phone: "",
  department: "",
  subject: "",
  qualification: "",
  experience: "",
};

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({ ...emptyForm });

  // =========================================================
  // LOAD TEACHERS
  // =========================================================

  const loadTeachers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to load teachers"
        );
      }

      const teacherList =
        result.teachers ||
        result.data ||
        [];

      setTeachers(
        Array.isArray(teacherList)
          ? teacherList
          : []
      );
    } catch (err) {
      console.error("Teacher API Error:", err);

      setError(
        err.message ||
          "Unable to load teachers. Please check the server."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeachers();
  }, []);

  // =========================================================
  // SEARCH
  // =========================================================

  const filteredTeachers = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) {
      return teachers;
    }

    return teachers.filter((teacher) => {
      return (
        String(teacher.name || "")
          .toLowerCase()
          .includes(value) ||

        String(teacher.employeeId || "")
          .toLowerCase()
          .includes(value) ||

        String(teacher.email || "")
          .toLowerCase()
          .includes(value) ||

        String(teacher.phone || "")
          .toLowerCase()
          .includes(value) ||

        String(teacher.subject || "")
          .toLowerCase()
          .includes(value) ||

        String(teacher.department || "")
          .toLowerCase()
          .includes(value) ||

        String(teacher.qualification || "")
          .toLowerCase()
          .includes(value)
      );
    });
  }, [teachers, search]);

  // =========================================================
  // STATISTICS
  // =========================================================

  const departments = new Set(
    teachers
      .map((teacher) => teacher.department)
      .filter(Boolean)
  ).size;

  // =========================================================
  // INPUT CHANGE
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================================================
  // OPEN ADD MODAL
  // =========================================================

  const openAddModal = () => {
    setEditingId(null);
    setForm({ ...emptyForm });
    setShowModal(true);
  };

  // =========================================================
  // OPEN EDIT MODAL
  // =========================================================

  const openEditModal = (teacher) => {
    const id =
      teacher._id ||
      teacher.id;

    setEditingId(id);

    setForm({
      name: teacher.name || "",
      employeeId: teacher.employeeId || "",
      email: teacher.email || "",
      phone: teacher.phone || "",
      department: teacher.department || "",
      subject: teacher.subject || "",
      qualification: teacher.qualification || "",
      experience: teacher.experience || "",
    });

    setShowModal(true);
  };

  // =========================================================
  // CLOSE MODAL
  // =========================================================

  const closeModal = () => {
    if (saving) {
      return;
    }

    setShowModal(false);
    setEditingId(null);
    setForm({ ...emptyForm });
  };

  // =========================================================
  // SAVE TEACHER
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Please enter teacher name.");
      return;
    }

    if (!form.employeeId.trim()) {
      alert("Please enter employee ID.");
      return;
    }

    if (!form.email.trim()) {
      alert("Please enter email.");
      return;
    }

    if (!form.phone.trim()) {
      alert("Please enter phone number.");
      return;
    }

    try {
      setSaving(true);

      const method =
        editingId
          ? "PUT"
          : "POST";

      const url =
        editingId
          ? `${API_URL}/${editingId}`
          : API_URL;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          fullName: form.name.trim(),
          employeeId: form.employeeId.trim(),
          email: form.email.trim().toLowerCase(),
          phone: form.phone.trim(),
          department: form.department.trim(),
          subject: form.subject.trim(),
          qualification: form.qualification.trim(),
          experience: form.experience.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Unable to save teacher"
        );
      }

      alert(
        editingId
          ? "Teacher updated successfully!"
          : "Teacher added successfully!"
      );

      closeModal();

      await loadTeachers();
    } catch (err) {
      console.error(
        "Save Teacher Error:",
        err
      );

      alert(
        err.message ||
          "Something went wrong while saving teacher."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // DELETE TEACHER
  // =========================================================

  const handleDelete = async (teacher) => {
    const id =
      teacher._id ||
      teacher.id;

    if (!id) {
      alert("Teacher ID not found.");
      return;
    }

    const teacherName =
      teacher.name ||
      "this teacher";

    const confirmed = window.confirm(
      `Are you sure you want to delete ${teacherName}?`
    );

    if (!confirmed) {
      return;
    }

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
            "Unable to delete teacher"
        );
      }

      alert(
        result.message ||
          "Teacher deleted successfully."
      );

      await loadTeachers();
    } catch (err) {
      console.error(
        "Delete Teacher Error:",
        err
      );

      alert(
        err.message ||
          "Unable to delete teacher."
      );
    }
  };

  // =========================================================
  // VIEW TEACHER
  // =========================================================

  const handleView = (teacher) => {
    const details =
      `Teacher Details\n\n` +
      `Name: ${teacher.name || "-"}\n` +
      `Employee ID: ${teacher.employeeId || "-"}\n` +
      `Email: ${teacher.email || "-"}\n` +
      `Phone: ${teacher.phone || "-"}\n` +
      `Department: ${teacher.department || "-"}\n` +
      `Subject: ${teacher.subject || "-"}\n` +
      `Qualification: ${teacher.qualification || "-"}\n` +
      `Experience: ${teacher.experience || "-"}`;

    alert(details);
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="teachers-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="teachers-header">

        <div>
          <div className="teachers-label">
            TEACHER MANAGEMENT
          </div>

          <h1>Teachers</h1>

          <p>
            Manage teacher profiles, subjects
            and academic information.
          </p>
        </div>

        <button
          className="add-teacher-btn"
          onClick={openAddModal}
        >
          <span>+</span>
          Add Teacher
        </button>

      </div>

      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <div className="teacher-stat-grid">

        <div className="teacher-stat-card">

          <div className="teacher-stat-icon">
            👨‍🏫
          </div>

          <div className="teacher-stat-info">
            <span>Total Teachers</span>

            <strong>
              {teachers.length}
            </strong>
          </div>

        </div>

        <div className="teacher-stat-card">

          <div className="teacher-stat-icon">
            👨‍🏫
          </div>

          <div className="teacher-stat-info">
            <span>Showing</span>

            <strong>
              {filteredTeachers.length}
            </strong>
          </div>

        </div>

        <div className="teacher-stat-card">

          <div className="teacher-stat-icon">
            🏫
          </div>

          <div className="teacher-stat-info">
            <span>Departments</span>

            <strong>
              {departments}
            </strong>
          </div>

        </div>

      </div>

      {/* =====================================================
          TEACHER RECORDS
      ===================================================== */}

      <div className="teacher-records">

        <div className="records-header">

          <div>
            <h2>
              Teacher Records
            </h2>

            <p>
              View and manage registered
              teachers.
            </p>
          </div>

          <div className="teacher-search">

            <span>🔍</span>

            <input
              type="text"
              placeholder="Search teachers..."
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
          <div className="teacher-state">

            <div className="loading-spinner"></div>

            <h3>
              Loading Teachers...
            </h3>

            <p>
              Please wait while we fetch
              teacher records.
            </p>

          </div>
        )}

        {/* =====================================================
            ERROR
        ===================================================== */}

        {!loading && error && (
          <div className="teacher-state error-state">

            <div className="state-icon">
              ⚠️
            </div>

            <h3>
              Unable to Load Teachers
            </h3>

            <p>
              {error}
            </p>

            <button
              className="retry-btn"
              onClick={loadTeachers}
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
          filteredTeachers.length === 0 && (

            <div className="teacher-state">

              <div className="empty-teacher-icon">
                👨‍🏫
              </div>

              <h3>
                No Teachers Found
              </h3>

              <p>
                {search
                  ? "No teachers match your search."
                  : "There are no teacher records yet."}
              </p>

              {!search && (
                <button
                  className="add-first-btn"
                  onClick={openAddModal}
                >
                  + Add First Teacher
                </button>
              )}

            </div>
          )}

        {/* =====================================================
            TABLE
        ===================================================== */}

        {!loading &&
          !error &&
          filteredTeachers.length > 0 && (

            <div className="teacher-table-wrapper">

              <table className="teacher-table">

                <thead>

                  <tr>

                    <th>Teacher</th>

                    <th>Contact</th>

                    <th>Department</th>

                    <th>Subject</th>

                    <th>Qualification</th>

                    <th>Experience</th>

                    <th>Actions</th>

                  </tr>

                </thead>

                <tbody>

                  {filteredTeachers.map(
                    (teacher, index) => {

                      const id =
                        teacher._id ||
                        teacher.id ||
                        index;

                      return (
                        <tr key={id}>

                          {/* TEACHER */}

                          <td>

                            <div className="teacher-profile">

                              <div className="teacher-avatar">
                                {(
                                  teacher.name ||
                                  "T"
                                )
                                  .charAt(0)
                                  .toUpperCase()}
                              </div>

                              <div>

                                <strong>
                                  {teacher.name ||
                                    "Unnamed Teacher"}
                                </strong>

                                <small>
                                  ID:{" "}
                                  {teacher.employeeId ||
                                    "Not provided"}
                                </small>

                              </div>

                            </div>

                          </td>

                          {/* CONTACT */}

                          <td>

                            <div className="contact-info">

                              <span>
                                {teacher.email ||
                                  "-"}
                              </span>

                              <small>
                                {teacher.phone ||
                                  "-"}
                              </small>

                            </div>

                          </td>

                          {/* DEPARTMENT */}

                          <td>

                            <span className="department-badge">
                              {teacher.department ||
                                "General"}
                            </span>

                          </td>

                          {/* SUBJECT */}

                          <td>
                            {teacher.subject ||
                              "-"}
                          </td>

                          {/* QUALIFICATION */}

                          <td>
                            {teacher.qualification ||
                              "-"}
                          </td>

                          {/* EXPERIENCE */}

                          <td>
                            {teacher.experience ||
                              "-"}
                          </td>

                          {/* ACTIONS */}

                          <td>

                            <div className="teacher-actions">

                              <button
                                type="button"
                                className="view-btn"
                                onClick={() =>
                                  handleView(
                                    teacher
                                  )
                                }
                              >
                                View
                              </button>

                              <button
                                type="button"
                                className="edit-btn"
                                onClick={() =>
                                  openEditModal(
                                    teacher
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
                                    teacher
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
          ADD / EDIT TEACHER MODAL
      ===================================================== */}

      {showModal && (

        <div
          className="teacher-modal-overlay"
          onClick={closeModal}
        >

          <div
            className="teacher-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="modal-header">

              <div>

                <h2>
                  {editingId
                    ? "Edit Teacher"
                    : "Add Teacher"}
                </h2>

                <p>
                  {editingId
                    ? "Update teacher information."
                    : "Enter teacher information to create a new record."}
                </p>

              </div>

              <button
                type="button"
                className="modal-close"
                onClick={closeModal}
                disabled={saving}
              >
                ×
              </button>

            </div>

            {/* FORM */}

            <form
              className="teacher-form"
              onSubmit={handleSubmit}
            >

              {/* PERSONAL INFORMATION */}

              <div className="form-section-title">
                Personal Information
              </div>

              <div className="form-grid">

                <div className="form-group">

                  <label>
                    Full Name *
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    required
                  />

                </div>

                <div className="form-group">

                  <label>
                    Employee ID *
                  </label>

                  <input
                    type="text"
                    name="employeeId"
                    value={form.employeeId}
                    onChange={handleChange}
                    placeholder="e.g. TCH001"
                    required
                  />

                </div>

                <div className="form-group">

                  <label>
                    Email *
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="teacher@example.com"
                    required
                  />

                </div>

                <div className="form-group">

                  <label>
                    Phone *
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    required
                  />

                </div>

              </div>

              {/* ACADEMIC INFORMATION */}

              <div className="form-section-title">
                Academic Information
              </div>

              <div className="form-grid">

                <div className="form-group">

                  <label>
                    Qualification
                  </label>

                  <input
                    type="text"
                    name="qualification"
                    value={form.qualification}
                    onChange={handleChange}
                    placeholder="e.g. M.Tech, M.Sc"
                  />

                </div>

                <div className="form-group">

                  <label>
                    Subject
                  </label>

                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="e.g. Mathematics"
                  />

                </div>

                <div className="form-group">

                  <label>
                    Department
                  </label>

                  <input
                    type="text"
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    placeholder="e.g. CSE"
                  />

                </div>

                <div className="form-group">

                  <label>
                    Experience
                  </label>

                  <input
                    type="text"
                    name="experience"
                    value={form.experience}
                    onChange={handleChange}
                    placeholder="e.g. 5 Years"
                  />

                </div>

              </div>

              {/* FORM BUTTONS */}

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
                  className="save-teacher-btn"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Teacher"
                    : "Add Teacher"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default Teachers;