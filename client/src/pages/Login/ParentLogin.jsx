import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ParentLogin() {
  const navigate = useNavigate();

  const [parentId, setParentId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    if (!parentId.trim()) {
      setError("Please enter Parent ID.");
      return;
    }

    if (!password.trim()) {
      setError("Please enter password.");
      return;
    }

    setLoading(true);

    // Parent portal demo login
    // Replace with backend authentication later.
    setTimeout(() => {
      localStorage.setItem(
        "parent",
        JSON.stringify({
          parentId: parentId.trim(),
          name: "Parent",
        })
      );

      setLoading(false);

      navigate("/parent/dashboard");
    }, 500);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
        background:
          "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
        fontFamily:
          "Arial, Helvetica, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          background: "#ffffff",
          padding: "40px",
          borderRadius: "18px",
          boxShadow:
            "0 15px 40px rgba(15, 23, 42, 0.12)",
        }}
      >
        {/* HEADER */}

        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              width: "70px",
              height: "70px",
              margin: "0 auto 15px",
              borderRadius: "18px",
              background: "#2563eb",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
            }}
          >
            👨‍👩‍👧
          </div>

          <h1
            style={{
              margin: 0,
              color: "#1e3a8a",
              fontSize: "30px",
              fontWeight: "700",
            }}
          >
            Parent Login
          </h1>

          <p
            style={{
              marginTop: "10px",
              marginBottom: 0,
              color: "#64748b",
              fontSize: "15px",
            }}
          >
            Login to access your child's
            academic information
          </p>
        </div>

        {/* ERROR */}

        {error && (
          <div
            style={{
              background: "#fef2f2",
              border: "1px solid #fecaca",
              color: "#b91c1c",
              padding: "12px 14px",
              borderRadius: "8px",
              marginBottom: "20px",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        {/* FORM */}

        <form onSubmit={handleLogin}>

          {/* PARENT ID */}

          <div
            style={{
              marginBottom: "18px",
            }}
          >
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#334155",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              Parent ID
            </label>

            <input
              type="text"
              value={parentId}
              onChange={(e) =>
                setParentId(e.target.value)
              }
              placeholder="Enter Parent ID"
              autoComplete="username"
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "13px 14px",
                border:
                  "1px solid #cbd5e1",
                borderRadius: "9px",
                fontSize: "15px",
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
                marginBottom: "8px",
                color: "#334155",
                fontWeight: "600",
                fontSize: "14px",
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
              placeholder="Enter password"
              autoComplete="current-password"
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "13px 14px",
                border:
                  "1px solid #cbd5e1",
                borderRadius: "9px",
                fontSize: "15px",
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
              background: loading
                ? "#93c5fd"
                : "#2563eb",
              color: "#ffffff",
              border: "none",
              borderRadius: "9px",
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

        {/* BACK */}

        <div
          style={{
            textAlign: "center",
            marginTop: "24px",
          }}
        >
          <Link
            to="/login"
            style={{
              color: "#2563eb",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            ← Back to Login
          </Link>
        </div>

        {/* DEMO NOTE */}

        <div
          style={{
            marginTop: "25px",
            padding: "12px",
            background: "#f8fafc",
            borderRadius: "8px",
            textAlign: "center",
            color: "#64748b",
            fontSize: "12px",
          }}
        >
          Parent portal login
        </div>
      </div>
    </div>
  );
}

export default ParentLogin;