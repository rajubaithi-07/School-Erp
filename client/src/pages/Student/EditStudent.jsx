import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    email: "",
    password: "",
    department: "CSE",
    semester: "1",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/students/${id}`
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Failed to fetch student"
          );
        }

        const student = result.student;

        setFormData({
          name: student.name || "",
          rollNumber: student.rollNumber || "",
          email: student.email || "",
          password: "",
          department: student.department || "CSE",
          semester: String(student.semester || 1),
        });
      } catch (err) {
        console.error("Edit Student Load Error:", err);

        setError(
          err.message || "Failed to load student"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      setSaving(true);

      const updateData = {
        name: formData.name,
        rollNumber: formData.rollNumber,
        email: formData.email,
        department: formData.department,
        semester: Number(formData.semester),
      };

      if (formData.password.trim() !== "") {
        updateData.password = formData.password;
      }

      const response = await fetch(
        `http://localhost:5000/api/students/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to update student"
        );
      }

      setSuccess("Student updated successfully!");

      setTimeout(() => {
        navigate("/admin/students");
      }, 1000);
    } catch (err) {
      console.error("Update Student Error:", err);

      setError(
        err.message || "Failed to update student"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="student-page">
        <div className="student-panel">
          <div
            style={{
              padding: "50px",
              textAlign: "center",
            }}
          >
            <h2>Loading Student...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="student-page">

      {/* HEADER */}
      <div className="student-page-header">
        <div>
          <span className="page-label">
            STUDENT MANAGEMENT
          </span>

          <h1>Edit Student</h1>

          <p>
            Update student academic and account information.
          </p>
        </div>

        <button
          className="add-student-btn"
          onClick={() => navigate("/admin/students")}
        >
          ← Back to Students
        </button>
      </div>

      {/* FORM */}
      <div className="student-panel">

        <div className="student-panel-header">
          <div>
            <h2>Edit Student Information</h2>

            <p>
              Update the required fields and save changes.
            </p>
          </div>
        </div>

        {error && (
          <div
            style={{
              margin: "20px",
              padding: "14px",
              background: "#fee2e2",
              color: "#b91c1c",
              borderRadius: "8px",
            }}
          >
            {error}
          </div>
        )}

        {success && (
          <div
            style={{
              margin: "20px",
              padding: "14px",
              background: "#dcfce7",
              color: "#15803d",
              borderRadius: "8px",
            }}
          >
            {success}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{
            padding: "30px",
          }}
        >

          {/* NAME */}
          <div style={{ marginBottom: "22px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
              }}
            >
              Student Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "13px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* ROLL NUMBER */}
          <div style={{ marginBottom: "22px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
              }}
            >
              Roll Number
            </label>

            <input
              type="text"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "13px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* EMAIL */}
          <div style={{ marginBottom: "22px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
              }}
            >
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "13px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* PASSWORD */}
          <div style={{ marginBottom: "22px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
              }}
            >
              New Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Leave blank to keep current password"
              style={{
                width: "100%",
                padding: "13px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* DEPARTMENT */}
          <div style={{ marginBottom: "22px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
              }}
            >
              Department
            </label>

            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "13px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                boxSizing: "border-box",
              }}
            >
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="MECH">MECH</option>
              <option value="CIVIL">CIVIL</option>
              <option value="IT">IT</option>
            </select>
          </div>

          {/* SEMESTER */}
          <div style={{ marginBottom: "30px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
              }}
            >
              Semester
            </label>

            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "13px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                boxSizing: "border-box",
              }}
            >
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
              <option value="3">Semester 3</option>
              <option value="4">Semester 4</option>
              <option value="5">Semester 5</option>
              <option value="6">Semester 6</option>
              <option value="7">Semester 7</option>
              <option value="8">Semester 8</option>
            </select>
          </div>

          {/* BUTTONS */}
          <div
            style={{
              display: "flex",
              gap: "12px",
            }}
          >
            <button
              type="submit"
              className="add-student-btn"
              disabled={saving}
              style={{
                border: "none",
                cursor: "pointer",
              }}
            >
              {saving ? "Updating..." : "Update Student"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/students")}
              className="view-btn"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default EditStudent;