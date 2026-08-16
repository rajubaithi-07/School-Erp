import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/teachers.css";

function AddTeacher() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    email: "",
    password: "",
    department: "CSE",
    subject: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


  // =====================================================
  // SUBMIT FORM
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");


    // Basic validation

    if (
      !formData.name.trim() ||
      !formData.employeeId.trim() ||
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      setError(
        "Name, Employee ID, Email and Password are required."
      );

      return;
    }


    try {
      setLoading(true);


      const response = await fetch(
        "http://localhost:5000/api/teachers",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: formData.name.trim(),

            employeeId:
              formData.employeeId.trim(),

            email:
              formData.email.trim().toLowerCase(),

            password:
              formData.password,

            department:
              formData.department,

            subject:
              formData.subject.trim(),
          }),
        }
      );


      const result = await response.json();

      console.log(
        "Add Teacher Response:",
        result
      );


      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to add teacher."
        );
      }


      alert(
        result.message ||
          "Teacher added successfully."
      );


      // Go back to Teachers page

      navigate("/admin/teachers");

    } catch (err) {

      console.error(
        "Add Teacher Error:",
        err
      );

      setError(
        err.message ||
          "Failed to add teacher."
      );

    } finally {
      setLoading(false);
    }
  };


  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="teacher-page">


      {/* =================================================
          HEADER
      ================================================= */}

      <div className="teacher-page-header">

        <div>

          <span className="teacher-page-label">
            TEACHER MANAGEMENT
          </span>


          <h1>
            Add Teacher
          </h1>


          <p>
            Add a new teacher profile to the school ERP.
          </p>

        </div>


        <Link
          to="/admin/teachers"
          className="add-teacher-btn"
        >
          ← Back to Teachers
        </Link>

      </div>


      {/* =================================================
          FORM PANEL
      ================================================= */}

      <div
        className="teacher-panel"
        style={{
          padding: "30px",
          maxWidth: "900px",
        }}
      >


        {/* ERROR */}

        {error && (

          <div
            style={{
              marginBottom: "24px",
              padding: "14px 16px",
              background: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: "8px",
              color: "#dc2626",
              fontSize: "14px",
            }}
          >
            {error}
          </div>

        )}


        <form onSubmit={handleSubmit}>


          {/* =================================================
              NAME
          ================================================= */}

          <div
            style={{
              marginBottom: "20px",
            }}
          >

            <label
              htmlFor="name"
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "#334155",
              }}
            >
              Full Name *
            </label>


            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter teacher name"
              required
              style={{
                width: "100%",
                padding: "12px 14px",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                boxSizing: "border-box",
                fontSize: "14px",
                outline: "none",
              }}
            />

          </div>


          {/* =================================================
              EMPLOYEE ID
          ================================================= */}

          <div
            style={{
              marginBottom: "20px",
            }}
          >

            <label
              htmlFor="employeeId"
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "#334155",
              }}
            >
              Employee ID *
            </label>


            <input
              id="employeeId"
              name="employeeId"
              type="text"
              value={formData.employeeId}
              onChange={handleChange}
              placeholder="Enter employee ID"
              required
              style={{
                width: "100%",
                padding: "12px 14px",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                boxSizing: "border-box",
                fontSize: "14px",
              }}
            />

          </div>


          {/* =================================================
              EMAIL
          ================================================= */}

          <div
            style={{
              marginBottom: "20px",
            }}
          >

            <label
              htmlFor="email"
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "#334155",
              }}
            >
              Email *
            </label>


            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="teacher@example.com"
              required
              style={{
                width: "100%",
                padding: "12px 14px",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                boxSizing: "border-box",
                fontSize: "14px",
              }}
            />

          </div>


          {/* =================================================
              PASSWORD
          ================================================= */}

          <div
            style={{
              marginBottom: "20px",
            }}
          >

            <label
              htmlFor="password"
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "#334155",
              }}
            >
              Password *
            </label>


            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
              style={{
                width: "100%",
                padding: "12px 14px",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                boxSizing: "border-box",
                fontSize: "14px",
              }}
            />

          </div>


          {/* =================================================
              DEPARTMENT
          ================================================= */}

          <div
            style={{
              marginBottom: "20px",
            }}
          >

            <label
              htmlFor="department"
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "#334155",
              }}
            >
              Department
            </label>


            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px 14px",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                boxSizing: "border-box",
                fontSize: "14px",
                background: "#ffffff",
              }}
            >

              <option value="CSE">
                CSE
              </option>

              <option value="ECE">
                ECE
              </option>

              <option value="EEE">
                EEE
              </option>

              <option value="MECH">
                MECH
              </option>

              <option value="CIVIL">
                CIVIL
              </option>

              <option value="AIML">
                AI & ML
              </option>

              <option value="DS">
                Data Science
              </option>

            </select>

          </div>


          {/* =================================================
              SUBJECT
          ================================================= */}

          <div
            style={{
              marginBottom: "28px",
            }}
          >

            <label
              htmlFor="subject"
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "#334155",
              }}
            >
              Subject
            </label>


            <input
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter subject"
              style={{
                width: "100%",
                padding: "12px 14px",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                boxSizing: "border-box",
                fontSize: "14px",
              }}
            />

          </div>


          {/* =================================================
              BUTTONS
          ================================================= */}

          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "flex-end",
            }}
          >

            <Link
              to="/admin/teachers"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "11px 20px",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                background: "#ffffff",
                color: "#475569",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              Cancel
            </Link>


            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "11px 22px",
                border: "none",
                borderRadius: "8px",
                background: loading
                  ? "#93c5fd"
                  : "#2563eb",
                color: "#ffffff",
                fontWeight: "600",
                fontSize: "14px",
                cursor: loading
                  ? "not-allowed"
                  : "pointer",
              }}
            >
              {loading
                ? "Adding Teacher..."
                : "+ Add Teacher"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddTeacher;