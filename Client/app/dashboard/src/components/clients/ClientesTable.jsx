

import ClienteRow from "./ClienteRow";

function ClientesTable({
  clientes,
}) {

  if (
    clientes.length === 0
  ) {
    return (
      <div className="clientes-empty">
        No se encontraron
        clientes.
      </div>
    );
  }

  return (
    <div className="clientes-table">

      <div className="table-header clientes-grid">

        <span>Nombre</span>
        <span>Estado</span>
        <span>Rubro</span>
        <span>Contacto</span>
        <span>Proyectos</span>
        <span>Fecha alta</span>

      </div>

      {clientes.map(
        (cliente) => (

        <ClienteRow
          key={cliente._id}
          cliente={cliente}
        />

      ))}

    </div>
  );
}

export default ClientesTable;