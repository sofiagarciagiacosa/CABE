
function MetricCard({
  title,
  value,
  change,
  period,
  positive,
  icon,
  tone = "neutral",
}) {
  return (
    <div className={`metric-card ${tone}`}>
      <div className="metric-card-header">
        <div className="metric-card-title">
          <div className="metric-card-icon">
            <i className={`bi ${icon}`} />
          </div>

          <span>{title}</span>
        </div>
      </div>

      <div className="metric-card-value">
        {value}
      </div>

      {change !== undefined && change !== null && (
        <div
          className={`metric-card-change ${
            positive ? "positive" : "negative"
          }`}
        >
          <i
            className={`bi ${
              positive
                ? "bi-arrow-up-right"
                : "bi-arrow-down-right"
            }`}
          />

          <span>{change}</span>

          <small>{period}</small>
        </div>
      )}
    </div>
  );
}

export default MetricCard;
