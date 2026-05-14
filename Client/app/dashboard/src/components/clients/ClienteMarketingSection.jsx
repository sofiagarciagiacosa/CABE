function ClienteMarketingSection({
  activeSection,
  toggleSection,
  form,
  handleChange,
  handleRedesChange,
}) {

  return (
    <div className="accordion-section">

      <button
        type="button"
        className="accordion-header"
        onClick={() => toggleSection("marketing")}
      >
        <span>Marketing y presencia digital</span>

        <i
          className={`bi bi-chevron-${
            activeSection === "marketing"
              ? "up"
              : "down"
          }`}
        />
      </button>

      {activeSection === "marketing" && (

        <div className="accordion-content">

          <div className="form-group">

            <label>Descripción</label>

            <textarea
              className="cliente-textarea"
              value={form.descripcion}
              onChange={(e) =>
                handleChange(
                  "descripcion",
                  e.target.value
                )
              }
              placeholder="Descripción breve del cliente..."
            />

          </div>

          <div className="form-row">

            <div className="form-group">

              <label>Instagram</label>

              <input
                value={form.redes.instagram}
                onChange={(e) =>
                  handleRedesChange(
                    "instagram",
                    e.target.value
                  )
                }
                placeholder="@cliente"
              />

            </div>

            <div className="form-group">

              <label>Facebook</label>

              <input
                value={form.redes.facebook}
                onChange={(e) =>
                  handleRedesChange(
                    "facebook",
                    e.target.value
                  )
                }
                placeholder="facebook.com/cliente"
              />

            </div>

          </div>

          <div className="form-row">

            <div className="form-group">

              <label>LinkedIn</label>

              <input
                value={form.redes.linkedin}
                onChange={(e) =>
                  handleRedesChange(
                    "linkedin",
                    e.target.value
                  )
                }
                placeholder="linkedin.com/company/..."
              />

            </div>

            <div className="form-group">

              <label>TikTok</label>

              <input
                value={form.redes.tiktok}
                onChange={(e) =>
                  handleRedesChange(
                    "tiktok",
                    e.target.value
                  )
                }
                placeholder="@cliente"
              />

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default ClienteMarketingSection;