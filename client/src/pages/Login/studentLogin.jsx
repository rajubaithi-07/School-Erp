import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function StudentLogin() {
  const navigate = useNavigate();

  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =====================================================
  // STUDENT LOGIN
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!rollNumber.trim()) {
      setError("Please enter your roll number.");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/students/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            rollNumber: rollNumber.trim(),
            password: password,
          }),
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
            "Invalid roll number or password."
        );
      }

      if (!result.student) {
        throw new Error(
          "Student information was not returned by the server."
        );
      }

      // =================================================
      // SAVE STUDENT INFORMATION
      // =================================================

      localStorage.setItem(
        "student",
        JSON.stringify(result.student)
      );

      // =================================================
      // OPEN STUDENT DASHBOARD
      // =================================================

      navigate("/student/dashboard", {
        replace: true,
      });

    } catch (err) {
      console.error(
        "Student Login Error:",
        err
      );

      setError(
        err.message ||
          "Failed to connect to the server."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f1f5f9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >

      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#ffffff",
          borderRadius: "14px",
          padding: "40px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.10)",
        }}
      >

        {/* ICON */}

        <div
          style={{
            textAlign: "center",
            fontSize: "42px",
            marginBottom: "10px",
          }}
        >
          🎓
        </div>

        {/* TITLE */}

        <h1
          style={{
            textAlign: "center",
            color: "#2563eb",
            fontSize: "30px",
            margin: "0",
          }}
        >
          Student Login
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#64748b",
            marginTop: "8px",
            marginBottom: "30px",
          }}
        >
          Login using Roll Number
        </p>

        {/* ERROR */}

        {error && (
          <div
            style={{
              background: "#fee2e2",
              color: "#dc2626",
              padding: "13px",
              borderRadius: "8px",
              textAlign: "center",
              marginBottom: "20px",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        {/* FORM */}

        <form onSubmit={handleSubmit}>

          {/* ROLL NUMBER */}

          <div
            style={{
              marginBottom: "18px",
            }}
          >
            <label
              style={{
                display: "block",
                fontWeight: "600",
                marginBottom: "8px",
                color: "#0f172a",
              }}
            >
              Roll Number
            </label>

            <input
              type="text"
              value={rollNumber}
              onChange={(e) =>
                setRollNumber(e.target.value)
              }
              placeholder="Enter Roll Number"
              autoComplete="username"
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "14px",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                fontSize: "16px",
                outline: "none",
              }}
            />
          </div>

          {/* PASSWORD */}

          <div
            style={{
              marginBottom: "22px",
            }}
          >
            <label
              style={{
                display: "block",
                fontWeight: "600",
                marginBottom: "8px",
                color: "#0f172a",
              }}
            >
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter Password"
              autoComplete="current-password"
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "14px",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                fontSize: "16px",
                outline: "none",
              }}
            />
          </div>

          {/* LOGIN BUTTON */}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              border: "none",
              borderRadius: "8px",
              background: loading
                ? "#93c5fd"
                : "#2563eb",
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: "600",
              cursor: loading
                ? "not-allowed"
                : "pointer",
            }}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

        {/* BACK TO LOGIN */}

        <div
          style={{
            textAlign: "center",
            marginTop: "25px",
          }}
        >
          <Link
            to="/login"
            style={{
              color: "#2563eb",
              textDecoration: "none",
            }}
          >
            ← Back to Login Selection
          </Link>
        </div>

      </div>
    </div>
  );
}

export default StudentLogin;