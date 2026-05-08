function ClienteRow({ cliente }) {
  return (
    <div className="table-row clientes-grid cliente-row">

      <div className="cliente-name-cell">

        <div className="cliente-logo" />

        <span>{cliente.nombre}</span>

      </div>

      <span>{cliente.estado}</span>

      <span>{cliente.rubro}</span>

      <span>{cliente.contacto}</span>

      <span>{cliente.proyectos}</span>

      <span>{cliente.ultimaInteraccion}</span>

      <span>{cliente.fechaAlta}</span>

    </div>
  );
}

export default ClienteRow;