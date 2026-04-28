import { getUser, getToken } from "../../utils/auth";
import { useEffect, useState } from "react";
import ProfileForm from "./ProfileForm";

function EditProfilePage() {
  const user = getUser();
  const [data, setData] = useState(null);

  useEffect(() => {
  if (!user?.id) return;

  const fetchUser = async () => {
    const res = await fetch(
      `http://localhost:3000/usuario/byId/${user.id}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    );

    const result = await res.json();
    setData(result);
  };

  fetchUser();
}, [user?.id]);

  if (!data) return <p>Cargando...</p>;

  return (
    <div className="edit-profile-page">

      {/* HEADER */}
      <div className="edit-profile-header">
        <div className="profile-avatar small">
          {data.nombre?.[0]}{data.apellido?.[0]}
        </div>

        <h1 className="profile-name">
          {data.nombre} {data.apellido}
          <span className="divider"> / </span>
          <span className="edit-text">Editar Perfil</span>
        </h1>
      </div>

      <div className="modal-divider" />

      <ProfileForm user={data} />

    </div>
  );
}

export default EditProfilePage;