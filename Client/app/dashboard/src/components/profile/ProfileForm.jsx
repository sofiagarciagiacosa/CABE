import { useState, useRef } from "react";
import { getToken } from "../../utils/auth";

function ProfileForm({ user }) {
  const [form, setForm] = useState(user);
  const [original] = useState(user);

  const fileInputRef = useRef(null);

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  //  detectar cambios reales (mejor que JSON.stringify)
  const hasChanges =
    form.nombre !== original.nombre ||
    form.apellido !== original.apellido ||
    form.bio !== original.bio ||
    form.ubicacion !== original.ubicacion ||
    form.puesto !== original.puesto ||
    form.avatar !== original.avatar ||
    form.password;

  // seleccionar imagen
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);

    setForm((prev) => ({
      ...prev,
      avatar: preview,     // preview
      avatarFile: file     // archivo real
    }));
  };

  //  borrar avatar
  const handleRemoveAvatar = () => {
    setForm((prev) => ({
      ...prev,
      avatar: "",
      avatarFile: null
    }));
  };

  // guardar
  const handleSave = async () => {
    if (!hasChanges) {
      alert("No hay cambios para guardar");
      return;
    }

    const confirm = window.confirm("¿Guardar cambios?");
    if (!confirm) return;

    let avatarUrl = form.avatar;

    //  subir imagen si hay nueva
    if (form.avatarFile) {
      const data = new FormData();
      data.append("file", form.avatarFile);
      data.append("upload_preset", "avatars");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dknuvc4jb/image/upload",
        {
          method: "POST",
          body: data
        }
      );

      const result = await res.json();
      avatarUrl = result.secure_url;
    }

    const res = await fetch("http://localhost:3000/usuario/me", {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify({
            nombre: form.nombre,
            apellido: form.apellido,
            bio: form.bio,
            ubicacion: form.ubicacion,
            puesto: form.puesto,
            password: form.password,
            avatar: avatarUrl
        })
    });

    const updatedUser = await res.json();

    // actualizar localStorage
    const normalizedUser = {
    ...updatedUser,
    rol: updatedUser.rol?.nombre || updatedUser.rol
    };

    localStorage.setItem("user", JSON.stringify(normalizedUser));

    //  avisar a toda la app
    window.dispatchEvent(new Event("userUpdated"));

    alert("Perfil actualizado");
  };

  return (
    <div className="user-form centered">

      {/* INPUT FILE OCULTO */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* AVATAR */}
      <div className="avatar-section">

        <div className="profile-avatar large">
          {form.avatar ? (
            <img src={form.avatar} alt="avatar" />
          ) : (
            `${form.nombre?.[0] || ""}${form.apellido?.[0] || ""}`
          )}
        </div>

        <div className="avatar-actions">
          <button
            className="btn btn-grey-outline btn-sm"
            onClick={() => fileInputRef.current.click()}
          >
            Cambiar
          </button>

          <button
            className="btn btn-grey-fill btn-sm"
            disabled={!form.avatar}
            onClick={handleRemoveAvatar}
          >
            Borrar
          </button>
        </div>
      </div>

      {/* NOMBRE */}
      <div className="form-group">
        <label>Nombre</label>
        <input
          value={form.nombre || ""}
          onChange={(e) => handleChange("nombre", e.target.value)}
          placeholder="Tu nombre"
        />
      </div>

      {/* APELLIDO */}
      <div className="form-group">
        <label>Apellido/s</label>
        <input
          value={form.apellido || ""}
          onChange={(e) => handleChange("apellido", e.target.value)}
          placeholder="Tu apellido"
        />
      </div>

      {/* EMAIL */}
      <div className="form-group">
        <label>Email</label>
        <input value={form.email} disabled />
      </div>

      {/* BIO */}
      <div className="form-group">
        <label>Bio</label>
        <input
          value={form.bio || ""}
          onChange={(e) => handleChange("bio", e.target.value)}
          placeholder="Contá tu historia"
        />
      </div>

      {/* UBICACIÓN */}
      <div className="form-group">
        <label>Ubicación</label>
        <input
          value={form.ubicacion || ""}
          onChange={(e) => handleChange("ubicacion", e.target.value)}
          placeholder="📍 Córdoba, Argentina"
        />
      </div>

      {/* ROL */}
      <div className="form-group">
        <label>Rol</label>
        <input value={form.rol?.nombre} disabled />
      </div>

      {/* PUESTO */}
      <div className="form-group">
        <label>Puesto</label>
        <input
          value={form.puesto || ""}
          onChange={(e) => handleChange("puesto", e.target.value)}
          placeholder="Ej: Diseñadora UX"
        />
      </div>

      {/* PASSWORD */}
      <div className="form-group">
        <label>Contraseña</label>
        <input
          type="password"
          onChange={(e) => handleChange("password", e.target.value)}
          placeholder="Nueva contraseña"
        />
      </div>

      {/* BOTONES */}
      <div className="modal-footer">
        <button
          className="cancel-btn"
          onClick={() => window.location.reload()}
        >
          Cancelar
        </button>

        <button
          className="save-btn"
          onClick={handleSave}
          disabled={!hasChanges}
        >
          Guardar
        </button>
      </div>

    </div>
  );
}

export default ProfileForm;