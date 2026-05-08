import { useState } from "react";
import AddClienteModal from "./AddClienteModal";

function ClientesHeader() {

  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="clientes-header">

        <h1 className="clientes-title">
          Clientes
        </h1>

        <div className="clientes-tabs-row">

          <div className="clientes-tabs">

            <button className="clientes-tab active">
              Lista
            </button>

            <button className="clientes-tab">
              Tablero
            </button>

          </div>

          <button
            className="save-btn"
            onClick={() => setOpenModal(true)}
          >
            Agregar Cliente
          </button>

        </div>

      </div>

      {openModal && (
        <AddClienteModal
          onClose={() => setOpenModal(false)}
        />
      )}
    </>
  );
}

export default ClientesHeader;