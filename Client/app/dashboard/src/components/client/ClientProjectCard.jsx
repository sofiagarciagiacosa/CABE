import { useNavigate } from "react-router-dom";

function ClientProjectCard({
  project,
  clienteId,
}) {
  const navigate =
    useNavigate();

  const totalTareas =
    project.stats
        ?.totalTareas || 0;

  const porHacer =
    project.stats
        ?.porHacer || 0;

  const ultimaActividad =
    project.updatedAt
      ? new Date(
          project.updatedAt
        ).toLocaleDateString(
          "es-AR"
        )
      : "Sin actividad";

  const responsables =
    project.responsables
      ?.map((u) => u.nombre)
      .join(", ");

  return (
    <div
      className="client-project-card"
      onClick={() =>
        navigate(
            `/proyectos/${project._id}`,
            {
            state: {
                fromClient: true,
                clienteId,
            },
            }
        )
      }
    >
      {/* top */}

      <div className="client-project-top">

        <span className="client-project-badge">

          Proyecto

        </span>

      </div>

      {/* title */}

      <h3 className="client-project-title">
        {project.nombre}
      </h3>

      {/* description */}

      {project.descripcion && (
        <p className="client-project-description">
          {
            project.descripcion
          }
        </p>
      )}

      {/* meta */}

      <div className="client-project-meta">

        <span>
        {totalTareas} tareas
        {" • "}

        {porHacer > 0
            ? `${porHacer} por hacer`
            : "Todo al día ✓"}
        </span>

      </div>

      {/* responsibles */}

      {responsables && (
        <div className="client-project-members">

          <i className="bi bi-people" />

          <span>
            {responsables}
          </span>

        </div>
      )}

      {/* footer */}

      <div className="client-project-footer">

        <span>
          Última actividad:
        </span>

        <span>
          {ultimaActividad}
        </span>

      </div>

    </div>
  );
}

export default ClientProjectCard;