import ClientTimeline from "./ClientTimeline";

function ClientActivitySection({ cliente }) {

  return (
    <div className="client-activity-section">

      <div className="activity-header">

        <span>Historial</span>

        <button className="client-card-action">
          <i className="bi bi-plus-circle" />
        </button>

      </div>

      <ClientTimeline
        interacciones={cliente.interacciones}
      />

    </div>
  );
}

export default ClientActivitySection;