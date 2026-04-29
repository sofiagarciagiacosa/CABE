import { getUser, logoutAndRedirect } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


function Topbar() {
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    const updateUser = () => {
      setUser(getUser());
    };

    window.addEventListener("userUpdated", updateUser);

    return () => window.removeEventListener("userUpdated", updateUser);
  }, []);
  const navigate = useNavigate();

  const initials = user
    ? `${user?.nombre?.[0] || ""}${user?.apellido?.[0] || ""}`.toUpperCase()
    : "";

  const handleLogout = () => {
    logoutAndRedirect();
  };

  const goToProfile = () => {
    navigate("/perfil"); 
  };

  return (
    <div className="topbar">
      <div className="topbar-right">

        <i className="bi bi-bell notification-icon"></i>

        {/* 👇 WRAPPER PARA HOVER */}
        <div className="user-menu">

          <div className="user-avatar" onClick={goToProfile}>
            {user?.avatar ? (
              <img src={user.avatar} alt="avatar" />
            ) : (
              initials
            )}
          </div>

          {/* 👇 DROPDOWN */}
          <div className="user-dropdown">

            <span className="dropdown-label">Actualmente en</span>

            <div className="dropdown-user" onClick={goToProfile}>
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

            <div className="dropdown-logout" onClick={handleLogout}>
              Cerrar sesión
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Topbar;