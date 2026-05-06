import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../assets/ISO NEGRO CON ESP. DE RESPETO.png";

function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 800;
      setIsMobile(mobile);

      // 👇 comportamiento distinto según dispositivo
      if (mobile) {
        setIsOpen(false); // oculto
      } else {
        setIsOpen(true); // abierto normal
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [setIsOpen]);

  const menuItems = [
    { name: "Inicio", path: "/", icon: "bi-house", activeIcon: "bi-house-fill" },
    { name: "Proyectos", path: "/proyectos", icon: "bi-kanban", activeIcon: "bi-kanban-fill" },
    { name: "Perfil", path: "/perfil", icon: "bi-person", activeIcon: "bi-person-fill" },
    { name: "Clientes", path: "/clientes", icon: "bi-people", activeIcon: "bi-people-fill" },
    { name: "Formularios", path: "/formularios", icon: "bi-file-earmark-text", activeIcon: "bi-file-earmark-text-fill" },
    { name: "Estadísticas", path: "/estadisticas", icon: "bi-bar-chart", activeIcon: "bi-bar-chart-fill" },
  ];

  return (
    <nav
      className={`sidebar 
        ${!isMobile && !isOpen ? "closed" : ""} 
        ${isMobile && isOpen ? "open mobile" : ""}
      `}
    >
      {/* HEADER (DESKTOP) */}
      <div className="sidebar-header">
        <button
          className="sidebar-toggle"
          onClick={() => setIsOpen(prev => !prev)}
        >
          <i className="bi bi-list"></i>
        </button>

        <div
          className="sidebar-logo"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="Logo" />
        </div>
      </div>

      {/* NAV */}
      <ul className="nav flex-column">
        {menuItems.map((item) => (
          <li key={item.name} className="nav-item">
            <NavLink
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                "nav-link " + (isActive ? "active" : "")
              }
              onClick={() => {
                if (isMobile) setIsOpen(false);
              }}
            >
              {({ isActive }) => (
                <>
                  <i className={`bi ${isActive ? item.activeIcon : item.icon}`}></i>
                  <span className="link-text">{item.name}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;