function FacultyDashboard() {
  return (
    <div style={{ width: "100%" }}>
      {/* Welcome Section */}

      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          padding: "38px 40px",
          boxShadow:
            "0 5px 20px rgba(15, 23, 42, 0.06)",
        }}
      >
        <div
          style={{
            color: "#2563eb",
            fontSize: "15px",
            fontWeight: "800",
            letterSpacing: "1.5px",
            marginBottom: "14px",
          }}
        >
          FACULTY PORTAL
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: "34px",
            fontWeight: "500",
            color: "#0f172a",
          }}
        >
          Welcome, Faculty 👋
        </h1>

        <p
          style={{
            marginTop: "18px",
            marginBottom: 0,
            fontSize: "17px",
            color: "#64748b",
          }}
        >
          Manage your academic information and school
          activities from the navigation menu.
        </p>
      </div>
    </div>
  );
}

export default FacultyDashboard;