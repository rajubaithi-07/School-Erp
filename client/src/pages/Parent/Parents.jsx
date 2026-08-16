import { useEffect, useMemo, useState } from "react";
import "../../styles/parents.css";

const API_URL = "http://localhost:5000/api/parents";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  relationship: "",
  studentName: "",
  studentRollNumber: "",
  password: "",
  status: "Active",
};

function Parents() {
  const [parents, setParents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    ...emptyForm,
  });

  // =========================================================
  // LOAD PARENTS
  // =========================================================

  const loadParents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Unable to load parents");
      }

      const result = await response.json();

      const parentList =
        result.parents ||
        result.data ||
        [];

      setParents(
        Array.isArray(parentList)
          ? parentList
          : []
      );
    } catch (err) {
      console.error("Parent API Error:", err);

      setError(
        "Unable to load parents. Please check the server."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadParents();
  }, []);

  // =========================================================
  // SEARCH
  // =========================================================

  const filteredParents = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) {
      return parents;
    }

    return parents.filter((parent) => {
      return (
        String(parent.name || "")
          .toLowerCase()
          .includes(value) ||

        String(parent.email || "")
          .toLowerCase()
          .includes(value) ||

        String(parent.phone || "")
          .toLowerCase()
          .includes(value) ||

        String(parent.relationship || "")
          .toLowerCase()
          .includes(value) ||

        String(parent.studentName || "")
          .toLowerCase()
          .includes(value) ||

        String(parent.studentRollNumber || "")
          .toLowerCase()
          .includes(value)
      );
    });
  }, [parents, search]);

  // =========================================================
  // STATISTICS
  // =========================================================

  const activeParents = parents.filter(
    (parent) =>
      String(parent.status || "Active").toLowerCase() ===
      "active"
  ).length;

  const students = new Set(
    parents
      .map((parent) => parent.studentRollNumber)
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

    setForm({
      ...emptyForm,
    });

    setShowModal(true);
  };

  // =========================================================
  // OPEN EDIT MODAL
  // =========================================================

  const openEditModal = (parent) => {
    setEditingId(
      parent._id || parent.id
    );

    setForm({
      name: parent.name || "",
      email: parent.email || "",
      phone: parent.phone || "",
      relationship:
        parent.relationship || "",
      studentName:
        parent.studentName || "",
      studentRollNumber:
        parent.studentRollNumber || "",
      password: "",
      status:
        parent.status || "Active",
    });

    setShowModal(true);
  };

  // =========================================================
  // CLOSE MODAL
  // =========================================================

  const closeModal = () => {
    if (saving) return;

    setShowModal(false);
    setEditingId(null);

    setForm({
      ...emptyForm,
    });
  };

  // =========================================================
  // SAVE PARENT
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Please enter parent name.");
      return;
    }

    if (!form.email.trim()) {
      alert("Please enter email.");
      return;
    }

    if (!form.studentName.trim()) {
      alert("Please enter student name.");
      return;
    }

    if (!form.studentRollNumber.trim()) {
      alert("Please enter student roll number.");
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

      // Don't send empty password during edit
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        relationship:
          form.relationship.trim(),
        studentName:
          form.studentName.trim(),
        studentRollNumber:
          form.studentRollNumber.trim(),
        status: form.status,
      };

      if (form.password.trim()) {
        payload.password = form.password;
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Unable to save parent"
        );
      }

      alert(
        editingId
          ? "Parent updated successfully!"
          : "Parent added successfully!"
      );

      closeModal();

      await loadParents();
    } catch (err) {
      console.error(
        "Save Parent Error:",
        err
      );

      alert(
        err.message ||
          "Something went wrong while saving parent."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // DELETE PARENT
  // =========================================================

  const handleDelete = async (parent) => {
    const id =
      parent._id || parent.id;

    if (!id) {
      alert("Parent ID not found.");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete ${parent.name}?`
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
            "Unable to delete parent"
        );
      }

      alert(
        "Parent deleted successfully."
      );

      await loadParents();
    } catch (err) {
      console.error(
        "Delete Parent Error:",
        err
      );

      alert(
        err.message ||
          "Unable to delete parent."
      );
    }
  };

  // =========================================================
  // VIEW PARENT
  // =========================================================

  const handleView = (parent) => {
    alert(
      `Parent Details\n\n` +
        `Name: ${
          parent.name || "-"
        }\n` +
        `Email: ${
          parent.email || "-"
        }\n` +
        `Phone: ${
          parent.phone || "-"
        }\n` +
        `Relationship: ${
          parent.relationship || "-"
        }\n` +
        `Student Name: ${
          parent.studentName || "-"
        }\n` +
        `Student Roll Number: ${
          parent.studentRollNumber || "-"
        }\n` +
        `Status: ${
          parent.status || "-"
        }`
    );
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="parents-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="parents-header">

        <div>
          <div className="parents-label">
            PARENT MANAGEMENT
          </div>

          <h1>Parents</h1>

          <p>
            Manage parent profiles, student
            information and contact details.
          </p>
        </div>

        <button
          className="add-parent-btn"
          onClick={openAddModal}
        >
          <span>+</span>
          Add Parent
        </button>

      </div>

      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <div className="parent-stat-grid">

        <div className="parent-stat-card">

          <div className="parent-stat-icon">
            👨‍👩‍👧‍👦
          </div>

          <div className="parent-stat-info">

            <span>
              Total Parents
            </span>

            <strong>
              {parents.length}
            </strong>

          </div>

        </div>

        <div className="parent-stat-card">

          <div className="parent-stat-icon">
            👥
          </div>

          <div className="parent-stat-info">

            <span>
              Showing
            </span>

            <strong>
              {filteredParents.length}
            </strong>

          </div>

        </div>

        <div className="parent-stat-card">

          <div className="parent-stat-icon">
            🎓
          </div>

          <div className="parent-stat-info">

            <span>
              Students
            </span>

            <strong>
              {students}
            </strong>

          </div>

        </div>

      </div>

      {/* =====================================================
          PARENT RECORDS
      ===================================================== */}

      <div className="parent-records">

        <div className="records-header">

          <div>
            <h2>
              Parent Records
            </h2>

            <p>
              View and manage registered
              parents.
            </p>
          </div>

          <div className="parent-search">

            <span>🔍</span>

            <input
              type="text"
              placeholder="Search parents..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

          </div>

        </div>

        {/* =====================================================
            LOADING
        ===================================================== */}

        {loading && (
          <div className="parent-state">

            <div className="loading-spinner"></div>

            <h3>
              Loading Parents...
            </h3>

            <p>
              Please wait while we fetch
              parent records.
            </p>

          </div>
        )}

        {/* =====================================================
            ERROR
        ===================================================== */}

        {!loading && error && (
          <div className="parent-state error-state">

            <div className="state-icon">
              ⚠️
            </div>

            <h3>
              Unable to Load Parents
            </h3>

            <p>
              {error}
            </p>

            <button
              className="retry-btn"
              onClick={loadParents}
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
          filteredParents.length === 0 && (

            <div className="parent-state">

              <div className="empty-parent-icon">
                👨‍👩‍👧‍👦
              </div>

              <h3>
                No Parents Found
              </h3>

              <p>
                {search
                  ? "No parents match your search."
                  : "There are no parent records yet."}
              </p>

              {!search && (
                <button
                  className="add-first-btn"
                  onClick={openAddModal}
                >
                  + Add First Parent
                </button>
              )}

            </div>
          )}

        {/* =====================================================
            TABLE
        ===================================================== */}

        {!loading &&
          !error &&
          filteredParents.length > 0 && (

            <div className="parent-table-wrapper">

              <table className="parent-table">

                <thead>

                  <tr>
                    <th>Parent</th>
                    <th>Contact</th>
                    <th>Relationship</th>
                    <th>Student</th>
                    <th>Roll Number</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>

                </thead>

                <tbody>

                  {filteredParents.map(
                    (parent, index) => {

                      const id =
                        parent._id ||
                        parent.id ||
                        index;

                      return (
                        <tr key={id}>

                          {/* PARENT */}

                          <td>

                            <div className="parent-profile">

                              <div className="parent-avatar">
                                👨‍👩‍👧‍👦
                              </div>

                              <div>

                                <strong>
                                  {parent.name ||
                                    "Unnamed Parent"}
                                </strong>

                                <small>
                                  Parent ID:{" "}
                                  {parent._id
                                    ? String(
                                        parent._id
                                      ).slice(-6)
                                    : id}
                                </small>

                              </div>

                            </div>

                          </td>

                          {/* CONTACT */}

                          <td>

                            <div className="contact-info">

                              <span>
                                {parent.email ||
                                  "-"}
                              </span>

                              <small>
                                {parent.phone ||
                                  "-"}
                              </small>

                            </div>

                          </td>

                          {/* RELATIONSHIP */}

                          <td>
                            <span className="relationship-badge">
                              {parent.relationship ||
                                "Parent"}
                            </span>
                          </td>

                          {/* STUDENT */}

                          <td>
                            {parent.studentName ||
                              "-"}
                          </td>

                          {/* ROLL NUMBER */}

                          <td>
                            {parent.studentRollNumber ||
                              "-"}
                          </td>

                          {/* STATUS */}

                          <td>

                            <span
                              className={`status-badge ${
                                String(
                                  parent.status ||
                                    "Active"
                                ).toLowerCase() ===
                                "active"
                                  ? "active"
                                  : "inactive"
                              }`}
                            >
                              {parent.status ||
                                "Active"}
                            </span>

                          </td>

                          {/* ACTIONS */}

                          <td>

                            <div className="parent-actions">

                              <button
                                className="view-btn"
                                onClick={() =>
                                  handleView(
                                    parent
                                  )
                                }
                              >
                                View
                              </button>

                              <button
                                className="edit-btn"
                                onClick={() =>
                                  openEditModal(
                                    parent
                                  )
                                }
                              >
                                Edit
                              </button>

                              <button
                                className="delete-btn"
                                onClick={() =>
                                  handleDelete(
                                    parent
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
          ADD / EDIT PARENT MODAL
      ===================================================== */}

      {showModal && (

        <div
          className="parent-modal-overlay"
          onClick={closeModal}
        >

          <div
            className="parent-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="modal-header">

              <div>

                <h2>
                  {editingId
                    ? "Edit Parent"
                    : "Add Parent"}
                </h2>

                <p>
                  {editingId
                    ? "Update parent information."
                    : "Enter parent information to create a new record."}
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
              className="parent-form"
              onSubmit={handleSubmit}
            >

              {/* PERSONAL INFORMATION */}

              <div className="form-section-title">
                Parent Information
              </div>

              <div className="form-grid">

                <div className="form-group">

                  <label>
                    Full Name *
                  </label>

                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
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
                    placeholder="parent@example.com"
                    required
                  />

                </div>

                <div className="form-group">

                  <label>
                    Phone
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                  />

                </div>

                <div className="form-group">

                  <label>
                    Relationship
                  </label>

                  <select
                    name="relationship"
                    value={
                      form.relationship
                    }
                    onChange={handleChange}
                  >

                    <option value="">
                      Select Relationship
                    </option>

                    <option value="Father">
                      Father
                    </option>

                    <option value="Mother">
                      Mother
                    </option>

                    <option value="Guardian">
                      Guardian
                    </option>

                    <option value="Parent">
                      Parent
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>

                </div>

              </div>

              {/* STUDENT INFORMATION */}

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
                    value={
                      form.studentName
                    }
                    onChange={handleChange}
                    placeholder="Enter student name"
                    required
                  />

                </div>

                <div className="form-group">

                  <label>
                    Student Roll Number *
                  </label>

                  <input
                    name="studentRollNumber"
                    value={
                      form.studentRollNumber
                    }
                    onChange={handleChange}
                    placeholder="Enter roll number"
                    required
                  />

                </div>

              </div>

              {/* ACCOUNT INFORMATION */}

              <div className="form-section-title">
                Account Information
              </div>

              <div className="form-grid">

                <div className="form-group">

                  <label>
                    Password
                    {!editingId && " *"}
                  </label>

                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder={
                      editingId
                        ? "Leave blank to keep current password"
                        : "Enter password"
                    }
                    required={!editingId}
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

                    <option value="Active">
                      Active
                    </option>

                    <option value="Inactive">
                      Inactive
                    </option>

                  </select>

                </div>

              </div>

              {/* BUTTONS */}

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
                  className="save-parent-btn"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Parent"
                    : "Add Parent"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default Parents;