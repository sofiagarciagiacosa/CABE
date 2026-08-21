function ChartModal({
  chart,
  onClose,
}) {
  if (!chart) {
    return null;
  }

  return (
    <div className="metrics-modal-overlay">
      <div className="metrics-modal">
        <div className="metrics-modal-header">
          <div>
            <span className="metrics-page-label">
              Grafico ampliado
            </span>
            <h2>{chart.title}</h2>
            <p>{chart.subtitle}</p>
          </div>

          <button
            className="metrics-modal-close"
            onClick={onClose}
          >
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <div className="metrics-modal-body">
          {chart.content}
        </div>
      </div>
    </div>
  );
}

export default ChartModal;
