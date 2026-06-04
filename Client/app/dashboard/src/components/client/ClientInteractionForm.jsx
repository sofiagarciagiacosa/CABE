function ClientInteractionForm({
  form,
  setForm,
  cliente,
}) {
  const interactionTypes = [
    "Llamada",
    "Email",
    "Reunión",
    "WhatsApp",
    "Presupuesto",
    "Seguimiento",
    "Otro",
  ];

  const handleChange = (
    field,
    value
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFiles = (e) => {
    const files = Array.from(
      e.target.files
    );

    const mappedFiles =
      files.map((file) => ({
        nombre: file.name,

        tipo: file.type,

        preview:
          URL.createObjectURL(
            file
          ),

        file,
      }));

    setForm((prev) => ({
      ...prev,

      archivos: [
        ...(prev.archivos || []),
        ...mappedFiles,
      ],
    }));
  };

  const removeFile = (index) => {
    setForm((prev) => ({
      ...prev,
      archivos:
        prev.archivos.filter(
          (_, i) => i !== index
        ),
    }));
  };

  return (
    <div className="client-interaction-form">

      {/* ROW 1 */}

      <div className="interaction-grid">

        <div className="interaction-form-group">
          <span className="detail-label">
            Tipo
          </span>

          <select
            className="client-detail-input"
            value={form.tipo}
            onChange={(e) =>
              handleChange(
                "tipo",
                e.target.value
              )
            }
          >
            {interactionTypes.map(
              (type) => (
                <option
                  key={type}
                  value={type}
                >
                  {type}
                </option>
              )
            )}
          </select>
        </div>

        <div className="interaction-form-group">
          <span className="detail-label">
            Proyecto
          </span>

          <select
            className="client-detail-input"
            value={
              form.proyecto || ""
            }
            onChange={(e) =>
              handleChange(
                "proyecto",
                e.target.value
              )
            }
          >
            <option value="">
              Sin proyecto
            </option>

            {cliente.proyectos?.map(
              (proyecto) => (
                <option
                  key={
                    proyecto._id
                  }
                  value={
                    proyecto._id
                  }
                >
                  {
                    proyecto.nombre
                  }
                </option>
              )
            )}
          </select>
        </div>
      </div>

      {/* DESCRIPCIÓN */}

      <div className="interaction-form-group">
        <span className="detail-label">
          Descripción
        </span>

        <textarea
          className="client-detail-textarea interaction-textarea"
          value={
            form.descripcion
          }
          onChange={(e) =>
            handleChange(
              "descripcion",
              e.target.value
            )
          }
          placeholder="Ej: Se envió propuesta comercial y se definieron cambios del home."
        />
      </div>

      {/* ARCHIVOS */}

      <div className="interaction-form-group">

        <span className="detail-label">
          Archivos
        </span>

        <label className="interaction-upload">

          <input
            type="file"
            multiple
            onChange={
              handleFiles
            }
          />

          <i className="bi bi-cloud-upload" />

          <span>
            Subir archivos
          </span>

        </label>

        {form.archivos
          ?.length > 0 && (

          <div className="interaction-files-preview">

            {form.archivos.map(
              (
                archivo,
                index
              ) => (

                <div
                  key={index}
                  className="interaction-file-chip"
                >

                  <div className="interaction-file-left">

                    <i
                      className={`bi ${
                        archivo.tipo?.includes(
                          "image"
                        )
                          ? "bi-image"
                          : archivo.tipo?.includes(
                              "pdf"
                            )
                          ? "bi-file-earmark-pdf"
                          : "bi-file-earmark"
                      }`}
                    />

                    <span>
                      {
                        <span>
                          {archivo.nombre}
                        </span>
                      }
                    </span>

                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      removeFile(
                        index
                      )
                    }
                  >
                    ×
                  </button>

                </div>
              )
            )}

          </div>
        )}
      </div>

    </div>
  );
}

export default ClientInteractionForm;