function Sidebar() {
  return (
    <aside
      style={{
        width: "250px",
        background: "#1e3a8a",
        color: "#fff",
        height: "100vh",
        padding: "20px",
      }}
    >
      <h2>Menu</h2>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          marginTop: "30px",
        }}
      >
        <li>Dashboard</li>
        <br />
        <li>Students</li>
        <br />
        <li>Teachers</li>
        <br />
        <li>Parents</li>
        <br />
        <li>Settings</li>
      </ul>
    </aside>
  );
}

export default Sidebar;