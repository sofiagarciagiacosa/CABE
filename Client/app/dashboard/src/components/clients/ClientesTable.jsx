import { useEffect, useState } from "react";

import ClienteRow from "./ClienteRow";

function ClientesTable() {

  const [clientes, setClientes] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {

    const fetchClientes = async () => {

      try {

        const res = await fetch("http://localhost:3000/cliente");

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Error al obtener clientes");
        }

        setClientes(data);

      } catch (err) {

        console.error(err);

        setError("No se pudieron cargar los clientes");

      } finally {

        setLoading(false);
      }
    };

    fetchClientes();

  }, []);

  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (
      <div className="clientes-empty">
        Cargando clientes...
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error) {

    return (
      <div className="clientes-error">
        {error}
      </div>
    );
  }

  // =========================
  // EMPTY
  // =========================

  if (clientes.length === 0) {

    return (
      <div className="clientes-empty">
        Todavía no hay clientes registrados.
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

      {clientes.map((cliente) => (

        <ClienteRow
          key={cliente._id}
          cliente={cliente}
        />

      ))}

    </div>
  );
}

export default ClientesTable;