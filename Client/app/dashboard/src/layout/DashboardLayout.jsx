import { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Topbar from "../components/Topbar.jsx";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="layout">

      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="main">
        <div className="content">

          {/* 👇 le pasamos el toggle al topbar */}
          <Topbar setIsOpen={setIsOpen} />

          <div className="page">
            <Outlet />
          </div>

        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;