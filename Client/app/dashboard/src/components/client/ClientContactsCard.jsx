import { useEffect, useState } from "react";

function ClientContactsCard({
  cliente,
  setCliente,
}) {

  const [isEditing, setIsEditing] =
    useState(false);

  const [contactos, setContactos] =
    useState([]);

  useEffect(() => {

    setContactos(
      cliente.contactos || []
    );

  }, [cliente]);

  // =========================
  // CHANGE
  // =========================

  const handleChange = (
    index,
    field,
    value
  ) => {

    const updated = [...contactos];

    updated[index][field] = value;

    setContactos(updated);
  };

  // =========================
  // ADD CONTACT
  // =========================

  const handleAddContact = () => {

    setContactos((prev) => [
      ...prev,
      {
        nombre: "",
        cargo: "",
        email: "",
        telefono: "",
      },
    ]);
  };

  // =========================
  // REMOVE CONTACT
  // =========================

  const handleRemoveContact = (
    index
  ) => {

    setContactos((prev) =>
      prev.filter(
        (_, i) => i !== index
      )
    );
  };

  // =========================
  // CANCEL
  // =========================

  const handleCancel = () => {

    setContactos(
      cliente.contactos || []
    );

    setIsEditing(false);
  };

  // =========================
  // SAVE
  // =========================

  const handleSave = async () => {

    try {

      // limpiar vacíos
      const cleanedContacts =
        contactos.filter(
          (contacto) =>
            contacto.nombre ||
            contacto.cargo ||
            contacto.email ||
            contacto.telefono
        );

      const res = await fetch(
        `http://localhost:3000/cliente/${cliente._id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            contactos:
              cleanedContacts,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      setCliente(data);

      setContactos(
        data.contactos || []
      );

      setIsEditing(false);

    } catch (error) {

      console.error(error);
    }
  };

  return (
    <div className="client-card">

      <div className="client-card-header">

        <div className="client-card-title">

          <i className="bi bi-people" />

          <span>Contactos</span>

        </div>

        {!isEditing ? (

          <button
            className="client-card-action"
            onClick={() => {

              setIsEditing(true);

              if (
                contactos.length === 0
              ) {
                handleAddContact();
              }
            }}
          >
            <i className="bi bi-plus-circle" />
          </button>

        ) : (

          <div className="client-actions-group">

            <button
              className="client-cancel-btn"
              onClick={handleCancel}
            >
              Cancelar
            </button>

            <button
              className="client-save-btn"
              onClick={handleSave}
            >
              Listo
            </button>

          </div>

        )}

      </div>

      <div className="client-card-divider" />

      <div className="client-contacts-list">

        {contactos.length === 0 &&
          !isEditing && (

            <div className="client-empty">
              No hay contactos.
            </div>

          )}

        {contactos.map(
          (contacto, index) => (

            <div
              className="client-contact-item"
              key={index}
            >

              {isEditing && (

                <div className="client-contact-topbar">

                  <button
                    className="client-remove-contact-btn"
                    onClick={() =>
                      handleRemoveContact(
                        index
                      )
                    }
                  >

                    <i className="bi bi-x-lg" />

                  </button>

                </div>

              )}

              {[
                [
                  "Nombre",
                  "nombre",
                ],

                [
                  "Cargo",
                  "cargo",
                ],

                [
                  "Email",
                  "email",
                ],

                [
                  "Teléfono",
                  "telefono",
                ],
              ].map(
                ([
                  label,
                  field,
                ]) => (

                  <div
                    className="client-contact-row"
                    key={field}
                  >

                    <span className="client-contact-label">
                      {label}
                    </span>

                    {!isEditing ? (

                      <span className="client-contact-value">
                        {contacto[
                          field
                        ] || "-"}
                      </span>

                    ) : (

                      <input
                        className="client-detail-input"
                        value={
                          contacto[
                            field
                          ] || ""
                        }
                        onChange={(
                          e
                        ) =>
                          handleChange(
                            index,
                            field,
                            e.target
                              .value
                          )
                        }
                      />

                    )}

                  </div>

                )
              )}

            </div>

          )
        )}

        {isEditing && (

          <button
            className="client-add-contact-btn"
            onClick={
              handleAddContact
            }
          >

            <i className="bi bi-plus-lg" />

            Agregar otro contacto

          </button>

        )}

      </div>

    </div>
  );
}

export default ClientContactsCard;