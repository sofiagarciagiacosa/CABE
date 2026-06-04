import { useState } from "react";
import ClientInteractionForm from "./ClientInteractionForm";

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

      proyecto:
        interaccion.proyecto?._id ||
        interaccion.proyecto ||
        "",

      archivos:
        interaccion.archivos || [],
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
  // SAVE
  // =========================

  const handleSave =
  async () => {

    try {

      // =========================
      // UPLOAD FILES
      // =========================

      const uploadedFiles =
        await Promise.all(

          (
            form.archivos ||
            []
          ).map(
            async (
              archivo
            ) => {

              // ya subido
              if (
                archivo.url
              ) {
                return archivo;
              }

              const data =
                new FormData();

              data.append(
                "file",
                archivo.file
              );

              data.append(
                "upload_preset",
                "avatars"
              );

              const uploadRes =
                await fetch(
                  "https://api.cloudinary.com/v1_1/dknuvc4jb/auto/upload",
                  {
                    method:
                      "POST",

                    body:
                      data,
                  }
                );

              const uploadData =
                await uploadRes.json();

              return {
                nombre:
                  archivo.nombre,

                url:
                  uploadData.secure_url,

                tipo:
                  archivo.tipo,
              };
            }
          )
        );

      // =========================
      // UPDATE
      // =========================

      const updated =
        cliente.interacciones.map(
          (item) =>
            item._id ===
            interaccion._id
              ? {
                  ...item,

                  ...form,

                  archivos:
                    uploadedFiles,
                }
              : item
        );

      const res =
        await fetch(
          `http://localhost:3000/cliente/${cliente._id}`,
          {
            method:
              "PUT",

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

      if (!res.ok) {
        throw new Error(
          data.error
        );
      }

      setCliente(data);

      setIsEditing(
        false
      );

    } catch (
      error
    ) {

      console.error(
        error
      );
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

        if (!res.ok) {
          throw new Error(
            data.error
          );
        }

        setCliente(data);
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div className="client-interaction-card">

      {!isEditing ? (
        <>

          {/* TOP */}

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

          {/* USER */}

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

          {/* PROJECT */}

          {interaccion.proyecto && (

            <div className="interaction-project">

              <i className="bi bi-kanban" />

              <span>
                {
                  interaccion
                    .proyecto
                    ?.nombre
                }
              </span>

            </div>

          )}

          {/* DESCRIPTION */}

          <p className="interaction-description-label">
            Descripción de la interacción
          </p>

          <p className="client-interaction-description">
            {
              interaccion.descripcion
            }
          </p>

          {/* FILES */}

          {interaccion.archivos
            ?.length > 0 && (

            <div className="interaction-files-preview">

              {interaccion.archivos.map(
                (
                  archivo,
                  index
                ) => (

                  <a
                    key={index}
                    href={
                      archivo.url
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="interaction-file-chip"
                  >

                    <div className="interaction-file-left">

                      <i className="bi bi-paperclip" />

                      <span>
                        {
                          archivo.nombre
                        }
                      </span>

                    </div>

                  </a>

                )
              )}

            </div>

          )}

          {/* ACTIONS */}

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

        </>
      ) : (
        <>

          <ClientInteractionForm
            form={form}
            setForm={setForm}
            cliente={cliente}
          />

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