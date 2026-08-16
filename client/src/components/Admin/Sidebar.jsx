import { NavLink } from "react-router-dom";

function Sidebar() {
  const menuItems = [
    { name: "Dashboard", icon: "📊", path: "/admin/dashboard" },
    { name: "Students", icon: "🎓", path: "/admin/students" },
    { name: "Teachers", icon: "👨‍🏫", path: "/admin/teachers" },
    { name: "Parents", icon: "👨‍👩‍👧", path: "/admin/parents" },
    { name: "Attendance", icon: "🗓️", path: "/admin/attendance" },
    { name: "Performance", icon: "📈", path: "/admin/performance" },
    { name: "Fees", icon: "💰", path: "/admin/fees" },
    { name: "Exams", icon: "📝", path: "/admin/exams" },
    { name: "Courses", icon: "📚", path: "/admin/courses" },
    { name: "Activities", icon: "🏆", path: "/admin/activities" },
    { name: "Reports", icon: "📄", path: "/admin/reports" },
  ];

  return (
    <aside className="admin-sidebar">

      {/* Logo */}
      <div className="sidebar-brand">
        <div className="sidebar-logo">🎓</div>

        <div className="sidebar-brand-text">
          <h2>School ERP</h2>
          <span>Admin Portal</span>
        </div>
      </div>

      {/* Divider */}
      <div className="sidebar-divider"></div>

      {/* Menu title */}
      <div className="menu-title">MAIN MENU</div>

      {/* Navigation */}
      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <span className="sidebar-icon">
              {item.icon}
            </span>

            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="sidebar-bottom">
        <div>SCHOOL ERP</div>
        <span>Management System</span>
      </div>

    </aside>
  );
}

export default Sidebar;