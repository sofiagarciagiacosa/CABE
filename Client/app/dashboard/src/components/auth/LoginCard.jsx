import InputField from "./InputField";
import PasswordField from "./PasswordField";
import LoginButton from "./LoginButton";
import logo from "../../assets/ISO NEGRO CON ESP. DE RESPETO.png";

function LoginCard({
  cardRef,
  email,
  setEmail,
  password,
  setPassword,
  handleLogin,
  handleForgotPassword,
  mode,
  setMode,
}) {
  return (
    <div className="login-card" ref={cardRef}>
      <img src={logo} alt="Logo" className="login-logo" />

      {/* 🔥 TÍTULO */}
      <h1 className="login-title">
        {mode === "login"
          ? "Bienvenido de vuelta"
          : "Restablecer contraseña"}
      </h1>

      {/* 🔥 SUBTÍTULO */}
      <p className="login-subtitle">
        {mode === "login"
          ? "Por favor ingresa tus datos"
          : "Te enviaremos un correo para recuperar tu contraseña"}
      </p>

      <div className="login-form">
        {/* EMAIL */}
        <InputField
          label="Email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD SOLO EN LOGIN */}
        {mode === "login" && (
          <PasswordField
            label="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}

        {/* LINK */}
        {mode === "login" ? (
          <button
            className="forgot-password"
            type="button"
            onClick={() => setMode("forgot")}
          >
            ¿Olvidaste tu contraseña?
          </button>
        ) : (
          <button
            className="forgot-password"
            type="button"
            onClick={() => setMode("login")}
          >
            Volver al login
          </button>
        )}

        {/* BOTÓN */}
        <LoginButton
          text={mode === "login" ? "Iniciar sesión" : "Enviar"}
          onClick={
            mode === "login"
              ? handleLogin
              : handleForgotPassword
          }
        />
      </div>
    </div>
  );
}

export default LoginCard;