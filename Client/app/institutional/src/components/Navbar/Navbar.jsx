import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/LOGO NEGRO CON ESP. DE RESP..png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // bloquear scroll al abrir menú
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }

    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [isOpen]);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <button
          className={`hamburger ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
        </button>
      </nav>

      <div className={`menu-overlay ${isOpen ? "show" : ""}`}>
        <div className="menu-content">

          <span className="menu-label">
            MENU
          </span>

          <img
            src={logo}
            alt="Logo"
            className="menu-logo"
          />

          <div className="divider"></div>

          <ul className="menu-links">

            {/* HOME */}
            <li className={location.pathname === "/" ? "active" : ""}>
              <Link
                to="/"
                className="menu-link"
                onClick={closeMenu}
              >
                <span className="link-title">
                  Home
                </span>
              </Link>
            </li>

            {/* QUÉ HACEMOS */}
            <li className={location.pathname === "/services" ? "active" : ""}>
              <Link
                to="/services"
                className="menu-link"
                onClick={closeMenu}
              >
                <span className="link-title">
                  Qué hacemos
                </span>

                <span className="link-desc">
                  Estrategia, identidad y contenido
                </span>
              </Link>
            </li>

            {/* PORTFOLIO */}
            <li className={location.pathname === "/portfolio" ? "active" : ""}>
              <Link
                to="/portfolio"
                className="menu-link"
                onClick={closeMenu}
              >
                <span className="link-title">
                  Portfolio
                </span>

                <span className="link-desc">
                  Trabajos seleccionados
                </span>
              </Link>
            </li>

            {/* NOSOTROS */}
            <li>
              <span className="link-title">
                Nosotros
              </span>

              <span className="link-desc">
                Quiénes somos
              </span>
            </li>

            {/* CONTACTO */}
            <li>
              <span className="link-title">
                Contacto
              </span>

              <span className="link-desc">
                Creemos algo increíble juntos
              </span>
            </li>

          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
