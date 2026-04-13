import { useNavigate } from "react-router-dom";

function ProjectCard({ project }) {
  const navigate = useNavigate();

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div
        className="project-card"
        onClick={() => navigate(`/proyectos/${project._id}`)}
      >
        <h3 className="project-title">{project.nombre}</h3>

        <p className="project-brand">
          {project.cliente?.nombre || "Sin cliente"}
        </p>

        <div className="d-flex justify-content-between project-footer">
          <span className="project-members">
            {project.responsables?.map((u) => u.nombre).join(", ")}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;