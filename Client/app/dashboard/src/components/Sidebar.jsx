import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <nav className="sidebar d-flex flex-column p-3 pe-0">

      <div className="user-icon mb-4">
        <i className="bi bi-person-circle ps-3 mt-4"></i>
      </div>

      <ul className="nav flex-column">

        <li className="nav-item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              "nav-link " + (isActive ? "active" : "")
            }
          >
            Inicio
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/proyectos"
            className={({ isActive }) =>
              "nav-link " + (isActive ? "active" : "")
            }
          >
            Proyectos
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/clientes"
            className={({ isActive }) =>
              "nav-link " + (isActive ? "active" : "")
            }
          >
            Clientes
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/formularios"
            className={({ isActive }) =>
              "nav-link " + (isActive ? "active" : "")
            }
          >
            Formularios
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/estadisticas"
            className={({ isActive }) =>
              "nav-link " + (isActive ? "active" : "")
            }
          >
            Estadísticas
          </NavLink>
        </li>

      </ul>
    </nav>
  );
}

export default Sidebar;