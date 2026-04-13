import { useEffect, useRef } from "react";
import CTA from "../CTA/CTA";
import "./HomeIntro.css";

function HomeIntro() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const elements = sectionRef.current.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="home-intro" ref={sectionRef}>
      
      {/* IZQUIERDA */}
      <div className="intro-left">
        <h1>
          <span className="intro-small">Hola, somos</span>
          <span className="intro-big">CABE</span>
        </h1>

      </div>

      {/* DERECHA */}
      <div className="intro-right">

        <p className="intro-main reveal">
          Nuestra misión es crear comunicación con sentido, acompañando a marcas
          y personas desde la estrategia, la sensibilidad y el criterio.
        </p>

        <div className="intro-line reveal"></div>

        <div className="intro-bottom reveal">
          <p className="intro-sub">
            Diseñamos procesos a medida, construimos marcas con identidad y
            desarrollamos contenido que conecta de forma auténtica.
          </p>

          <CTA to="/nosotros">NOSOTROS</CTA>
        </div>

      </div>
    </section>
  );
}

export default HomeIntro;
