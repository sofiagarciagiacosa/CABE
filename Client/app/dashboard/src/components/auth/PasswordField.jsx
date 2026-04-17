import { useState } from "react";

function PasswordField({ label, value, onChange }) {
  const [show, setShow] = useState(false);

  return (
    <div className="input-group">
      <label>{label}</label>

      <div className="password-wrapper">
        <input
          type={show ? "text" : "password"}
          placeholder="contraseña"
          value={value}
          onChange={onChange}
        />

        <span
            className="eye"
            onClick={() => setShow(!show)}
        >
            <i className={`bi ${show ? "bi-eye-slash" : "bi-eye"}`}></i>
        </span>
      </div>
    </div>
  );
}

export default PasswordField;