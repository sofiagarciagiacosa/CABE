import { NavLink } from "react-router-dom";
import logo from "../assets/ISO NEGRO CON ESP. DE RESPETO.png";

function Sidebar() {
  return (
    <nav className="sidebar d-flex flex-column">

      {/* LOGO */}
      <div className="sidebar-logo">
        <img src={logo} alt="Logo" />
      </div>

      {/* NAV */}
      <ul className="nav flex-column">

        <li className="nav-item">
          <NavLink to="/" className={({ isActive }) => "nav-link " + (isActive ? "active" : "")}>
            Inicio
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/proyectos" className={({ isActive }) => "nav-link " + (isActive ? "active" : "")}>
            Proyectos
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/clientes" className={({ isActive }) => "nav-link " + (isActive ? "active" : "")}>
            Clientes
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/formularios" className={({ isActive }) => "nav-link " + (isActive ? "active" : "")}>
            Formularios
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/estadisticas" className={({ isActive }) => "nav-link " + (isActive ? "active" : "")}>
            Estadísticas
          </NavLink>
        </li>

      </ul>
    </nav>
  );
}

export default Sidebar;