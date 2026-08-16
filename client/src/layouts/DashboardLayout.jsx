import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../styles/dashboardLayout.css";

// =====================================================
// ADMIN SIDEBAR MENU
// =====================================================

const menuItems = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: "📊",
  },
  {
    label: "Students",
    path: "/admin/students",
    icon: "🎓",
  },
  {
    label: "Teachers",
    path: "/admin/teachers",
    icon: "👨‍🏫",
  },
  {
    label: "Parents",
    path: "/admin/parents",
    icon: "👨‍👩‍👧",
  },
  {
    label: "Attendance",
    path: "/admin/attendance",
    icon: "🗓️",
  },
  {
    label: "Performance",
    path: "/admin/performance",
    icon: "📈",
  },
  {
    label: "Fees",
    path: "/admin/fees",
    icon: "💰",
  },
  {
    label: "Exams",
    path: "/admin/exams",
    icon: "📝",
  },
  {
    label: "Activities",
    path: "/admin/activities",
    icon: "🎉",
  },
  {
    label: "Announcements",
    path: "/admin/announcements",
    icon: "📢",
  },
  {
    label: "Reports",
    path: "/admin/reports",
    icon: "📄",
  },
  {
    label: "Settings",
    path: "/admin/settings",
    icon: "⚙️",
  },
];

// =====================================================
// DASHBOARD LAYOUT
// =====================================================

function DashboardLayout() {
  const navigate = useNavigate();

  // ===================================================
  // LOGOUT
  // ===================================================

  const handleLogout = () => {
    // Remove admin login information
    localStorage.removeItem("admin");

    // Remove any possible login/session values
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("authToken");

    // Go directly to school home page
    navigate("/", { replace: true });
  };

  return (
    <div className="dashboard-layout">

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside className="dashboard-sidebar">

        {/* =================================================
            BRAND
        ================================================= */}

        <div className="sidebar-brand">

          <div className="brand-icon">
            🎓
          </div>

          <div className="brand-text">
            <h2>School ERP</h2>

            <span>
              Admin Portal
            </span>
          </div>

        </div>

        {/* =================================================
            MENU TITLE
        ================================================= */}

        <div className="sidebar-menu-title">
          MAIN MENU
        </div>

        {/* =================================================
            NAVIGATION
        ================================================= */}

        <nav className="sidebar-nav">

          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${
                  isActive ? "active" : ""
                }`
              }
            >

              <span className="sidebar-icon">
                {item.icon}
              </span>

              <span className="sidebar-label">
                {item.label}
              </span>

            </NavLink>
          ))}

        </nav>

        {/* =================================================
            LOGOUT
        ================================================= */}

        <div
          style={{
            padding: "15px",
            borderTop: "1px solid rgba(255,255,255,0.10)",
          }}
        >

          <button
            type="button"
            onClick={handleLogout}
            style={{
              width: "100%",
              height: "45px",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: "8px",
              background: "transparent",
              color: "#ff8a8a",
              fontSize: "14px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            🚪 Logout
          </button>

        </div>

      </aside>

      {/* =================================================
          MAIN AREA
      ================================================= */}

      <div className="dashboard-main">

        {/* =================================================
            TOP BAR
        ================================================= */}

        <header className="dashboard-topbar">

          <div>

            <div className="topbar-title">
              School ERP
            </div>

            <div
              style={{
                fontSize: "13px",
                color: "rgba(255,255,255,0.70)",
                marginTop: "2px",
              }}
            >
              Admin Portal
            </div>

          </div>

        </header>

        {/* =================================================
            PAGE CONTENT
        ================================================= */}

        <main className="dashboard-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;