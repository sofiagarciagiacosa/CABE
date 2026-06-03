function ClientInteractionForm({
  form,
  setForm,
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

  return (
    <div className="client-interaction-form">

      <div className="client-detail-row">

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

      <div className="client-detail-row">

        <span className="detail-label">
          Fecha
        </span>

        <input
          type="date"
          className="client-detail-input"
          value={form.fecha}
          onChange={(e) =>
            handleChange(
              "fecha",
              e.target.value
            )
          }
        />

      </div>

      <div className="client-detail-row">

        <span className="detail-label">
          Descripción
        </span>

        <textarea
          className="client-detail-textarea"
          value={form.descripcion}
          onChange={(e) =>
            handleChange(
              "descripcion",
              e.target.value
            )
          }
          placeholder="Descripción de la interacción..."
        />

      </div>

    </div>
  );
}

export default ClientInteractionForm;