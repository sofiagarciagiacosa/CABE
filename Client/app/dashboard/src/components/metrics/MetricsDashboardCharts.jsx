import ChartCard from "./ChartCard";
import DonutChart from "./DonutChart";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import HorizontalBarChart from "./HorizontalBarChart";

function MetricsDashboardCharts({
  charts,
  onExpand,
}) {
  return (
    <div className="metrics-charts-grid">
      <ChartCard
        title="Proyectos por estado"
        subtitle="Distribucion actual de los proyectos"
        onExpand={() =>
          onExpand({
            title: "Proyectos por estado",
            subtitle: "Distribucion actual de los proyectos",
            content: <DonutChart data={charts.projectStatus} />,
          })
        }
      >
        <DonutChart data={charts.projectStatus} />
      </ChartCard>
       
      <ChartCard
        title="Evolucion de proyectos"
        subtitle="Proyectos iniciados por mes"
        onExpand={() =>
          onExpand({
            title: "Evolucion de proyectos",
            subtitle: "Proyectos iniciados por mes",
            content: <LineChart data={charts.monthlyProjects} />,
          })
        }
      >
        <LineChart data={charts.monthlyProjects} />
      </ChartCard>
      
      
      <ChartCard
        title="Proyectos por rubro"
        subtitle="Sectores con mayor demanda de proyectos"
        onExpand={() =>
          onExpand({
            title: "Proyectos por rubro",
            subtitle: "Sectores con mayor demanda de proyectos",
            content: <BarChart data={charts.clientsByIndustry} />,
          })
        }
      >
        <BarChart data={charts.clientsByIndustry} />
      </ChartCard>
      
      
      <ChartCard
        title="Top clientes por presupuesto"
        subtitle="Clientes con mayor volumen de trabajo"
        onExpand={() =>
          onExpand({
            title: "Top clientes por presupuesto",
            subtitle: "Clientes con mayor volumen de trabajo",
            content: <HorizontalBarChart data={charts.topClients} />,
          })
        }
      >
        <HorizontalBarChart data={charts.topClients} />
      </ChartCard>
      
      
      <ChartCard
        title="Servicios mas solicitados"
        subtitle="Demanda por tipo de trabajo"
        onExpand={() =>
          onExpand({
            title: "Servicios mas solicitados",
            subtitle: "Demanda por tipo de trabajo",
            content: <HorizontalBarChart data={charts.services} />,
          })
        }
      >
        <HorizontalBarChart data={charts.services} />
      </ChartCard>
      
      
      <ChartCard
        title="Ingresos estimados"
        subtitle="Presupuesto proyectado por mes"
        onExpand={() =>
          onExpand({
            title: "Ingresos estimados",
            subtitle: "Presupuesto proyectado por mes",
            content: (
              <BarChart
                data={charts.estimatedRevenue}
                
              />
            ),
          })
        }
      >
        <BarChart
          data={charts.estimatedRevenue}
          valuePrefix="$"
          valueSuffix="K"
        />
      </ChartCard>
      
    </div>
  );
}

export default MetricsDashboardCharts;
