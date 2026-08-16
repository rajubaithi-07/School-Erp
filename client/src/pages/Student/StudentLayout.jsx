import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const StudentLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const student = {
    name: "Manish",
    rollNumber: "224",
    department: "CSE",
    semester: "Semester 1",
    email: "manish@gmail.com",
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: "📊",
      path: "/student/dashboard",
    },
    {
      name: "Attendance",
      icon: "🗓️",
      path: "/student/attendance",
    },
    {
      name: "Performance",
      icon: "📈",
      path: "/student/performance",
    },
    {
      name: "Examinations",
      icon: "📝",
      path: "/student/examinations",
    },
    {
      name: "Courses",
      icon: "📚",
      path: "/student/courses",
    },
    {
      name: "Activities",
      icon: "🏆",
      path: "/student/activities",
    },
    {
      name: "Reports",
      icon: "📄",
      path: "/student/reports",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("student");
    localStorage.removeItem("studentData");
    localStorage.removeItem("studentToken");

    navigate("/login/student");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f1f5f9",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          width: "270px",
          background: "#071126",
          color: "#ffffff",
          display: "flex",
          flexDirection: "column",
          zIndex: 1000,
        }}
      >
        {/* LOGO */}

        <div
          style={{
            padding: "28px 22px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
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
                background: "#2864e8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
              }}
            >
              🎓
            </div>

            <div>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                }}
              >
                School ERP
              </div>

              <div
                style={{
                  fontSize: "14px",
                  color: "#8ea4c8",
                  marginTop: "5px",
                }}
              >
                Student Portal
              </div>
            </div>
          </div>
        </div>

        {/* MENU */}

        <div
          style={{
            padding: "28px 15px",
            flex: 1,
          }}
        >
          <div
            style={{
              fontSize: "11px",
              fontWeight: "700",
              letterSpacing: "2px",
              color: "#6e84a9",
              padding: "0 10px 14px",
            }}
          >
            MAIN MENU
          </div>

          {menuItems.map((item) => {
            const active =
              location.pathname === item.path;

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                style={{
                  width: "100%",
                  border: "none",
                  borderRadius: "9px",
                  padding: "15px 12px",
                  marginBottom: "6px",
                  background: active
                    ? "#2864e8"
                    : "transparent",
                  color: "#ffffff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  fontSize: "15px",
                  fontWeight: active ? "600" : "400",
                  textAlign: "left",
                }}
              >
                <span
                  style={{
                    width: "25px",
                    fontSize: "19px",
                  }}
                >
                  {item.icon}
                </span>

                {item.name}
              </button>
            );
          })}
        </div>

        {/* STUDENT PROFILE */}

        <div
          style={{
            borderTop:
              "1px solid rgba(255,255,255,0.08)",
            padding: "20px 22px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "18px",
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                background: "#2864e8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "700",
                fontSize: "18px",
              }}
            >
              {student.name.charAt(0)}
            </div>

            <div>
              <div
                style={{
                  fontWeight: "700",
                  fontSize: "14px",
                }}
              >
                {student.name}
              </div>

              <div
                style={{
                  color: "#8ea4c8",
                  fontSize: "12px",
                  marginTop: "3px",
                }}
              >
                Student
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "7px",
              border: "1px solid #34435f",
              background: "transparent",
              color: "#ff9a9a",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* =====================================================
          RIGHT SIDE
      ===================================================== */}

      <main
        style={{
          marginLeft: "270px",
          minHeight: "100vh",
        }}
      >
        {/* TOP HEADER */}

        <header
          style={{
            margin: "22px 28px 0",
            background: "#0b142a",
            minHeight: "98px",
            padding: "20px 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#ffffff",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "18px",
                fontWeight: "700",
              }}
            >
              🎓 School ERP
            </div>

            <div
              style={{
                color: "#91a6c9",
                fontSize: "14px",
                marginTop: "8px",
              }}
            >
              Student Portal
            </div>
          </div>

          <button
            onClick={handleLogout}
            style={{
              background: "#f44343",
              color: "#ffffff",
              border: "none",
              borderRadius: "6px",
              padding: "13px 24px",
              fontSize: "14px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </header>

        {/* =================================================
            CURRENT PAGE
        ================================================= */}

        <div
          style={{
            padding: "30px 28px 50px",
          }}
        >
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default StudentLayout;