import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ClientHeader from "../../components/client/ClientHeader";
import ClientDetailsCard from "../../components/client/ClientDetailsCard";
import ClientContactsCard from "../../components/client/ClientContactsCard";
import ClientTabs from "../../components/client/ClientTabs";
import ClientActivitySection from "../../components/client/ClientActivitySection";

import "../../styles/client.css";

function ClientPage() {

  const { id } = useParams();

  const [cliente, setCliente] = useState(null);

  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("actividad");

  useEffect(() => {

    const fetchCliente = async () => {

      try {

        const res = await fetch(
          `http://localhost:3000/cliente/${id}`
        );

        const data = await res.json();

        setCliente(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);
      }
    };

    fetchCliente();

  }, [id]);

  if (loading) {
    return (
      <div className="client-loading">
        Cargando cliente...
      </div>
    );
  }

  if (!cliente) {
    return (
      <div className="client-loading">
        Cliente no encontrado
      </div>
    );
  }

  return (
    <div className="client-page">

      <ClientHeader cliente={cliente} />

      <div className="client-layout">

        <div className="client-left-column">

          <ClientDetailsCard
            cliente={cliente}
            setCliente={setCliente}
          />

          <ClientContactsCard
            cliente={cliente}
            setCliente={setCliente}
          />

        </div>

        <div className="client-right-column">

          <ClientTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {activeTab === "actividad" && (

            <ClientActivitySection
              cliente={cliente}
              setCliente={setCliente}
            />

          )}

        </div>

      </div>

    </div>
  );
}

export default ClientPage;