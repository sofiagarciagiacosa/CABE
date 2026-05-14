function ClientContactsCard({ cliente }) {

  return (
    <div className="client-card">

      <div className="client-card-header">

        <div className="client-card-title">

          <i className="bi bi-people" />

          <span>Contactos</span>

        </div>

        <button className="client-card-action">
          <i className="bi bi-plus-circle" />
        </button>

      </div>

      <div className="client-card-divider" />

      <div className="client-contacts-list">

        {cliente.contactos?.length === 0 && (
          <div className="client-empty">
            No hay contactos.
          </div>
        )}

        {cliente.contactos?.map((contacto, index) => (

          <div
            className="client-contact-item"
            key={index}
          >

            <div>

              <div className="contact-name">
                {contacto.nombre}
              </div>

              <div className="contact-role">
                {contacto.cargo || "-"}
              </div>

            </div>

            <div className="contact-info">

              <span>{contacto.email}</span>

              <span>{contacto.telefono}</span>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default ClientContactsCard;