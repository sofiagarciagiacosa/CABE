import ClientInteractionCard from "./ClientInteractionCard";

function ClientTimeline({ interacciones }) {

  return (
    <div className="client-timeline">

      {interacciones?.map((interaccion) => (

        <div
          className="timeline-item"
          key={interaccion._id}
        >

          <div className="timeline-left">

            <div className="timeline-icon">
              <i className="bi bi-chat-left-text" />
            </div>

            <div className="timeline-line" />

          </div>

          <ClientInteractionCard
            interaccion={interaccion}
          />

        </div>

      ))}

    </div>
  );
}

export default ClientTimeline;