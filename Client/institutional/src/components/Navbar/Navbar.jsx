import { useState } from "react";
import "./Navbar.css";
import logo from "../../assets/L.ROJO.png"; 

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <img src={logo} alt="Logo" className="navbar-logo" />

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
            <li>Home</li>
            <li>Qué hacemos</li>
            <li>Portfolio</li>
            <li>Sobre nosotros</li>
            <li>Contacto</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
