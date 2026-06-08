import {
  useEffect,
  useState,
} from "react";

import "../../styles/clients.css";

import ClientesHeader from "../../components/clients/ClientesHeader";
import ClientesToolbar from "../../components/clients/ClientesToolbar";
import ClientesTable from "../../components/clients/ClientesTable";
import ClientesBoard from "../../components/clients/ClientesBoard";

function ClientesPage() {

  const [activeTab,
    setActiveTab] =
    useState("lista");

  const [clientes,
    setClientes] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  const [search,
    setSearch] =
    useState("");

  const [filters,
    setFilters] =
    useState({
      estado: "",
      rubro: "",
      prioridad: "",
    });

  // =========================
  // FETCH
  // =========================

  useEffect(() => {

    const fetchClientes =
      async () => {

      try {

        const res =
          await fetch(
            "http://localhost:3000/cliente"
          );

        const data =
          await res.json();

        setClientes(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);
      }
    };

    fetchClientes();

  }, []);

  // =========================
  // FILTERED CLIENTS
  // =========================

  const clientesFiltrados =
    clientes.filter(
      (cliente) => {

      const searchMatch =
        [
          cliente.nombre,
          cliente.email,
          cliente.rubro,
          cliente.telefono,
        ]
          .join(" ")
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const estadoMatch =
        !filters.estado ||
        cliente.estado ===
          filters.estado;

      const rubroMatch =
        !filters.rubro ||
        cliente.rubro ===
          filters.rubro;

      const prioridadMatch =
        !filters.prioridad ||
        cliente.prioridad ===
          filters.prioridad;

      return (
        searchMatch &&
        estadoMatch &&
        rubroMatch &&
        prioridadMatch
      );
    });

  return (
    <div className="page clientes-page">

      <ClientesHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <ClientesToolbar
        search={search}
        setSearch={setSearch}
        filters={filters}
        setFilters={setFilters}
      />

      {loading ? (

        <div className="clientes-empty">
          Cargando clientes...
        </div>

      ) : activeTab ===
        "lista" ? (

        <ClientesTable
          clientes={
            clientesFiltrados
          }
        />

      ) : (

        <ClientesBoard
          clientes={
            clientesFiltrados
          }
        />

      )}

    </div>
  );
}

export default ClientesPage;