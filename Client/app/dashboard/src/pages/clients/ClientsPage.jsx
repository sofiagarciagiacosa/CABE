import "../../styles/clients.css";

import ClientesHeader from "../../components/clients/ClientesHeader";
import ClientesToolbar from "../../components/clients/ClientesToolbar";
import ClientesTable from "../../components/clients/ClientesTable";

function ClientesPage() {
  return (
    <div className="page clientes-page">

      <ClientesHeader />

      <ClientesToolbar />

      <ClientesTable />

    </div>
  );
}

export default ClientesPage;