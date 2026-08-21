function HorizontalBarChart({ data }) {
  const maxValue = Math.max(
    ...data.map((item) => item.value)
  );

  return (
    <div className="horizontal-chart">
      {data.map((item) => (
        <div
          className="horizontal-chart-row"
          key={item.label}
        >
          <div className="horizontal-chart-label">
            <span>{item.label}</span>
            <strong>{item.displayValue}</strong>
          </div>

          <div className="horizontal-chart-track">
            <div
              className="horizontal-chart-fill"
              style={{
                width: `${(item.value / maxValue) * 100}%`,
                background: item.color,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default HorizontalBarChart;
