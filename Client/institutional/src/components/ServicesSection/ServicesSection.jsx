import { useEffect, useRef } from "react";
import "./ServicesSection.css";

function ServicesSection() {
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
  }, []);

  return (
    <section className="services" ref={sectionRef}>
      <div className="services-line top"></div>

      <div className="services-container">

        {/* IZQUIERDA */}
        <div className="services-left reveal">
          <div className="services-left-inner">
            <h2>QUE HACEMOS</h2>
            <p>
              Trabajamos desde la estrategia, el concepto y la creatividad,
              acompañando a marcas, emprendimientos y profesionales en la
              construcción y evolución de su identidad y comunicación.
            </p>
          </div>
        </div>

        {/* DERECHA */}
        <div className="services-right">
          {[
            "Branding – Estrategia de Marca",
            "Identidad Visual – Diseño de Marca",
            "Estrategia de Redes Sociales – Comunicación Digital",
            "Aplicaciones – Piezas Gráficas Adicionales",
            "Paquetes / Combos",
            "Producción + Dirección Creativa",
            "Creación de Contenido"
          ].map((service, i) => (
            <div
              className="service-item reveal"
              style={{ transitionDelay: `${i * 0.12}s` }}
              key={i}
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
              {service}
              <div className="service-arrow">
                <svg viewBox="0 0 24 24" fill="none" className="arrow-icon">
                  <path
                    d="M5 12H19M19 12L13 6M19 12L13 18"
                    stroke="currentColor"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>


            </div>
          ))}
        </div>
      </div>

      <div className="services-line bottom"></div>
    </section>
  );
}

export default ServicesSection;
