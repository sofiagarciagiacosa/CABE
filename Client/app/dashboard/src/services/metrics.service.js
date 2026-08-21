export async function getDashboardMetrics(period) {
  const response = await fetch(
    `http://localhost:3000/metricas/dashboard?period=${period}`,
  );

  if (!response.ok) {
    throw new Error("Error al obtener las métricas");
  }

  return response.json();
}
