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
}) {
  return (
    <div className="login-card" ref={cardRef}>
      <img src={logo} alt="Logo" className="login-logo" />

      <h1 className="login-title">Bienvenido de vuelta</h1>

      <p className="login-subtitle">
        Por favor ingresa tus datos
      </p>

      <div className="login-form">
        <InputField
          label="Email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <PasswordField
          label="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <a href="#" className="forgot-password">
          ¿Olvidaste tu contraseña?
        </a>

        <LoginButton
          text="Iniciar sesión"
          onClick={handleLogin}
        />
      </div>
    </div>
  );
}

export default LoginCard;