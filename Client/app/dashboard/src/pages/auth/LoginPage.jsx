import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/auth/login.css";
import LoginCard from "../../components/auth/LoginCard";

function LoginPage() {
  const bgRef = useRef(null);
  const cardRef = useRef(null);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const bg = bgRef.current;
      const card = cardRef.current;

      if (!bg || !card) return;

      const rect = card.getBoundingClientRect();

      const isInsideCard =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (isInsideCard) return;

      const x = (e.clientX / window.innerWidth - 0.5) * 220;
      const y = (e.clientY / window.innerHeight - 0.5) * 220;

      bg.style.transform = `translate(${x}px, ${y}px) scale(1.15)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  

  return (
    <div className="login-page">
      <div className="gradient-bg" ref={bgRef} />

      <LoginCard
        cardRef={cardRef}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />
    </div>
  );
}

export default LoginPage;