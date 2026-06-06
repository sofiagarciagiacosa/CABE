import { useState } from "react";
import AddClienteModal from "./AddClienteModal";

function ClientesHeader({
  activeTab,
  setActiveTab,
}) {

  const [openModal, setOpenModal] =
    useState(false);

  return (
    <>
      <div className="clientes-header">

        <h1 className="clientes-title">
          Clientes
        </h1>

        <div className="clientes-tabs-row">

          <div className="clientes-tabs">

            <button
              className={`clientes-tab ${
                activeTab === "lista"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveTab("lista")
              }
            >
              Lista
            </button>

            <button
              className={`clientes-tab ${
                activeTab === "tablero"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveTab("tablero")
              }
            >
              Tablero
            </button>

          </div>

          <button
            className="save-btn"
            onClick={() =>
              setOpenModal(true)
            }
          >
            Agregar Cliente
          </button>

        </div>

      </div>

      {openModal && (
        <AddClienteModal
          onClose={() =>
            setOpenModal(false)
          }
        />
      )}
    </>
  );
}

export default ClientesHeader;