import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#eef4ff",
      }}
    >
      <Outlet />
    </div>
  );
}

export default AuthLayout;