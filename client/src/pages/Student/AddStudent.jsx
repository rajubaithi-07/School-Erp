import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/students";

function AddStudent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    phoneNumber: "",
    password: "",
    classNumber: "1",
    section: "A",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  // =====================================================
  // SUBMIT FORM
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // ===================================================
    // FRONTEND VALIDATION
    // ===================================================

    if (
      !formData.name.trim() ||
      !formData.rollNumber.trim() ||
      !formData.phoneNumber.trim() ||
      !formData.password.trim() ||
      !formData.classNumber ||
      !formData.section
    ) {
      setError(
        "Please fill all required fields."
      );
      return;
    }

    // ===================================================
    // PHONE VALIDATION
    // ===================================================

    const phone = formData.phoneNumber.trim();

    if (!/^[0-9]{10}$/.test(phone)) {
      setError(
        "Please enter a valid 10-digit phone number."
      );
      return;
    }

    // ===================================================
    // CLASS VALIDATION
    // ===================================================

    const classNumber = Number(
      formData.classNumber
    );

    if (
      !Number.isInteger(classNumber) ||
      classNumber < 1 ||
      classNumber > 10
    ) {
      setError(
        "Class must be between 1 and 10."
      );
      return;
    }

    // ===================================================
    // SECTION VALIDATION
    // ===================================================

    if (
      !["A", "B", "C"].includes(
        formData.section
      )
    ) {
      setError(
        "Section must be A, B or C."
      );
      return;
    }

    try {
      setLoading(true);

      // =================================================
      // SEND DATA TO SERVER
      // =================================================

      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: formData.name.trim(),

          rollNumber:
            formData.rollNumber.trim(),

          phoneNumber: phone,

          password:
            formData.password.trim(),

          classNumber: classNumber,

          section:
            formData.section,
        }),
      });

      // =================================================
      // READ SERVER RESPONSE
      // =================================================

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to add student."
        );
      }

      // =================================================
      // SUCCESS
      // =================================================

      setSuccess(
        "Student added successfully!"
      );

      // Clear form
      setFormData({
        name: "",
        rollNumber: "",
        phoneNumber: "",
        password: "",
        classNumber: "1",
        section: "A",
      });

      // Go back to student list
      setTimeout(() => {
        navigate("/admin/students");
      }, 1000);
    } catch (err) {
      console.error(
        "Add Student Error:",
        err
      );

      setError(
        err.message ||
          "Failed to add student."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // CLASS OPTIONS
  // =====================================================

  const classOptions = Array.from(
    { length: 10 },
    (_, index) => index + 1
  );

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <div className="student-page">

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="student-page-header">

        <div>
          <span className="page-label">
            STUDENT MANAGEMENT
          </span>

          <h1>Add Student</h1>

          <p>
            Register a new student in the
            School ERP system.
          </p>
        </div>

        <button
          type="button"
          className="add-student-btn"
          onClick={() =>
            navigate("/admin/students")
          }
          disabled={loading}
        >
          ← Back to Students
        </button>

      </div>

      {/* =================================================
          FORM CARD
      ================================================= */}

      <div className="student-form-card">

        <div className="form-card-header">

          <h2>
            Student Information
          </h2>

          <p>
            Enter the student's school
            and account details.
          </p>

        </div>

        {/* =================================================
            ERROR MESSAGE
        ================================================= */}

        {error && (
          <div
            style={{
              margin:
                "20px 28px 0",
              padding:
                "14px 16px",
              background:
                "#fef2f2",
              border:
                "1px solid #fecaca",
              color:
                "#dc2626",
              borderRadius:
                "8px",
              fontSize:
                "14px",
              fontWeight:
                "500",
            }}
          >
            {error}
          </div>
        )}

        {/* =================================================
            SUCCESS MESSAGE
        ================================================= */}

        {success && (
          <div
            style={{
              margin:
                "20px 28px 0",
              padding:
                "14px 16px",
              background:
                "#f0fdf4",
              border:
                "1px solid #bbf7d0",
              color:
                "#16a34a",
              borderRadius:
                "8px",
              fontSize:
                "14px",
              fontWeight:
                "500",
            }}
          >
            {success}
          </div>
        )}

        {/* =================================================
            FORM
        ================================================= */}

        <form
          onSubmit={handleSubmit}
          style={{
            padding: "28px",
          }}
        >

          {/* =================================================
              STUDENT NAME
          ================================================= */}

          <div className="form-group">

            <label>
              Student Name *
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter student name"
              required
              disabled={loading}
            />

          </div>

          {/* =================================================
              ROLL NUMBER
          ================================================= */}

          <div className="form-group">

            <label>
              Roll Number *
            </label>

            <input
              type="text"
              name="rollNumber"
              value={
                formData.rollNumber
              }
              onChange={handleChange}
              placeholder="Enter roll number"
              required
              disabled={loading}
            />

          </div>

          {/* =================================================
              PHONE NUMBER
          ================================================= */}

          <div className="form-group">

            <label>
              Phone Number *
            </label>

            <input
              type="tel"
              name="phoneNumber"
              value={
                formData.phoneNumber
              }
              onChange={handleChange}
              placeholder="Enter 10-digit phone number"
              maxLength="10"
              inputMode="numeric"
              required
              disabled={loading}
            />

          </div>

          {/* =================================================
              PASSWORD
          ================================================= */}

          <div className="form-group">

            <label>
              Password *
            </label>

            <input
              type="password"
              name="password"
              value={
                formData.password
              }
              onChange={handleChange}
              placeholder="Enter student login password"
              required
              disabled={loading}
            />

          </div>

          {/* =================================================
              CLASS / GRADE
          ================================================= */}

          <div className="form-group">

            <label>
              Class / Grade *
            </label>

            <select
              name="classNumber"
              value={
                formData.classNumber
              }
              onChange={handleChange}
              required
              disabled={loading}
            >

              {classOptions.map(
                (classNumber) => (
                  <option
                    key={classNumber}
                    value={classNumber}
                  >
                    Class {classNumber}
                  </option>
                )
              )}

            </select>

          </div>

          {/* =================================================
              SECTION
          ================================================= */}

          <div className="form-group">

            <label>
              Section *
            </label>

            <select
              name="section"
              value={formData.section}
              onChange={handleChange}
              required
              disabled={loading}
            >

              <option value="A">
                Section A
              </option>

              <option value="B">
                Section B
              </option>

              <option value="C">
                Section C
              </option>

            </select>

          </div>

          {/* =================================================
              BUTTONS
          ================================================= */}

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "28px",
            }}
          >

            <button
              type="submit"
              className="save-student-btn"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : "Save Student"}
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={() =>
                navigate(
                  "/admin/students"
                )
              }
              disabled={loading}
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddStudent;