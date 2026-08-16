import React from "react";

function ParentDashboard() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f1f5f9",
        padding: "32px",
        boxSizing: "border-box",
      }}
    >
      {/* PARENT PORTAL WELCOME CARD */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "18px",
          padding: "42px",
          width: "100%",
          boxSizing: "border-box",
          boxShadow: "0 2px 10px rgba(15, 23, 42, 0.06)",
          border: "1px solid #e2e8f0",
        }}
      >
        <div
          style={{
            color: "#2563eb",
            fontSize: "15px",
            fontWeight: "800",
            letterSpacing: "1.5px",
            marginBottom: "16px",
          }}
        >
          PARENT PORTAL
        </div>

        <h1
          style={{
            margin: "0 0 14px",
            fontSize: "34px",
            fontWeight: "700",
            color: "#0f172a",
          }}
        >
          Welcome, Parent 👋
        </h1>

        <p
          style={{
            margin: 0,
            fontSize: "17px",
            color: "#64748b",
          }}
        >
          Monitor your child's academic information,
          attendance, examinations and fees.
        </p>
      </div>
    </div>
  );
}

export default ParentDashboard;