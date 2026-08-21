import { Link } from "react-router-dom";
import "./PortfolioProject.css";

function PortfolioProject({
  title,
  services,
  slug,
}) {
  return (
    <article className="portfolio-project">

      <Link
        to={`/portfolio/${slug}`}
        className="portfolio-project-image"
      >
        {/* después irá la foto */}
      </Link>

      <div className="portfolio-project-body">

        <div className="portfolio-project-info">
          <div>

            <h2>{title}</h2>

            <p>{services}</p>
          </div>
        </div>

        <Link
          to={`/portfolio/${slug}`}
          className="portfolio-project-link"
        >
          <span>Ver proyecto</span>

          <span className="arrow">
            →
          </span>
        </Link>

      </div>

    </article>
  );
}

export default PortfolioProject;