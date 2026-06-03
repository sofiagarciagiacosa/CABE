import {
  useEffect,
  useState,
} from "react";

import ClientTimeline from "./ClientTimeline";

import { getUser } from "../../utils/auth";

const TIPOS_INTERACCION = [
  "Llamada",
  "Email",
  "Reunión",
  "WhatsApp",
  "Presupuesto",
  "Seguimiento",
  "Otro",
];

function ClientActivitySection({
  cliente,
  setCliente,
}) {
  const [isEditing, setIsEditing] =
    useState(false);

  const [interacciones,
    setInteracciones] =
    useState([]);

  const [newInteraction,
    setNewInteraction] =
    useState({
      tipo: "Llamada",
      descripcion: "",
    });

  useEffect(() => {
    setInteracciones(
      cliente.interacciones || []
    );
  }, [cliente]);

  const handleCancel = () => {
    setNewInteraction({
      tipo: "Llamada",
      descripcion: "",
    });

    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      const user = getUser();

      const nuevaInteraccion = {
        ...newInteraction,
        fecha: new Date(),
        usuario:
          user?._id || user?.id,
      };

      const updated =
        [
          nuevaInteraccion,
          ...interacciones,
        ];

      const res =
        await fetch(
          `http://localhost:3000/cliente/${cliente._id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              interacciones:
                updated,
            }),
          }
        );

      const data =
        await res.json();

      if (!res.ok) {
        throw new Error(
          data.error
        );
      }

      setCliente(data);

      setInteracciones(
        data.interacciones
      );

      handleCancel();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="client-activity-section">

      <div className="client-activity-header">

        <span className="client-activity-title">
          Historial
        </span>

        {!isEditing ? (

          <button
            className="client-card-action"
            onClick={() =>
              setIsEditing(true)
            }
          >
            <i className="bi bi-plus-circle" />
          </button>

        ) : (

          <div className="client-actions-group">

            <button
              className="client-cancel-btn"
              onClick={
                handleCancel
              }
            >
              Cancelar
            </button>

            <button
              className="client-save-btn"
              onClick={
                handleSave
              }
            >
              Listo
            </button>

          </div>

        )}

      </div>

      {isEditing && (

        <div className="client-card interaction-form">

          <div className="interaction-form-group">

            <span className="detail-label">
              Tipo
            </span>

            <select
              className="client-detail-input"
              value={
                newInteraction.tipo
              }
              onChange={(e) =>
                setNewInteraction(
                  (
                    prev
                  ) => ({
                    ...prev,
                    tipo:
                      e.target
                        .value,
                  })
                )
              }
            >
              {TIPOS_INTERACCION.map(
                (tipo) => (

                  <option
                    key={tipo}
                    value={tipo}
                  >
                    {tipo}
                  </option>

                )
              )}
            </select>

          </div>

          <div className="interaction-form-group">

            <span className="detail-label">
              Descripción
            </span>

            <textarea
              className="client-detail-textarea"
              placeholder="Agregar detalles de la interacción..."
              value={
                newInteraction.descripcion
              }
              onChange={(e) =>
                setNewInteraction(
                  (
                    prev
                  ) => ({
                    ...prev,
                    descripcion:
                      e.target
                        .value,
                  })
                )
              }
            />

          </div>

        </div>

      )}

      <ClientTimeline
        interacciones={
          interacciones
        }
        cliente={cliente}
        setCliente={setCliente}
      />
    </div>
  );
}

export default ClientActivitySection;