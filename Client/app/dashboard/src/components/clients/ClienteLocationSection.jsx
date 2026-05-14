function ClienteLocationSection({
  form,
  handleChange,
}) {
  return (
    <div className="accordion-content">

      <div className="form-row">

        <div className="form-group">
          <label>País</label>

          <input
            value={form.pais}
            onChange={(e) => handleChange("pais", e.target.value)}
            placeholder="Argentina"
          />
        </div>

        <div className="form-group">
          <label>Provincia</label>

          <input
            value={form.provincia}
            onChange={(e) => handleChange("provincia", e.target.value)}
            placeholder="Córdoba"
          />
        </div>

      </div>

      <div className="form-row">

        <div className="form-group">
          <label>Ciudad</label>

          <input
            value={form.ciudad}
            onChange={(e) => handleChange("ciudad", e.target.value)}
            placeholder="Córdoba Capital"
          />
        </div>

        <div className="form-group">
          <label>Dirección</label>

          <input
            value={form.direccion}
            onChange={(e) => handleChange("direccion", e.target.value)}
            placeholder="Av. Siempre Viva 123"
          />
        </div>

      </div>

    </div>
  );
}

export default ClienteLocationSection;