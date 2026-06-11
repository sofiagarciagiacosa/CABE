import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./ServicesSection.css";

const services = [
  {
    title: "Estrategia y construcción de marca",
    slug: "estrategia"
  },
  {
    title: "Branding y desarrollo visual",
    slug: "branding"
  },
  {
    title: "Creación de contenido",
    slug: "contenido"
  },
  {
    title: "Dirección creativa y producción",
    slug: "direccion-creativa"
  },
  {
    title: "Acompañamiento y consultoría",
    slug: "consultoria"
  }
];

function ServicesSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const elements =
      sectionRef.current.querySelectorAll(".reveal");

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

    elements.forEach((el) =>
      observer.observe(el)
    );

    return () => observer.disconnect();
  }, []);

  return (
    <section className="services" ref={sectionRef}>
      <div className="services-container">

        {/* IZQUIERDA */}
        <div className="services-left reveal">
          <div className="services-left-inner">

            <span className="services-label">
              WHAT WE DO
            </span>

            <div className="services-heading">
              <span className="services-icon icon-1">
                ✦
              </span>

              <h2>
                Qué <br />
                hacemos
              </h2>

              <span className="services-icon icon-2">
                ✦
              </span>
            </div>

          </div>
        </div>

        {/* DERECHA */}
        <div className="services-right">
          {services.map((service, i) => (
            <Link
              to={`/services#${service.slug}`}
              className="service-item reveal"
              key={i}
            >
              {service.title}

              <div className="service-arrow">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="arrow-icon"
                >
                  <path
                    d="M5 12H19M19 12L13 6M19 12L13 18"
                    stroke="currentColor"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

export default ServicesSection;