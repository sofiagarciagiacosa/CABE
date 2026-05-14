function ClientTabs({
  activeTab,
  setActiveTab,
}) {

  return (
    <div className="client-tabs-wrapper">

      <div className="client-tabs">

        <button
          className={`client-tab ${
            activeTab === "actividad"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActiveTab("actividad")
          }
        >
          <i className="bi bi-clock-history" />

          Actividad
        </button>

        <button
          className={`client-tab ${
            activeTab === "proyectos"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActiveTab("proyectos")
          }
        >
          <i className="bi bi-kanban" />

          Proyectos
        </button>

      </div>

      <div className="client-divider" />

    </div>
  );
}

export default ClientTabs;