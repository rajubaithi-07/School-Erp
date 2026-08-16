import React from "react";
import { Link } from "react-router-dom";

function LoginPage() {
  const roles = [
    {
      icon: "🎓",
      title: "Student",
      description:
        "Access your subjects, homework, examinations and attendance.",
      path: "/login/student",
    },
    {
      icon: "👨‍🏫",
      title: "Faculty",
      description:
        "Manage students, marks, attendance and assignments.",
      path: "/login/faculty",
    },
    {
      icon: "👨‍👩‍👧",
      title: "Parent",
      description:
        "Track your child's performance, fees and attendance.",
      path: "/login/parent",
    },
    {
      icon: "🛡️",
      title: "Admin",
      description:
        "Manage the complete school management system.",
      path: "/login/admin",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f6fc",
        fontFamily:
          "Inter, Arial, Helvetica, sans-serif",
        color: "#111827",
      }}
    >
      {/* ================= NAVBAR ================= */}

      <header
        style={{
          background: "#071126",
          height: "82px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1240px",
            margin: "0 auto",
            padding: "0 30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}

          <Link
            to="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                background: "#2563eb",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "25px",
              }}
            >
              🎓
            </div>

            <div>
              <div
                style={{
                  color: "#ffffff",
                  fontSize: "21px",
                  fontWeight: "800",
                }}
              >
                School ERP
              </div>

              <div
                style={{
                  color: "#93c5fd",
                  fontSize: "12px",
                  marginTop: "2px",
                }}
              >
                Smart School Management
              </div>
            </div>
          </Link>

          {/* Back Home */}

          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "#ffffff",
              border: "1px solid #3b82f6",
              borderRadius: "8px",
              padding: "11px 20px",
              fontSize: "14px",
              fontWeight: "700",
            }}
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* ================= MAIN ================= */}

      <main
        style={{
          minHeight: "calc(100vh - 82px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "70px 25px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1150px",
            textAlign: "center",
          }}
        >
          {/* Heading */}

          <div
            style={{
              display: "inline-block",
              padding: "9px 18px",
              border: "1px solid #bfdbfe",
              borderRadius: "30px",
              color: "#2563eb",
              background: "#eff6ff",
              fontSize: "13px",
              fontWeight: "800",
              letterSpacing: "0.5px",
              marginBottom: "22px",
            }}
          >
            🔐 SECURE SCHOOL PORTAL
          </div>

          <h1
            style={{
              fontSize: "48px",
              margin: "0 0 12px",
              fontWeight: "800",
              color: "#111827",
            }}
          >
            Welcome to{" "}
            <span style={{ color: "#2563eb" }}>
              School ERP
            </span>
          </h1>

          <p
            style={{
              margin: "0 0 50px",
              fontSize: "18px",
              color: "#64748b",
            }}
          >
            Select your account type to continue
          </p>

          {/* ================= ROLE CARDS ================= */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(4, minmax(0, 1fr))",
              gap: "22px",
              textAlign: "left",
            }}
          >
            {roles.map((role) => (
              <div
                key={role.title}
                style={{
                  background: "#ffffff",
                  border: "1px solid #dbe4f0",
                  borderRadius: "18px",
                  padding: "30px 25px",
                  boxShadow:
                    "0 10px 30px rgba(15, 23, 42, 0.07)",
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "300px",
                }}
              >
                {/* Icon */}

                <div
                  style={{
                    width: "58px",
                    height: "58px",
                    borderRadius: "14px",
                    background: "#eff6ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "29px",
                    marginBottom: "22px",
                  }}
                >
                  {role.icon}
                </div>

                {/* Title */}

                <h2
                  style={{
                    fontSize: "22px",
                    margin: "0 0 12px",
                    fontWeight: "800",
                    color: "#111827",
                  }}
                >
                  {role.title}
                </h2>

                {/* Description */}

                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: "1.7",
                    color: "#64748b",
                    margin: "0 0 25px",
                    flex: 1,
                  }}
                >
                  {role.description}
                </p>

                {/* Correct Login Link */}

                <Link
                  to={role.path}
                  style={{
                    display: "block",
                    textAlign: "center",
                    textDecoration: "none",
                    background: "#2563eb",
                    color: "#ffffff",
                    padding: "13px 15px",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: "700",
                  }}
                >
                  Continue →
                </Link>
              </div>
            ))}
          </div>

          {/* Footer text */}

          <p
            style={{
              marginTop: "45px",
              color: "#94a3b8",
              fontSize: "13px",
            }}
          >
            Secure • Simple • Connected
          </p>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;