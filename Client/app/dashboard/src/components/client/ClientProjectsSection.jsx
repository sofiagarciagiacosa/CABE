import ClientProjectCard from "./ClientProjectCard";

function ClientProjectsSection({
  cliente,
}) {
  const proyectos =
    cliente?.proyectos || [];

  return (
    <section className="client-projects-section">

      {/* HEADER */}

      <div className="client-projects-header">

        <div>

          <h2 className="client-projects-title">
            Proyectos vinculados
          </h2>

          <span className="client-projects-count">
            {proyectos.length}{" "}
            proyecto
            {proyectos.length !== 1
              ? "s"
              : ""}
          </span>

        </div>
      </div>

      {/* EMPTY */}

      {proyectos.length === 0 ? (

        <div className="client-projects-empty">

          <i className="bi bi-kanban" />

          <h3>
            No hay proyectos
          </h3>

          <p>
            Este cliente todavía no
            tiene proyectos
            vinculados.
          </p>

        </div>

      ) : (

        <div className="client-projects-grid">

        {cliente.proyectos?.map(
            (project) => (

            <ClientProjectCard
            key={project._id}
            project={project}
            clienteId={cliente._id}
            />

            )
        )}

        </div>

      )}
    </section>
  );
}

export default ClientProjectsSection;