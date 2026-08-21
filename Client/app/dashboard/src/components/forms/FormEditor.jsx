function FormEditor({
  formData,
  onChange,
  onExportPdf,
  onSaveDraft,
}) {
  const handleFieldChange = (field, value) => {
    onChange({
      ...formData,
      [field]: value,
    });
  };

  const handleNestedChange = (section, field, value) => {
    onChange({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: value,
      },
    });
  };

  return (
    <section className="form-editor">
      <div className="form-editor-header">
        <div>
          <span className="forms-kicker">
            Editor de documento
          </span>
          <h2>{formData.title}</h2>
        </div>

        <div className="form-editor-actions">
          <button
            className="forms-secondary-btn"
            onClick={onExportPdf}
          >
            <i className="bi bi-filetype-pdf" />
            Exportar PDF
          </button>

          <button
            className="forms-primary-btn"
            onClick={onSaveDraft}
          >
            <i className="bi bi-save" />
            Guardar mock
          </button>
        </div>
      </div>

      <div className="form-editor-grid">
        <label>
          Tipo de formulario
          <select
            value={formData.type}
            onChange={(event) =>
              handleFieldChange("type", event.target.value)
            }
          >
            <option>Brief</option>
            <option>Propuesta</option>
            <option>Entrega final</option>
          </select>
        </label>

        <label>
          Cliente
          <input
            value={formData.client}
            onChange={(event) =>
              handleFieldChange("client", event.target.value)
            }
          />
        </label>

        <label>
          Proyecto
          <input
            value={formData.project}
            onChange={(event) =>
              handleFieldChange("project", event.target.value)
            }
          />
        </label>

        <label>
          Estado
          <select
            value={formData.status}
            onChange={(event) =>
              handleFieldChange("status", event.target.value)
            }
          >
            <option>Borrador</option>
            <option>En revision</option>
            <option>Aprobado</option>
            <option>Archivado</option>
          </select>
        </label>
      </div>

      <div className="form-sections">
        <article className="form-section">
          <div className="form-section-title">
            <i className="bi bi-lightbulb" />
            <h3>Brief creativo</h3>
          </div>

          <label>
            Objetivo principal
            <textarea
              value={formData.brief.objective}
              onChange={(event) =>
                handleNestedChange(
                  "brief",
                  "objective",
                  event.target.value
                )
              }
            />
          </label>

          <label>
            Publico objetivo
            <textarea
              value={formData.brief.audience}
              onChange={(event) =>
                handleNestedChange(
                  "brief",
                  "audience",
                  event.target.value
                )
              }
            />
          </label>

          <label>
            Tono de comunicacion
            <textarea
              value={formData.brief.tone}
              onChange={(event) =>
                handleNestedChange(
                  "brief",
                  "tone",
                  event.target.value
                )
              }
            />
          </label>
        </article>

        <article className="form-section">
          <div className="form-section-title">
            <i className="bi bi-stars" />
            <h3>Propuesta</h3>
          </div>

          <label>
            Concepto creativo
            <textarea
              value={formData.proposal.concept}
              onChange={(event) =>
                handleNestedChange(
                  "proposal",
                  "concept",
                  event.target.value
                )
              }
            />
          </label>

          <label>
            Piezas incluidas
            <textarea
              value={formData.proposal.pieces}
              onChange={(event) =>
                handleNestedChange(
                  "proposal",
                  "pieces",
                  event.target.value
                )
              }
            />
          </label>

          <label>
            Presupuesto estimado
            <input
              value={formData.proposal.budget}
              onChange={(event) =>
                handleNestedChange(
                  "proposal",
                  "budget",
                  event.target.value
                )
              }
            />
          </label>
        </article>

        <article className="form-section">
          <div className="form-section-title">
            <i className="bi bi-check2-circle" />
            <h3>Entrega final</h3>
          </div>

          <label>
            Entregables
            <textarea
              value={formData.delivery.assets}
              onChange={(event) =>
                handleNestedChange(
                  "delivery",
                  "assets",
                  event.target.value
                )
              }
            />
          </label>

          <label>
            Links y archivos
            <input
              value={formData.delivery.links}
              onChange={(event) =>
                handleNestedChange(
                  "delivery",
                  "links",
                  event.target.value
                )
              }
            />
          </label>

          <label>
            Observaciones finales
            <textarea
              value={formData.delivery.notes}
              onChange={(event) =>
                handleNestedChange(
                  "delivery",
                  "notes",
                  event.target.value
                )
              }
            />
          </label>
        </article>
      </div>
    </section>
  );
}

export default FormEditor;
