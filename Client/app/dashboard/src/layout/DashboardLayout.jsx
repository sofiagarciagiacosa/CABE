import Sidebar from "../components/Sidebar.jsx";
import "../styles/style.css";

function DashboardLayout({ children }) {
  return (
    <div className="layout">
      <Sidebar />

      <main className="content">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;