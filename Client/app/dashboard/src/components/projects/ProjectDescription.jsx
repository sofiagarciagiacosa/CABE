function ProjectDescription({ project }) {
  return (
    <>
      <div className="field">
        <div className="label">NOMBRE</div>
        <div className="value">{project.nombre}</div>
      </div>

      <div className="field">
        <div className="label">DESCRIPCIÓN</div>
        <div className="value">{project.descripcion}</div>
      </div>

      <div className="field">
        <div className="label">CLIENTE</div>
        <div className="value">{project.cliente}</div>
      </div>

      <div className="field">
        <div className="label">PRESUPUESTO</div>
        <div className="value">{project.presupuesto}</div>
      </div>

      <div className="field">
        <div className="label">FECHA DE INICIO</div>
        <div className="value">{project.inicio}</div>
      </div>

      <div className="field">
        <div className="label">FECHA LÍMITE</div>
        <div className="value">{project.fin}</div>
      </div>

      <div className="field">
        <div className="label">RESPONSABLES</div>
        <div className="value">{project.responsablesNombres}</div>
      </div>
    </>
  );
}

export default ProjectDescription;