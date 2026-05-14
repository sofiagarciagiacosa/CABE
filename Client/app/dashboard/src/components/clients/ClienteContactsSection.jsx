function ClienteContactsSection({
  form,
  addContacto,
  removeContacto,
  handleContactoChange,
}) {
  return (
    <div className="accordion-content">

      <button
        type="button"
        className="add-contact-btn"
        onClick={addContacto}
      >
        <i className="bi bi-plus-lg"></i>
        Agregar contacto
      </button>

      {form.contactos.length === 0 && (
        <div className="empty-contacts">
          Todavía no agregaste contactos.
        </div>
      )}

      {form.contactos.map((contacto, index) => (

        <div
          key={index}
          className="contact-card"
        >

          <div className="contact-card-header">

            <span>
              Contacto #{index + 1}
            </span>

            <button
              type="button"
              className="remove-contact-btn"
              onClick={() => removeContacto(index)}
            >
              <i className="bi bi-trash"></i>
            </button>

          </div>

          <div className="form-row">

            <div className="form-group">
              <label>Nombre</label>

              <input
                value={contacto.nombre}
                onChange={(e) =>
                  handleContactoChange(
                    index,
                    "nombre",
                    e.target.value
                  )
                }
                placeholder="Juan Pérez"
              />
            </div>

            <div className="form-group">
              <label>Email</label>

              <input
                value={contacto.email}
                onChange={(e) =>
                  handleContactoChange(
                    index,
                    "email",
                    e.target.value
                  )
                }
                placeholder="juan@empresa.com"
              />
            </div>

          </div>

          <div className="form-row">

            <div className="form-group">
              <label>Teléfono</label>

              <input
                value={contacto.telefono}
                onChange={(e) =>
                  handleContactoChange(
                    index,
                    "telefono",
                    e.target.value
                  )
                }
                placeholder="+54 351..."
              />
            </div>

            <div className="form-group">
              <label>Cargo</label>

              <input
                value={contacto.cargo}
                onChange={(e) =>
                  handleContactoChange(
                    index,
                    "cargo",
                    e.target.value
                  )
                }
                placeholder="Marketing Manager"
              />
            </div>

          </div>

          <div className="contact-checkbox">

            <input
              type="checkbox"
              checked={contacto.principal}
              onChange={(e) =>
                handleContactoChange(
                  index,
                  "principal",
                  e.target.checked
                )
              }
            />

            <span>Contacto principal</span>

          </div>

        </div>

      ))}

    </div>
  );
}

export default ClienteContactsSection;