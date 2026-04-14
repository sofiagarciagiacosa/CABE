import { useEffect, useRef } from "react";
import "../../styles/auth/login.css";
import LoginCard from "../../components/auth/LoginCard";

function LoginPage() {
  const bgRef = useRef(null);
  const cardRef = useRef(null);

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
      console.log(x, y);

      bg.style.transform = `
        translate(${x}px, ${y}px) 
        scale(1.15)
      `;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="login-page">
      <div className="gradient-bg" ref={bgRef} />
      <LoginCard cardRef={cardRef} />
    </div>
  );
}

export default LoginPage;