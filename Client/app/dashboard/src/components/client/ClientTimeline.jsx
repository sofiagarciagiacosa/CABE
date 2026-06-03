import ClientInteractionCard from "./ClientInteractionCard";

function ClientTimeline({
  interacciones = [],
  cliente,
  setCliente,
}) {
  const getIcon = (tipo) => {
    switch (tipo) {
      case "Llamada":
        return "bi-telephone";

      case "Email":
        return "bi-envelope";

      case "Reunión":
        return "bi-people";

      case "WhatsApp":
        return "bi-whatsapp";

      case "Presupuesto":
        return "bi-file-earmark-text";

      case "Seguimiento":
        return "bi-arrow-repeat";

      default:
        return "bi-chat-left-text";
    }
  };

  if (interacciones.length === 0) {
    return (
      <div className="client-empty">
        No hay interacciones aún.
      </div>
    );
  }

  return (
    <div className="client-timeline">

      {interacciones.map(
        (interaccion, index) => (

          <div
            className="client-interaction-item"
            key={
              interaccion._id ||
              index
            }
          >

            <div className="client-interaction-icon">

              <i
                className={`bi ${getIcon(
                  interaccion.tipo
                )}`}
              />

            </div>

            <ClientInteractionCard
              interaccion={
                interaccion
              }
              cliente={cliente}
              setCliente={
                setCliente
              }
            />

          </div>
        )
      )}

    </div>
  );
}

export default ClientTimeline;