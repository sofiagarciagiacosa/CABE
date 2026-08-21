import MetricCard from "./MetricCard";

function MetricsCardsGrid({ metrics }) {
  return (
    <div className="metrics-cards-grid">
      {metrics.map((metric) => (
        <MetricCard
          key={metric.title}
          {...metric}
        />
      ))}
    </div>
  );
}

export default MetricsCardsGrid;
