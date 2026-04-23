import { useState } from "react";

function UserForm({ form, setForm, roles }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const generatePassword = () => {
    const newPass = Math.random().toString(36).slice(-10);
    handleChange("password", newPass);
    setShowPassword(true);
  };

  return (
    <div className="user-form">

      {/* NOMBRE / APELLIDO */}
      <div className="form-row">
        <div className="form-group">
          <label>Nombre</label>
          <input
            value={form.nombre}
            onChange={(e) => handleChange("nombre", e.target.value)}
            placeholder="Nombre del usuario"
          />
        </div>

        <div className="form-group">
          <label>Apellido</label>
          <input
            value={form.apellido}
            onChange={(e) => handleChange("apellido", e.target.value)}
            placeholder="Apellido del usuario"
          />
        </div>
      </div>

      {/* EMAIL / PASSWORD */}
      <div className="form-row">
        <div className="form-group">
          <label>Email</label>
          <input
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="email@empresa.com"
          />
        </div>

        <div className="form-group">
          <label>Contraseña</label>

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              placeholder="Ingresar contraseña"
            />

            <i
              className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          <span className="suggest-password" onClick={generatePassword}>
            Sugerir contraseña segura
          </span>
        </div>
      </div>

      {/* PUESTO / ROL */}
      <div className="form-row">
        <div className="form-group">
          <label>Puesto</label>
          <input
            value={form.puesto}
            onChange={(e) => handleChange("puesto", e.target.value)}
            placeholder="Ej: Diseñador"
          />
        </div>

        <div className="form-group">
            <label>Rol</label>

            <select
                value={form.rol}
                onChange={(e) => setForm({ ...form, rol: e.target.value })}
                className="select-input"
            >
                <option value="">Seleccionar rol</option>

                {roles.map((rol) => (
                    <option key={rol._id} value={rol._id}>
                        {rol.nombre}
                    </option>
                ))}
            </select>
            </div>
        </div>

      {/* ESTADO */}
      <div className="form-row">
        <div className="form-group">
          <label>Estatus</label>

          <div
            className="status-toggle"
            onClick={() => handleChange("activo", !form.activo)}
          >
            <i
              className={`bi ${
                form.activo ? "bi-toggle-on" : "bi-toggle-off"
              }`}
            />
            <span>{form.activo ? "Activo" : "Inactivo"}</span>
          </div>
        </div>
      </div>

    </div>
  );
}

export default UserForm;