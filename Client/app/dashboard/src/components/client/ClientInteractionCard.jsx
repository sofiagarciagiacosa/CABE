import { useState } from "react";

const TIPOS_INTERACCION = [
  "Llamada",
  "Email",
  "Reunión",
  "WhatsApp",
  "Presupuesto",
  "Seguimiento",
  "Otro",
];

function ClientInteractionCard({
  interaccion,
  cliente,
  setCliente,
}) {
  const [isEditing, setIsEditing] =
    useState(false);

  const [form, setForm] =
    useState({
      tipo:
        interaccion.tipo ||
        "Llamada",

      descripcion:
        interaccion.descripcion ||
        "",
    });

  const usuario =
    interaccion.usuario;

  const initials =
    usuario
      ? `${
          usuario.nombre?.[0] ||
          ""
        }${
          usuario.apellido?.[0] ||
          ""
        }`
      : "?";

  // =========================
  // EDIT
  // =========================

  const handleSave =
    async () => {
      try {
        const updated =
          cliente.interacciones.map(
            (item) =>
              item._id ===
              interaccion._id
                ? {
                    ...item,
                    ...form,
                  }
                : item
          );

        const res =
          await fetch(
            `http://localhost:3000/cliente/${cliente._id}`,
            {
              method: "PUT",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify(
                  {
                    interacciones:
                      updated,
                  }
                ),
            }
          );

        const data =
          await res.json();

        setCliente(data);

        setIsEditing(false);
      } catch (error) {
        console.error(error);
      }
    };

  // =========================
  // DELETE
  // =========================

  const handleDelete =
    async () => {
      const confirmDelete =
        window.confirm(
          "¿Eliminar interacción?"
        );

      if (!confirmDelete)
        return;

      try {
        const updated =
          cliente.interacciones.filter(
            (item) =>
              item._id !==
              interaccion._id
          );

        const res =
          await fetch(
            `http://localhost:3000/cliente/${cliente._id}`,
            {
              method: "PUT",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify(
                  {
                    interacciones:
                      updated,
                  }
                ),
            }
          );

        const data =
          await res.json();

        setCliente(data);
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div className="client-interaction-card">

      {!isEditing && (

        <div className="interaction-card-actions">

          <button
            className="interaction-icon-btn"
            onClick={() =>
              setIsEditing(true)
            }
          >
            <i className="bi bi-pencil" />
          </button>

          <button
            className="interaction-icon-btn delete"
            onClick={
              handleDelete
            }
          >
            <i className="bi bi-trash3" />
          </button>

        </div>

      )}

      {!isEditing ? (

        <>
          <div className="client-interaction-top">

            <span className="client-interaction-type">
              {
                interaccion.tipo
              }
            </span>

            <span className="client-interaction-date">
              {new Date(
                interaccion.fecha
              ).toLocaleDateString(
                "es-AR"
              )}
            </span>

          </div>

          <div className="interaction-user">

            <div className="interaction-avatar">

              {usuario?.avatar ? (

                <img
                  src={
                    usuario.avatar
                  }
                  alt=""
                />

              ) : (

                <span>
                  {initials}
                </span>

              )}

            </div>

            <span className="interaction-user-name">

              {usuario
                ? `${usuario.nombre} ${usuario.apellido}`
                : "Usuario"}

            </span>

          </div>

          <p className="interaction-description-label">
            Descripción de la interacción
          </p>

          <p className="client-interaction-description">
            {
              interaccion.descripcion
            }
          </p>
        </>

      ) : (

        <>
          <div className="interaction-form-group">

            <span className="detail-label">
              Tipo
            </span>

            <select
              className="client-detail-input"
              value={form.tipo}
              onChange={(e) =>
                setForm(
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
              value={
                form.descripcion
              }
              onChange={(e) =>
                setForm(
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

          <div className="client-actions-group">

            <button
              className="client-cancel-btn"
              onClick={() =>
                setIsEditing(
                  false
                )
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
        </>

      )}

    </div>
  );
}

export default ClientInteractionCard;