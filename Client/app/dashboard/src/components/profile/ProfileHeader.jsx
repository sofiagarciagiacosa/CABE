import { useNavigate } from "react-router-dom";
import { getUser } from "../../utils/auth";
import { useEffect, useState } from "react";


function ProfileHeader() {
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

  return (
    <div className="profile-header">

      <div className="profile-avatar">
        {user?.avatar ? (
          <img src={user.avatar} alt="avatar" />
        ) : (
          initials
        )}
      </div>

      <div className="profile-info">
        <h1 className="profile-name">
          {user?.nombre} {user?.apellido}
        </h1>

        <span className="profile-role">
          {user?.rol}
        </span>

        <span className="profile-email">
          {user?.email}
        </span>

        <button className="edit-profile-btn" onClick={() => navigate("/perfil/editar")}>
          Editar Perfil
        </button>
      </div>

    </div>
  );
}

export default ProfileHeader;