import { useState } from "react";

import "../../styles/clients.css";

import ClientesHeader from "../../components/clients/ClientesHeader";
import ClientesToolbar from "../../components/clients/ClientesToolbar";
import ClientesTable from "../../components/clients/ClientesTable";
import ClientesBoard from "../../components/clients/ClientesBoard";

function ClientesPage() {

  const [activeTab, setActiveTab] =
    useState("lista");

  return (
    <div className="page clientes-page">

      <ClientesHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <ClientesToolbar />

      {activeTab === "lista" ? (
        <ClientesTable />
      ) : (
        <ClientesBoard />
      )}

    </div>
  );
}

export default ClientesPage;