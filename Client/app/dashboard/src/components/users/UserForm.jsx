import { useState } from "react";
import Select from "../common/Select";

function UserForm({ form, onChange, roles }) {
  const [showPassword, setShowPassword] = useState(false);

  const generatePassword = () => {
    const length = 12;

    const lower = "abcdefghijklmnopqrstuvwxyz";
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    const all = lower + upper + numbers + symbols;

    let password = "";

    password += lower[Math.floor(Math.random() * lower.length)];
    password += upper[Math.floor(Math.random() * upper.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];

    for (let i = password.length; i < length; i++) {
      password += all[Math.floor(Math.random() * all.length)];
    }

    password = password
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");

    onChange("password", password);
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
            onChange={(e) => onChange("nombre", e.target.value)}
            placeholder="Nombre del usuario"
          />
        </div>

        <div className="form-group">
          <label>Apellido</label>
          <input
            value={form.apellido}
            onChange={(e) => onChange("apellido", e.target.value)}
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
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="email@empresa.com"
          />
        </div>

        <div className="form-group">
          <label>Contraseña</label>

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={(e) => onChange("password", e.target.value)}
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
            onChange={(e) => onChange("puesto", e.target.value)}
            placeholder="Ej: Diseñador"
          />
        </div>

        <div className="form-group">
          <label>Rol</label>

          <Select
            options={roles}
            value={form.rol}
            onChange={(value) => onChange("rol", value)}
            placeholder="Seleccionar rol"
          />
        </div>
      </div>

      {/* ESTADO */}
      <div className="form-row">
        <div className="form-group">
          <label>Estatus</label>

          <div
            className="status-toggle"
            onClick={() => onChange("activo", !form.activo)}
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