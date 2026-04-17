import Sidebar from "../components/Sidebar.jsx";
import "../styles/style.css";
import { Outlet } from "react-router-dom";

function DashboardLayout({ children }) {
  return (
    <div className="layout">
      <Sidebar />
      <Outlet />

      <main className="content">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;