import Select from "./../common/Select";

function ClienteGeneralSection({
  activeSection,
  toggleSection,
  form,
  handleChange,
  rubros,
  estados,
  prioridades,
}) {

  return (
    <div className="accordion-section">

      <button
        type="button"
        className="accordion-header"
        onClick={() => toggleSection("general")}
      >
        <span>Información general</span>

        <i
          className={`bi bi-chevron-${
            activeSection === "general"
              ? "up"
              : "down"
          }`}
        />
      </button>

      {activeSection === "general" && (

        <div className="accordion-content">

          <div className="form-row">

            <div className="form-group">

              <label>Nombre *</label>

              <input
                value={form.nombre}
                onChange={(e) =>
                  handleChange(
                    "nombre",
                    e.target.value
                  )
                }
              />

            </div>

            <div className="form-group">

              <label>Email</label>

              <input
                value={form.email}
                onChange={(e) =>
                  handleChange(
                    "email",
                    e.target.value
                  )
                }
              />

            </div>

          </div>

          <div className="form-row">

            <div className="form-group">

              <label>Teléfono</label>

              <input
                value={form.telefono}
                onChange={(e) =>
                  handleChange(
                    "telefono",
                    e.target.value
                  )
                }
              />

            </div>

            <div className="form-group">

              <label>Sitio Web</label>

              <input
                value={form.sitioWeb}
                onChange={(e) =>
                  handleChange(
                    "sitioWeb",
                    e.target.value
                  )
                }
              />

            </div>

          </div>

          <div className="form-row">

            <div className="form-group">

              <label>Rubro</label>

              <Select
                options={rubros}
                value={form.rubro}
                onChange={(value) =>
                  handleChange("rubro", value)
                }
              />

            </div>

            <div className="form-group">

              <label>Estado</label>

              <Select
                options={estados}
                value={form.estado}
                onChange={(value) =>
                  handleChange("estado", value)
                }
              />

            </div>

            <div className="form-group">

              <label>Prioridad</label>

              <Select
                options={prioridades}
                value={form.prioridad}
                onChange={(value) =>
                  handleChange("prioridad", value)
                }
              />

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default ClienteGeneralSection;