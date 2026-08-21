import ChartCard from "./ChartCard";

function MetricsChartsSection() {

    return (

        <div className="metrics-charts-grid">

            <ChartCard

                title="Proyectos por estado"

                subtitle="Distribución actual de los proyectos"

            >

            <div className="chart-placeholder">Gráfico Donut</div>

            </ChartCard>

            <ChartCard

                title="Evolución de proyectos"

                subtitle="Crecimiento mensual de proyectos"

            >

            <div className="chart-placeholder">Gráfico de Línea</div>

            </ChartCard>

            <ChartCard

                title="Clientes por rubro"

                subtitle="Sectores con más clientes activos"

            >

            <div className="chart-placeholder">Gráfico de Barras</div>

            </ChartCard>

            <ChartCard

                title="Top clientes por presupuesto"

                subtitle="Clientes con mayor volumen de trabajo"

            >

            <div className="chart-placeholder">Gráfico de Barras</div>

            </ChartCard>

        </div>

    );

}

export default MetricsChartsSection;