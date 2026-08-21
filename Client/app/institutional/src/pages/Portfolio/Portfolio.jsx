import "./Portfolio.css";
import PortfolioProject from "../../components/PortfolioProject/PortfolioProject";
import projects from "../../data/projects";

function Portfolio() {
  return (
    <main className="portfolio-page">

      <section className="portfolio-page-hero">

        <span className="portfolio-page-label">
          PORTFOLIO
        </span>

        <div className="portfolio-page-heading">

          <h1>Proyectos</h1>
        </div>

      </section>

      <section className="portfolio-projects">

        {projects.map((project) => (
          <PortfolioProject
            key={project.slug}
            title={project.title}
            services={project.services}
            slug={project.slug}
            size={project.size}
          />
        ))}

      </section>

    </main>
  );
}

export default Portfolio;