import { useEffect, useRef } from "react";
import "./ValuesSection.css";

const values = [
  {
    title: "Cercanía",
    desc: "Nos vinculamos desde el diálogo, la escucha y la empatía. Creemos en las relaciones reales, humanas y transparentes."
  },
  {
    title: "Sensibilidad",
    desc: "Leemos a las personas, a las marcas y a los contextos. Trabajamos desde la emoción, la intuición formada y la mirada atenta."
  },
  {
    title: "Creatividad con propósito",
    desc: "La creatividad no es adorno: es una herramienta para comunicar con sentido y construir marcas memorables."
  },
  {
    title: "Estrategia",
    desc: "Nada se hace porque sí. Cada decisión tiene intención, fundamento y dirección."
  },
  {
    title: "Artesanalidad",
    desc: "Cuidamos los procesos, los detalles y la calidad. Hacemos a medida, para que cada proyecto tenga identidad propia."
  },
  {
    title: "Evolución constante",
    desc: "Aprender, adaptarse y crecer es parte de nuestra esencia. CABE existe en movimiento."
  },
  {
    title: "Colaboración",
    desc: "Trabajamos con personas elegidas especialmente para cada proyecto, confiando en el talento colectivo."
  },
  {
    title: "Coherencia",
    desc: "Lo que pensamos, decimos y hacemos tiene un mismo hilo. La coherencia sostiene la identidad del equipo y de cada marca."
  },
  {
    title: "Honestidad",
    desc: "Somos claros, sinceros y responsables. Decimos lo que pensamos con respeto y trabajamos con integridad."
  }
];

function ValuesSection() {
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
    <section className="values" ref={sectionRef}>
      

      <h2 className="values-title reveal">
        NUESTROS <span> VALORES</span>
      </h2>

      <div className="values-list">
        {values.map((item, index) => (
          <div
            className="value-item reveal"
            style={{ transitionDelay: `${index * 0.12}s` }}
            key={index}
          >
            <div className="value-inner">
              <div className="value-name">
                <span className="value-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item.title}
              </div>
              <div className="value-desc">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}

export default ValuesSection;
