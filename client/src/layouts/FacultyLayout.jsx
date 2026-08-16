import {
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

function FacultyLayout() {
  const navigate = useNavigate();

  const facultyData = JSON.parse(
    localStorage.getItem("faculty") || "{}"
  );

  const facultyName =
    facultyData.name || "Faculty";

  const facultyId =
    facultyData.facultyId ||
    facultyData.id ||
    "001";

  const handleLogout = () => {
    localStorage.removeItem("faculty");
    navigate("/login/faculty");
  };

  // =====================================================
  // FACULTY MENU
  // =====================================================

  const menuItems = [
    {
      path: "/faculty/dashboard",
      label: "Dashboard",
      icon: "📊",
    },
    {
      path: "/faculty/students",
      label: "Students",
      icon: "🎓",
    },
    {
      path: "/faculty/attendance",
      label: "Attendance",
      icon: "🗓️",
    },
    {
      path: "/faculty/performance",
      label: "Performance",
      icon: "📈",
    },
    {
      path: "/faculty/examinations",
      label: "Examinations",
      icon: "📆",
    },
    {
      path: "/faculty/reports",
      label: "Reports",
      icon: "📄",
    },
    {
      path: "/faculty/settings",
      label: "Settings",
      icon: "⚙️",
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        overflow: "hidden",
        background: "#f1f5f9",
      }}
    >
      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        style={{
          width: "255px",
          minWidth: "255px",
          height: "100vh",
          background: "#071226",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        {/* LOGO */}

        <div
          style={{
            height: "112px",
            minHeight: "112px",
            padding: "20px 18px",
            borderBottom:
              "1px solid rgba(255,255,255,0.08)",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                minWidth: "48px",
                borderRadius: "10px",
                background: "#2563eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "23px",
              }}
            >
              👨‍🏫
            </div>

            <div>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  lineHeight: "1.2",
                }}
              >
                School ERP
              </div>

              <div
                style={{
                  marginTop: "5px",
                  fontSize: "14px",
                  color: "#93c5fd",
                }}
              >
                Faculty Portal
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            MENU
        ===================================================== */}

        <div
          style={{
            flex: 1,
            padding: "18px 12px",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              fontWeight: "700",
              letterSpacing: "2px",
              color: "#7891b5",
              padding: "0 10px 10px",
            }}
          >
            MAIN MENU
          </div>

          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                width: "100%",
                height: "49px",
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "0 14px",
                marginBottom: "3px",
                boxSizing: "border-box",
                borderRadius: "8px",
                textDecoration: "none",
                color: isActive
                  ? "#ffffff"
                  : "#d5deed",
                background: isActive
                  ? "#2563eb"
                  : "transparent",
                fontSize: "16px",
                fontWeight: isActive
                  ? "600"
                  : "500",
              })}
            >
              <span
                style={{
                  width: "25px",
                  minWidth: "25px",
                  textAlign: "center",
                  fontSize: "19px",
                }}
              >
                {item.icon}
              </span>

              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>

        {/* =====================================================
            FACULTY PROFILE
        ===================================================== */}

        <div
          style={{
            height: "145px",
            minHeight: "145px",
            padding: "15px 15px",
            borderTop:
              "1px solid rgba(255,255,255,0.08)",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                minWidth: "42px",
                borderRadius: "50%",
                background: "#2563eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "700",
                fontSize: "18px",
              }}
            >
              {facultyName
                .charAt(0)
                .toUpperCase()}
            </div>

            <div>
              <div
                style={{
                  fontWeight: "700",
                  color: "#fff",
                }}
              >
                {facultyName}
              </div>

              <div
                style={{
                  marginTop: "3px",
                  fontSize: "12px",
                  color: "#93c5fd",
                }}
              >
                {facultyId}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            style={{
              width: "100%",
              height: "40px",
              background: "transparent",
              border: "1px solid #334155",
              borderRadius: "7px",
              color: "#fca5a5",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* =====================================================
          RIGHT SIDE
      ===================================================== */}

      <div
        style={{
          flex: 1,
          minWidth: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* TOP HEADER */}

        <header
          style={{
            width: "100%",
            height: "95px",
            minHeight: "95px",
            background: "#071226",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 38px",
            boxSizing: "border-box",
            flexShrink: 0,
          }}
        >
          <div>
            <div
              style={{
                fontSize: "20px",
                fontWeight: "700",
              }}
            >
              🎓 School ERP
            </div>

            <div
              style={{
                marginTop: "7px",
                color: "#93c5fd",
                fontSize: "14px",
              }}
            >
              Faculty Portal
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            style={{
              background: "#ef4444",
              color: "#fff",
              border: "none",
              borderRadius: "7px",
              padding: "13px 25px",
              fontWeight: "600",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </header>

        {/* MAIN CONTENT */}

        <main
          style={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            overflowX: "hidden",
            background: "#f1f5f9",
          }}
        >
          <div
            style={{
              width: "100%",
              minHeight: "100%",
              padding: "35px 42px",
              boxSizing: "border-box",
            }}
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default FacultyLayout;