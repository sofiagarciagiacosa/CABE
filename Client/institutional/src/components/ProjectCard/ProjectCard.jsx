import "./ProjectCard.css";

function ProjectCard({ title, services }) {
  return (
    <div className="project-card reveal">
      <div className="project-image"></div>

      <div className="project-info">
        <h3>{title}</h3>
        <p>{services}</p>
      </div>
    </div>
  );
}

export default ProjectCard;
