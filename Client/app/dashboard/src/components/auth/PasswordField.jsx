import { useState } from "react";

function PasswordField({ label }) {
  const [show, setShow] = useState(false);

  return (
    <div className="input-group">
      <label>{label}</label>

      <div className="password-wrapper">
        <input
          type={show ? "text" : "password"}
          placeholder="contraseña"
        />

        <span
          className="eye"
          onClick={() => setShow(!show)}
        >
          👁
        </span>
      </div>
    </div>
  );
}

export default PasswordField;