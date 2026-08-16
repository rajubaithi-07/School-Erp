import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

function ParentLayout() {
  const navigate = useNavigate();

  // =====================================================
  // PARENT PORTAL - READ ONLY
  // Hide Add / Edit / Delete / Mark buttons
  // =====================================================

  useEffect(() => {
    const hideManagementButtons = () => {
      const parentPortal =
        document.querySelector(".parent-portal");

      if (!parentPortal) {
        return;
      }

      const buttons =
        parentPortal.querySelectorAll("button, a");

      buttons.forEach((element) => {
        const text = element.textContent
          .trim()
          .toLowerCase();

        // Never hide Logout
        if (text.includes("logout")) {
          return;
        }

        // Never hide View
        if (text === "view") {
          return;
        }

        // Hide Add buttons
        if (
          text.includes("add examination") ||
          text.includes("add performance") ||
          text.includes("add attendance") ||
          text.includes("add fee") ||
          text.includes("add course") ||
          text.includes("add student") ||
          text.includes("add activity") ||
          text.includes("add report") ||
          text.includes("mark attendance") ||
          text.includes("add first")
        ) {
          element.style.display = "none";
          return;
        }

        // Hide Edit buttons
        if (text === "edit") {
          element.style.display = "none";
          return;
        }

        // Hide Delete buttons
        if (text === "delete") {
          element.style.display = "none";
          return;
        }
      });
    };

    // Run immediately
    hideManagementButtons();

    // Run after page content changes
    const observer = new MutationObserver(() => {
      hideManagementButtons();
    });

    const parentPortal =
      document.querySelector(".parent-portal");

    if (parentPortal) {
      observer.observe(parentPortal, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // =====================================================
  // MENU
  // =====================================================

  const menuItems = [
    {
      label: "Dashboard",
      path: "/parent/dashboard",
      icon: "📊",
    },
    {
      label: "My Child",
      path: "/parent/my-child",
      icon: "🎓",
    },
    {
      label: "Attendance",
      path: "/parent/attendance",
      icon: "🗓️",
    },
    {
      label: "Performance",
      path: "/parent/performance",
      icon: "📈",
    },
    {
      label: "Examinations",
      path: "/parent/examinations",
      icon: "📄",
    },
    {
      label: "Fees",
      path: "/parent/fees",
      icon: "💳",
    },
    {
      label: "Reports",
      path: "/parent/reports",
      icon: "📋",
    },
  ];

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    localStorage.removeItem("parent");
    navigate("/login/parent");
  };

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <div
      className="parent-portal"
      style={{
        minHeight: "100vh",
        display: "flex",
        background: "#eef3f9",
        fontFamily:
          "Inter, Arial, Helvetica, sans-serif",
      }}
    >

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside
        style={{
          width: "265px",
          minHeight: "100vh",
          background: "#061329",
          color: "#ffffff",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          zIndex: 100,
        }}
      >

        {/* BRAND */}

        <div
          style={{
            padding: "28px 22px",
            borderBottom:
              "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >

            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "10px",
                background: "#2563eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
              }}
            >
              👨‍👩‍👧
            </div>

            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "21px",
                  fontWeight: 700,
                }}
              >
                School ERP
              </h2>

              <span
                style={{
                  display: "block",
                  marginTop: "5px",
                  color: "#60a5fa",
                  fontSize: "14px",
                }}
              >
                Parent Portal
              </span>
            </div>

          </div>
        </div>

        {/* MENU TITLE */}

        <div
          style={{
            padding: "32px 23px 14px",
            color: "#8da3c5",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "2px",
          }}
        >
          MAIN MENU
        </div>

        {/* NAVIGATION */}

        <nav
          style={{
            padding: "0 14px",
            flex: 1,
          }}
        >
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: "15px",
                padding: "13px 18px",
                marginBottom: "5px",
                borderRadius: "9px",
                textDecoration: "none",
                color: "#ffffff",
                background: isActive
                  ? "#2563eb"
                  : "transparent",
                fontWeight: isActive
                  ? 700
                  : 500,
                fontSize: "15px",
                transition: "0.2s ease",
              })}
            >
              <span
                style={{
                  width: "22px",
                  textAlign: "center",
                  fontSize: "18px",
                }}
              >
                {item.icon}
              </span>

              <span>
                {item.label}
              </span>
            </NavLink>
          ))}
        </nav>

        {/* =================================================
            PARENT ACCOUNT
        ================================================= */}

        <div
          style={{
            padding: "18px",
            borderTop:
              "1px solid rgba(255,255,255,0.08)",
          }}
        >

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "14px",
            }}
          >

            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                background: "#2563eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "18px",
              }}
            >
              P
            </div>

            <div>

              <strong
                style={{
                  display: "block",
                  fontSize: "14px",
                }}
              >
                Parent
              </strong>

              <span
                style={{
                  color: "#60a5fa",
                  fontSize: "13px",
                }}
              >
                Parent Account
              </span>

            </div>

          </div>

          <button
            type="button"
            onClick={handleLogout}
            style={{
              width: "100%",
              padding: "12px",
              background: "transparent",
              color: "#ff7777",
              border:
                "1px solid rgba(255,255,255,0.15)",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "14px",
            }}
          >
            🚪 Logout
          </button>

        </div>

      </aside>

      {/* =================================================
          MAIN AREA
      ================================================= */}

      <div
        style={{
          marginLeft: "265px",
          width: "calc(100% - 265px)",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >

        {/* =================================================
            TOP BAR
        ================================================= */}

        <header
          style={{
            height: "94px",
            background: "#061329",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 34px",
            boxSizing: "border-box",
          }}
        >

          <div>

            <h2
              style={{
                margin: 0,
                fontSize: "22px",
                fontWeight: 700,
              }}
            >
              🎓 School ERP
            </h2>

            <span
              style={{
                display: "block",
                marginTop: "6px",
                color: "#60a5fa",
                fontSize: "14px",
              }}
            >
              Parent Portal
            </span>

          </div>

          <button
            type="button"
            onClick={handleLogout}
            style={{
              background: "#ff4747",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              padding: "14px 25px",
              fontSize: "14px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Logout
          </button>

        </header>

        {/* =================================================
            PAGE CONTENT
        ================================================= */}

        <main
          style={{
            flex: 1,
            padding: "30px",
            boxSizing: "border-box",
          }}
        >
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default ParentLayout;