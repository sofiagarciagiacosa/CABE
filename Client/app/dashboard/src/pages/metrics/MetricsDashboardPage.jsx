import { useEffect, useState } from "react";

import "../../styles/metrics.css";
import MetricsCardsGrid from "../../components/metrics/MetricsCardsGrid";
import MetricsDashboardCharts from "../../components/metrics/MetricsDashboardCharts";
import MetricsToolbar from "../../components/metrics/MetricsToolbar";
import AnalyticsSummary from "../../components/metrics/AnalyticsSummary";
import ChartModal from "../../components/metrics/ChartModal";
import { getDashboardMetrics } from "../../services/metrics.service";

/* habria que eliminarlo
const chartData = {
  projectStatus: [
    { label: "Activos", value: 12, color: "#ff3231" },
    { label: "En pausa", value: 3, color: "#f2a541" },
    { label: "Finalizados", value: 8, color: "#74a57f" },
    { label: "Planificados", value: 5, color: "#7f5af0" },
  ],
  monthlyProjects: [
    { label: "Ene", value: 5 },
    { label: "Feb", value: 7 },
    { label: "Mar", value: 6 },
    { label: "Abr", value: 10 },
    { label: "May", value: 9 },
    { label: "Jun", value: 12 },
  ],
  clientsByIndustry: [
    { label: "Moda", value: 7, color: "#ff3231" },
    { label: "Gastro", value: 5, color: "#cbbb2a" },
    { label: "E-com", value: 4, color: "#7f5af0" },
    { label: "Salud", value: 3, color: "#74a57f" },
    { label: "Otro", value: 2, color: "#f2a541" },
  ],
  topClients: [
    {
      label: "Bruma Studio",
      value: 1200000,
      displayValue: "$1.2M",
      color: "#ff3231",
    },
    {
      label: "Casa Luma",
      value: 950000,
      displayValue: "$950K",
      color: "#cbbb2a",
    },
    {
      label: "Nido Market",
      value: 740000,
      displayValue: "$740K",
      color: "#7f5af0",
    },
    {
      label: "Aura Lab",
      value: 520000,
      displayValue: "$520K",
      color: "#74a57f",
    },
  ],
  services: [
    {
      label: "Branding",
      value: 14,
      displayValue: "14 pedidos",
      color: "#ff3231",
    },
    {
      label: "Redes",
      value: 11,
      displayValue: "11 pedidos",
      color: "#f2a541",
    },
    {
      label: "Produccion",
      value: 8,
      displayValue: "8 pedidos",
      color: "#7f5af0",
    },
    {
      label: "Web",
      value: 6,
      displayValue: "6 pedidos",
      color: "#74a57f",
    },
  ],
  estimatedRevenue: [
    { label: "Ene", value: 580, color: "#e4d445" },
    { label: "Feb", value: 720, color: "#f2a541" },
    { label: "Mar", value: 640, color: "#74a57f" },
    { label: "Abr", value: 890, color: "#7f5af0" },
    { label: "May", value: 760, color: "#ff7b54" },
    { label: "Jun", value: 940, color: "#ff3231" },
  ],
};
*/
/*
const metricsByPeriod = {
  "30 dias": [
    {
      title: "Proyectos activos",
      value: "12",
      change: "+3",
      period: "vs mes anterior",
      positive: true,
      icon: "bi-kanban",
      tone: "red",
    },
    {
      title: "Clientes activos",
      value: "18",
      change: "+2",
      period: "vs mes anterior",
      positive: true,
      icon: "bi-people",
      tone: "mustard",
    },
    {
      title: "Ingresos estimados",
      value: "$4.2M",
      change: "+12%",
      period: "vs mes anterior",
      positive: true,
      icon: "bi-cash-stack",
      tone: "green",
    },
    {
      title: "Tareas vencidas",
      value: "4",
      change: "-2",
      period: "vs semana anterior",
      positive: true,
      icon: "bi-exclamation-circle",
      tone: "orange",
    },
    {
      title: "Cumplimiento",
      value: "86%",
      change: "+5%",
      period: "vs mes anterior",
      positive: true,
      icon: "bi-graph-up-arrow",
      tone: "violet",
    },
  ],
  Trimestre: [
    {
      title: "Proyectos activos",
      value: "28",
      change: "+9",
      period: "vs trimestre anterior",
      positive: true,
      icon: "bi-kanban",
      tone: "red",
    },
    {
      title: "Clientes activos",
      value: "24",
      change: "+4",
      period: "vs trimestre anterior",
      positive: true,
      icon: "bi-people",
      tone: "mustard",
    },
    {
      title: "Ingresos estimados",
      value: "$11.8M",
      change: "+18%",
      period: "vs trimestre anterior",
      positive: true,
      icon: "bi-cash-stack",
      tone: "green",
    },
    {
      title: "Tareas vencidas",
      value: "9",
      change: "+2",
      period: "vs trimestre anterior",
      positive: false,
      icon: "bi-exclamation-circle",
      tone: "orange",
    },
    {
      title: "Cumplimiento",
      value: "82%",
      change: "-3%",
      period: "vs trimestre anterior",
      positive: false,
      icon: "bi-graph-up-arrow",
      tone: "violet",
    },
  ],
  Anual: [
    {
      title: "Proyectos activos",
      value: "74",
      change: "+21",
      period: "vs anio anterior",
      positive: true,
      icon: "bi-kanban",
      tone: "red",
    },
    {
      title: "Clientes activos",
      value: "39",
      change: "+8",
      period: "vs anio anterior",
      positive: true,
      icon: "bi-people",
      tone: "mustard",
    },
    {
      title: "Ingresos estimados",
      value: "$38.4M",
      change: "+24%",
      period: "vs anio anterior",
      positive: true,
      icon: "bi-cash-stack",
      tone: "green",
    },
    {
      title: "Tareas vencidas",
      value: "31",
      change: "-7",
      period: "vs anio anterior",
      positive: true,
      icon: "bi-exclamation-circle",
      tone: "orange",
    },
    {
      title: "Cumplimiento",
      value: "88%",
      change: "+6%",
      period: "vs anio anterior",
      positive: true,
      icon: "bi-graph-up-arrow",
      tone: "violet",
    },
  ],
};
*/

function MetricsDashboardPage() {
  const [period, setPeriod] =
    useState("30 dias");
  const [view, setView] =
    useState("general");
  const [expandedChart, setExpandedChart] =
    useState(null);
  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  const charts = dashboard?.charts ?? {
      projectStatus: [],
      monthlyProjects: [],
      clientsByIndustry: [],
      topClients: [],
      estimatedRevenue: [],
      services: [],
  };

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);

        const data = await getDashboardMetrics(period);

        setDashboard(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [period]);

  const metrics = dashboard?.cards || [];

  const insights = {
    title:
      view === "operativa"
        ? "La carga operativa subio y conviene revisar vencimientos."
        : view === "comercial"
          ? "Branding y redes concentran la mayor demanda comercial."
          : "El tablero muestra crecimiento saludable con foco en cumplimiento.",
    description:
      "Los ingresos estimados crecen en relacion al periodo anterior y los clientes activos sostienen una base estable. La senal a mirar es el volumen de tareas vencidas para evitar impacto en entregas.",
    actions: [
      "Priorizar proyectos con fecha limite cercana y alto presupuesto.",
      "Revisar capacidad del equipo si las tareas vencidas superan el 10%.",
      "Usar servicios mas solicitados para ajustar propuestas comerciales.",
    ],
  };

  const handleExport = () => {
    const rows = [
      ["Periodo", period],
      ["Vista", view],
      [],
      ["KPI", "Valor", "Cambio", "Comparacion"],
      ...metrics.map((metric) => [
        metric.title,
        metric.value,
        metric.change,
        metric.period,
      ]),
    ];

    const csv = rows
      .map((row) => row.join(","))
      .join("\n");
    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `metricas-cabe-${period}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };
    if (loading) {

    return <div>Cargando dashboard...</div>;

  }
  return (
    <div className="metrics-page">
      <div className="metrics-header">
        <div>
          <span className="metrics-page-label">
            Dashboard de decision
          </span>
          <h1>Metricas y analiticas</h1>
          <p>
            Indicadores clave para entender proyectos, clientes,
            ingresos estimados y rendimiento del equipo.
          </p>
        </div>

        <MetricsToolbar
          period={period}
          setPeriod={setPeriod}
          view={view}
          setView={setView}
          onExport={handleExport}
        />
      </div>

      <div className="metrics-divider" />

      <MetricsCardsGrid metrics={metrics} />

      <AnalyticsSummary insights={insights} />

      <MetricsDashboardCharts
          charts={charts}
          onExpand={setExpandedChart}
      />

      <ChartModal
        chart={expandedChart}
        onClose={() => setExpandedChart(null)}
      />
    </div>
  );
}

export default MetricsDashboardPage;
