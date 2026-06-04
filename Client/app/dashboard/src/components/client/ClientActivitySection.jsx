import {
  useEffect,
  useState,
} from "react";

import ClientTimeline from "./ClientTimeline";
import ClientInteractionForm from "./ClientInteractionForm";

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

  const [
    newInteraction,
    setNewInteraction,
  ] = useState({
    tipo: "Llamada",
    descripcion: "",
    proyecto: "",
    archivos: [],
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
      proyecto: "",
      archivos: [],
    });

    setIsEditing(false);
  };

  const handleSave = async () => {
    try {

      const user = getUser();

      // =========================
      // SUBIR ARCHIVOS CLOUDINARY
      // =========================

      const uploadedFiles =
        await Promise.all(

          (
            newInteraction
              .archivos || []
          ).map(
            async (
              archivo
            ) => {

              // si ya existe url
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

                    body: data,
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
      // NUEVA INTERACCIÓN
      // =========================

      const nuevaInteraccion =
        {
          ...newInteraction,

          archivos:
            uploadedFiles,

          fecha:
            new Date(),

          usuario:
            user?._id ||
            user?.id,
        };

      const updated = [
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

        <div className="client-card interaction-form-card">

          <ClientInteractionForm
            form={newInteraction}
            setForm={
              setNewInteraction
            }
            cliente={cliente}
          />

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