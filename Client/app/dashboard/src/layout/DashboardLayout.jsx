import Sidebar from "../components/Sidebar.jsx";
import Topbar from "../components/Topbar.jsx";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="layout">

      <Sidebar />

      <div className="main">
        <div className="content">

          <Topbar />   {/* dentro */}

          <div className="page">
            <Outlet />
          </div>

        </div>
      </div>

    </div>
  );
}

export default DashboardLayout;