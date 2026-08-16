import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        width: "100%",
        padding: "18px 50px",
        boxSizing: "border-box",
        background: "#0b1020",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
        zIndex: 10,
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "white",
          fontSize: "24px",
          fontWeight: "700",
        }}
      >
        🎓 School ERP
      </Link>

      {/* Navigation */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "32px",
        }}
      >
        <Link to="/" style={navLinkStyle}>
          Home
        </Link>

        <Link to="/about" style={navLinkStyle}>
          About
        </Link>

        <Link to="/gallery" style={navLinkStyle}>
          Gallery
        </Link>

        <Link to="/contact" style={navLinkStyle}>
          Contact
        </Link>

        {/* Login */}
        <Link
          to="/login"
          style={{
            textDecoration: "none",
            color: "white",
            border: "1px solid #ffffff",
            padding: "10px 22px",
            borderRadius: "25px",
            fontWeight: "600",
          }}
        >
          Login
        </Link>
      </div>
    </nav>
  );
}

const navLinkStyle = {
  textDecoration: "none",
  color: "white",
  fontSize: "16px",
};

export default Navbar;