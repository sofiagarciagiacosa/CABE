function AnalyticsSummary({ insights }) {
  return (
    <section className="analytics-summary">
      <div className="analytics-summary-main">
        <span className="metrics-page-label">
          Resumen analitico
        </span>
        <h2>{insights.title}</h2>
        <p>{insights.description}</p>
      </div>

      <div className="analytics-actions-list">
        {insights.actions.map((action) => (
          <div
            className="analytics-action"
            key={action}
          >
            <i className="bi bi-arrow-right-short" />
            <span>{action}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AnalyticsSummary;
