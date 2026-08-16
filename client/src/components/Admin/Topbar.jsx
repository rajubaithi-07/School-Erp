import { useNavigate } from "react-router-dom";

function Topbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("token");

    navigate("/login/admin");
  };

  return (
    <header className="admin-topbar">
      <div className="topbar-left">
        <h1>Admin Dashboard</h1>
        <p>Manage your school from one place</p>
      </div>

      <div className="topbar-right">
        <button
          className="notification-btn"
          type="button"
          title="Notifications"
        >
          🔔
        </button>

        <div className="admin-profile">
          <div className="profile-avatar">A</div>

          <div className="profile-info">
            <strong>Admin</strong>
            <span>Administrator</span>
          </div>
        </div>

        <button
          className="logout-btn"
          type="button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Topbar;