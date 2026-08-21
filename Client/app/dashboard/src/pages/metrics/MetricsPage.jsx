import "../../styles/metrics.css";
import MetricsCardsGrid from "../../components/metrics/MetricsCardsGrid";
import MetricsChartsSection from "../../components/metrics/MetricsChartsSection";

function MetricsPage() {
  return (
    <div className="metrics-page">
      <div className="metrics-topbar">
        <span className="metrics-page-label">
          Métricas y analíticas
        </span>
      </div>

      <div className="metrics-divider" />

      <MetricsCardsGrid />
      <MetricsChartsSection />
    </div>
  );
}

export default MetricsPage;