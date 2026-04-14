import InputField from "./InputField";
import PasswordField from "./PasswordField";
import LoginButton from "./LoginButton";

function LoginCard({ cardRef }) {
  return (
    <div className="login-card"  ref={cardRef}>
      <h1 className="login-title">Bienvenido de vuelta!</h1>

      <p className="login-subtitle">
        Por favor ingresa tus datos
      </p>

      <div className="login-form">
        <InputField label="Email" placeholder="email" />
        <PasswordField label="Contraseña" />

        <a href="#" className="forgot-password">
          ¿Olvidaste tu contraseña?
        </a>

        <LoginButton text="Iniciar sesión" />
      </div>
    </div>
  );
}

export default LoginCard;