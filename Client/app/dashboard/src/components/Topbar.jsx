import { getUser, logoutAndRedirect } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Topbar({ setIsOpen }) {
  const [user, setUser] = useState(getUser());
  const navigate = useNavigate();

  useEffect(() => {
    const updateUser = () => setUser(getUser());
    window.addEventListener("userUpdated", updateUser);
    return () => window.removeEventListener("userUpdated", updateUser);
  }, []);

  const initials = user
    ? `${user?.nombre?.[0] || ""}${user?.apellido?.[0] || ""}`.toUpperCase()
    : "";

  return (
    <div className="topbar">

      {/* 👈 IZQUIERDA (solo mobile) */}
      <div className="topbar-left">
        <i
          className="bi bi-list"
          onClick={() => setIsOpen(prev => !prev)}
        ></i>
      </div>

      {/* DERECHA */}
      <div className="topbar-right">
        <i className="bi bi-bell notification-icon"></i>

        <div className="user-menu">
          <div className="user-avatar" onClick={() => navigate("/perfil")}>
            {user?.avatar ? (
              <img src={user.avatar} alt="avatar" />
            ) : (
              initials
            )}
          </div>

          <div className="user-dropdown">
            <span className="dropdown-label">Actualmente en</span>

            <div className="dropdown-user" onClick={() => navigate("/perfil")}>
              <div className="dropdown-avatar">
                {user?.avatar ? (
                  <img src={user.avatar} alt="avatar" />
                ) : (
                  initials
                )}
              </div>

              <div className="dropdown-info">
                <span className="name">
                  {user?.nombre} {user?.apellido}
                </span>
                <span className="email">{user?.email}</span>
              </div>
            </div>

            <div className="dropdown-divider" />

            <div className="dropdown-logout" onClick={logoutAndRedirect}>
              Cerrar sesión
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;