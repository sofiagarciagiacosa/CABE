import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../../styles/auth/login.css";

import PasswordField from "../../components/auth/PasswordField";
import LoginButton from "../../components/auth/LoginButton";
import logo from "../../assets/ISO NEGRO CON ESP. DE RESPETO.png";

function ResetPasswordPage() {
  const [params] = useSearchParams();
  const token = params.get("token");

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleReset = async () => {
    if (!password || !confirm) {
      alert("Completá todos los campos");
      return;
    }

    if (password !== confirm) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:3000/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Contraseña actualizada");

      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 GENERADOR DE PASSWORD
  const generatePassword = () => {
    const length = 12;

    const lower = "abcdefghijklmnopqrstuvwxyz";
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    const all = lower + upper + numbers + symbols;

    let newPassword = "";

    newPassword += lower[Math.floor(Math.random() * lower.length)];
    newPassword += upper[Math.floor(Math.random() * upper.length)];
    newPassword += numbers[Math.floor(Math.random() * numbers.length)];
    newPassword += symbols[Math.floor(Math.random() * symbols.length)];

    for (let i = newPassword.length; i < length; i++) {
      newPassword += all[Math.floor(Math.random() * all.length)];
    }

    newPassword = newPassword
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");

    setPassword(newPassword);
    setConfirm(newPassword);
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <img src={logo} alt="Logo" className="login-logo" />

        <h1 className="login-title">
          Restablecer contraseña
        </h1>

        <p className="login-subtitle">
          Ingresá una nueva contraseña
        </p>

        <div className="login-form">

          <PasswordField
            label="Nueva contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <PasswordField
            label="Confirmar contraseña"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />

          {/*  GENERAR PASSWORD */}
          <button
            type="button"
            className="forgot-password"
            onClick={generatePassword}
          >
            Generar contraseña segura
          </button>

          <LoginButton
            text="Restablecer contraseña"
            onClick={handleReset}
            disabled={!password || password !== confirm}
          />

        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;