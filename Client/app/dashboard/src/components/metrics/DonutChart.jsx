function DonutChart({ data }) {
  const total = data.reduce(
    (sum, item) => sum + item.value,
    0
  );
  const gradient = data
    .reduce(
      (acc, item) => {
        const start = acc.current;
        const end = start + (item.value / total) * 100;

        acc.parts.push(
          `${item.color} ${start}% ${end}%`
        );

        return {
          current: end,
          parts: acc.parts,
        };
      },
      {
        current: 0,
        parts: [],
      }
    )
    .parts.join(", ");

  return (
    <div className="donut-chart-layout">
      <div
        className="donut-chart"
        style={{
          background: `conic-gradient(${gradient})`,
        }}
      >
        <div className="donut-chart-center">
          <strong>{total}</strong>
          <span>proyectos</span>
        </div>
      </div>

      <div className="chart-legend">
        {data.map((item) => (
          <div
            className="chart-legend-item"
            key={item.label}
          >
            <span
              style={{
                background: item.color,
              }}
            />
            <p>{item.label}</p>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DonutChart;
