import ClienteRow from "./ClienteRow";

const clientes = [
  {
    id: 1,
    nombre: "Urban Group",
    estado: "Cliente Activo",
    rubro: "Inmobiliaria",
    contacto: "info@urban.com",
    proyectos: 3,
    ultimaInteraccion: "Envío de presupuesto",
    fechaAlta: "05/05/2026",
  },
  {
    id: 2,
    nombre: "Nova Studio",
    estado: "Prospecto",
    rubro: "Marketing",
    contacto: "hola@nova.com",
    proyectos: 1,
    ultimaInteraccion: "Reunión inicial",
    fechaAlta: "01/05/2026",
  },
];

function ClientesTable() {
  return (
    <div className="clientes-table">

      <div className="table-header clientes-grid">

        <span>Nombre</span>
        <span>Estado</span>
        <span>Rubro</span>
        <span>Contacto</span>
        <span>Proyectos</span>
        <span>Última interacción</span>
        <span>Fecha alta</span>

      </div>

      {clientes.map((cliente) => (
        <ClienteRow
          key={cliente.id}
          cliente={cliente}
        />
      ))}

    </div>
  );
}

export default ClientesTable;