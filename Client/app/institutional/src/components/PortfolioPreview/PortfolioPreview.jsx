import "./PortfolioPreview.css";
import ProjectCard from "../ProjectCard/ProjectCard";
import CTA from "../CTA/CTA";
import { useEffect } from "react";


function PortfolioPreview() {
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");

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

    reveals.forEach((el) => observer.observe(el));
  }, []);

  return (
    <section className="portfolio-preview">

      {/* BLOQUE ROJO */}
      <div className="portfolio-hero reveal">
        <div className="portfolio-hero-inner">

          <p className="portfolio-manifesto">
            ASPIRAMOS A CONSTRUIR UN ESPACIO CREATIVO QUE EVOLUCIONE JUNTO A LAS
            PERSONAS QUE LO INTEGRAN, Y A TRABAJAR CON CLIENTES QUE VALOREN LA
            PROFUNDIDAD DEL PROCESO, LA CLARIDAD ESTRATÉGICA Y LA BÚSQUEDA
            CONSTANTE DE SENTIDO.
          </p>

          <div className="portfolio-header">

            <div className="portfolio-title-block">
              <span className="portfolio-label">
                FEATURED WORK
              </span>

              <div className="portfolio-heading">
                <span className="portfolio-star">✦</span>
                <h2 className="portfolio-title">
                  Proyectos
                </h2>
              </div>
            </div>

            <CTA href="/proyectos">VER MÁS</CTA>

          </div>

        </div>
      </div>

      {/* BLOQUE BLANCO */}
      <div className="portfolio-content">
        <div className="projects-grid">
          <ProjectCard title="Marca uno" services="Branding / Producción" />
          <ProjectCard title="Marca x" services="Redes / Estrategia" />
          <ProjectCard title="Otra marca" services="Identidad / Web" />
          <ProjectCard title="Última" services="Contenido / Campaña" />
        </div>
      </div>

    </section>
  );
}

export default PortfolioPreview;
