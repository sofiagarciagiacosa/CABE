import { useState } from "react";
import { getToken } from "../../utils/auth";

function ProfileForm({ user }) {
  const [form, setForm] = useState(user);
  const [original] = useState(user);

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const hasChanges = JSON.stringify(form) !== JSON.stringify(original);

  const handleSave = async () => {
    if (!hasChanges) {
      alert("No hay cambios para guardar");
      return;
    }

    const confirm = window.confirm("¿Guardar cambios?");
    if (!confirm) return;

    await fetch("http://localhost:3000/usuario/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify(form)
    });

    alert("Perfil actualizado");
  };

  return (
    <div className="user-form centered">

      {/* AVATAR */}
      <div className="avatar-section">
        <div className="profile-avatar large">
          {form.nombre?.[0]}{form.apellido?.[0]}
        </div>

        <div className="avatar-actions">
          <button className="btn-outline">Cambiar</button>
          <button className="btn-grey">Borrar</button>
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

      {/* EMAIL (NO editable 👈 recomendado) */}
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

      {/* ROL (solo visual 👈 importante) */}
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