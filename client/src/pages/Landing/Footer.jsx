function Footer() {
  return (
    <footer
      style={{
        background: "#060918",
        borderTop: "1px solid #1f2937",
        padding: "28px 40px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          color: "#ffffff",
          fontSize: "18px",
          fontWeight: "600",
          marginBottom: "8px",
        }}
      >
        🎓 School ERP
      </div>

      <p
        style={{
          color: "#94a3b8",
          fontSize: "13px",
          margin: 0,
        }}
      >
        Smart School Management Platform
      </p>

      <p
        style={{
          color: "#64748b",
          fontSize: "12px",
          marginTop: "12px",
        }}
      >
        © 2026 School ERP. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;