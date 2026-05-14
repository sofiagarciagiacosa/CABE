function ClientDetailsCard({ cliente }) {

  const details = [
    ["Email", cliente.email],
    ["Teléfono", cliente.telefono],
    ["Rubro", cliente.rubro],
    ["Estado", cliente.estado],
    ["Prioridad", cliente.prioridad],
    ["Sitio Web", cliente.sitioWeb],
    ["País", cliente.pais],
    ["Provincia", cliente.provincia],
    ["Ciudad", cliente.ciudad],
    ["Dirección", cliente.direccion],
    ["Descripción", cliente.descripcion],
  ];

  return (
    <div className="client-card">

      <div className="client-card-header">

        <div className="client-card-title">

          <i className="bi bi-building" />

          <span>Detalles</span>

        </div>

        <button className="client-card-action">
          <i className="bi bi-pencil-square" />
        </button>

      </div>

      <div className="client-card-divider" />

      <div className="client-details-list">

        {details.map(([label, value]) => (

          <div
            className="client-detail-row"
            key={label}
          >

            <span className="detail-label">
              {label}
            </span>

            <span className="detail-value">
              {value || "-"}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}

export default ClientDetailsCard;