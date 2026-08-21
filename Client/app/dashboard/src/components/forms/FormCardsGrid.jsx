function FormCardsGrid({
  forms,
  selectedFormId,
  onSelectForm,
  onEditForm,
}) {
  if (!forms.length) {
    return (
      <div className="forms-empty-state">
        <i className="bi bi-file-earmark-text" />
        <h3>No hay formularios con esos filtros</h3>
        <p>Proba ajustar la busqueda o crear un nuevo documento.</p>
      </div>
    );
  }

  return (
    <div className="forms-grid">
      {forms.map((form) => (
        <article
          className={`form-card ${
            selectedFormId === form.id ? "active" : ""
          }`}
          key={form.id}
          onClick={() => onSelectForm(form.id)}
        >
          <div className="form-card-top">
            <div className={`form-type-mark ${form.color}`}>
              <i className={`bi ${form.icon}`} />
            </div>

            <span className={`form-status ${form.statusKey}`}>
              {form.status}
            </span>
          </div>

          <h2>{form.title}</h2>
          <p>{form.summary}</p>

          <div className="form-card-meta">
            <span>
              <i className="bi bi-person" />
              {form.client}
            </span>
            <span>
              <i className="bi bi-folder2-open" />
              {form.project}
            </span>
          </div>

          <div className="form-card-footer">
            <span>{form.updatedAt}</span>
            <button
              onClick={(event) => {
                event.stopPropagation();
                onEditForm(form.id);
              }}
            >
              Editar
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

export default FormCardsGrid;
