function ChartCard({
  title,
  subtitle,
  children,
  onExpand,
}) {
  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <div>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>

        {onExpand && (
          <button
            className="chart-expand-btn"
            onClick={onExpand}
            title="Ampliar grafico"
          >
            <i className="bi bi-arrows-angle-expand" />
          </button>
        )}
      </div>

      <div className="chart-card-body">
        {children}
      </div>
    </div>
  );
}

export default ChartCard;
