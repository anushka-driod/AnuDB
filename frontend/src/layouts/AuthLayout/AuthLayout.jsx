import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        background: "#0F172A",
      }}
    >
      <Outlet />
    </div>
  );
}