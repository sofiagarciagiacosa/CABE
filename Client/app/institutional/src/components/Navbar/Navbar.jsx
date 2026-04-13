import { useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../../assets/LOGO NEGRO CON ESP. DE RESP..png"; 

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  }, [isOpen]);

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
          <img src={logo} alt="Logo" className="menu-logo" />
          <div className="divider"></div>

          <ul className="menu-links">
            <li className="active">
              <span className="link-title">Home</span>
            </li>

            <li>
              <span className="link-title">Qué hacemos</span>
              <span className="link-desc">Estrategia, diseño y creatividad en acción</span>
            </li>

            <li>
              <span className="link-title">Portfolio</span>
              <span className="link-desc">Proyectos que hablan por nosotros</span>
            </li>

            <li>
              <span className="link-title">Nosotros</span>
              <span className="link-desc">Las mentes detrás de las marcas</span>
            </li>

            <li>
              <span className="link-title">Contacto</span>
              <span className="link-desc">Creemos algo increíble juntos</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
