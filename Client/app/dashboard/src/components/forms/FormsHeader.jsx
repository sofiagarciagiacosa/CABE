function FormsHeader({
  activeView,
  setActiveView,
  onCreateForm,
}) {
  return (
    <div className="forms-header">
      <div>
        <span className="forms-kicker">
          Documentacion creativa
        </span>
        <h1 className="forms-title">
          Formularios digitales
        </h1>
        <p className="forms-subtitle">
          Briefs, propuestas y entregas finales organizadas por cliente.
        </p>
      </div>

      <div className="forms-header-actions">
        <div className="forms-tabs">
          <button
            className={`forms-tab ${
              activeView === "biblioteca" ? "active" : ""
            }`}
            onClick={() => setActiveView("biblioteca")}
          >
            Biblioteca
          </button>

          <button
            className={`forms-tab ${
              activeView === "editor" ? "active" : ""
            }`}
            onClick={() => setActiveView("editor")}
          >
            Editor
          </button>
        </div>

        <button
          className="forms-primary-btn"
          onClick={onCreateForm}
        >
          <i className="bi bi-plus-lg" />
          Nuevo formulario
        </button>
      </div>
    </div>
  );
}

export default FormsHeader;
