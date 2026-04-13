function ProjectInfo({ project, responsables }) {
  const formatDate = (date) => {
    if (!date) return "Sin fecha";
    return date.split("T")[0].split("-").reverse().join("/");
  };

  return (
    <div className="project-info-container">
      <p><strong>Descripción:</strong> {project.descripcion}</p>
      <p><strong>Cliente:</strong> {project.cliente?.nombre}</p>
      <p><strong>Presupuesto:</strong> ${project.presupuesto}</p>
      <p><strong>Inicio:</strong> {formatDate(project.fechaInicio)}</p>
      <p><strong>Fin:</strong> {formatDate(project.fechaLimite)}</p>
      <p><strong>Responsables:</strong> {responsables}</p>
    </div>
  );
}

export default ProjectInfo;