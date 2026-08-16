import { useNavigate } from "react-router-dom";

function RoleSelection() {
  const navigate = useNavigate();

  const roles = [
    {
      title: "Student",
      description:
        "Access your subjects, homework, exams and attendance.",
      icon: "🎓",
      path: "/login/student",
    },
    {
      title: "Faculty",
      description:
        "Manage students, marks, attendance and assignments.",
      icon: "👨‍🏫",
      path: "/login/faculty",
    },
    {
      title: "Parent",
      description:
        "Track your child's performance, fees and attendance.",
      icon: "👨‍👩‍👧",
      path: "/login/parent",
    },
    {
      title: "Admin",
      description:
        "Manage the complete school management system.",
      icon: "🛡️",
      path: "/login/admin",
    },
  ];

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <header style={styles.header}>

        <div style={styles.logoSection}>

          <div style={styles.logoIcon}>
            🎓
          </div>

          <div>
            <div style={styles.logo}>
              School ERP
            </div>

            <div style={styles.logoSubtitle}>
              Smart School Management
            </div>
          </div>

        </div>

        <button
          style={styles.backButton}
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </button>

      </header>

      {/* MAIN */}
      <main style={styles.main}>

        <div style={styles.badge}>
          🔐 SECURE SCHOOL PORTAL
        </div>

        <h1 style={styles.heading}>
          Welcome to{" "}
          <span style={styles.headingBlue}>
            School ERP
          </span>
        </h1>

        <p style={styles.subtitle}>
          Select your account type to continue
        </p>

        {/* ROLE CARDS */}
        <div style={styles.roleGrid}>

          {roles.map((role) => (

            <div
              key={role.title}
              style={styles.card}
            >

              <div style={styles.iconBox}>
                {role.icon}
              </div>

              <h2 style={styles.cardTitle}>
                {role.title}
              </h2>

              <p style={styles.cardDescription}>
                {role.description}
              </p>

              <button
                style={styles.continueButton}
                onClick={() => navigate(role.path)}
              >
                Continue →
              </button>

            </div>

          ))}

        </div>

      </main>

      {/* FOOTER */}
      <footer style={styles.footer}>

        <div style={styles.footerLogo}>
          🎓 School ERP
        </div>

        <div style={styles.footerSubtitle}>
          Smart School Management Platform
        </div>

        <div style={styles.footerCopyright}>
          © 2026 School ERP. All rights reserved.
        </div>

      </footer>

    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#f4f7ff",
    color: "#0f172a",
  },

  header: {
    height: "72px",
    background: "#080d24",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 6%",
    boxSizing: "border-box",
  },

  logoSection: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  logoIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    background: "#2563eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "21px",
  },

  logo: {
    color: "#ffffff",
    fontSize: "17px",
    fontWeight: "700",
  },

  logoSubtitle: {
    color: "#94a3b8",
    fontSize: "10px",
    marginTop: "2px",
  },

  backButton: {
    background: "transparent",
    color: "#ffffff",
    border: "1px solid #475569",
    borderRadius: "8px",
    padding: "10px 18px",
    fontSize: "13px",
    cursor: "pointer",
  },

  main: {
    flex: 1,
    padding: "70px 6%",
    textAlign: "center",
    boxSizing: "border-box",
  },

  badge: {
    display: "inline-block",
    padding: "8px 16px",
    borderRadius: "20px",
    background: "#edf4ff",
    border: "1px solid #c7dbff",
    color: "#2563eb",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "0.5px",
  },

  heading: {
    margin: "22px 0 8px",
    fontSize: "42px",
    fontWeight: "800",
    lineHeight: "1.2",
  },

  headingBlue: {
    color: "#2563eb",
  },

  subtitle: {
    margin: "0 0 45px",
    color: "#64748b",
    fontSize: "16px",
  },

  roleGrid: {
    maxWidth: "1100px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns:
      "repeat(4, minmax(0, 1fr))",
    gap: "20px",
  },

  card: {
    background: "#ffffff",
    border: "1px solid #dbe4f0",
    borderRadius: "16px",
    padding: "28px 24px",
    textAlign: "left",
    boxShadow:
      "0 4px 15px rgba(15, 23, 42, 0.08)",
    boxSizing: "border-box",
  },

  iconBox: {
    width: "52px",
    height: "52px",
    borderRadius: "12px",
    background: "#edf4ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "25px",
    marginBottom: "22px",
  },

  cardTitle: {
    margin: "0 0 12px",
    fontSize: "20px",
    fontWeight: "700",
  },

  cardDescription: {
    minHeight: "65px",
    margin: "0 0 25px",
    color: "#64748b",
    fontSize: "13px",
    lineHeight: "1.7",
  },

  continueButton: {
    width: "100%",
    border: "none",
    borderRadius: "7px",
    background: "#2563eb",
    color: "#ffffff",
    padding: "13px 16px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
  },

  footer: {
    background: "#080d24",
    textAlign: "center",
    padding: "25px",
    boxSizing: "border-box",
  },

  footerLogo: {
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "700",
    marginBottom: "5px",
  },

  footerSubtitle: {
    color: "#94a3b8",
    fontSize: "11px",
  },

  footerCopyright: {
    color: "#64748b",
    fontSize: "10px",
    marginTop: "8px",
  },
};

export default RoleSelection;