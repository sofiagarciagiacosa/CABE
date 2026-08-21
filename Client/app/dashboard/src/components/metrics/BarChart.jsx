function BarChart({
  data,
  valuePrefix = "",
  valueSuffix = "",
}) {
  const maxValue = Math.max(
    ...data.map((item) => item.value),
    1 // evita dividir por 0 cuando todos los valores son 0
  );

  return (
    <div
      className="bar-chart"
      style={{
        gridTemplateColumns: `repeat(${data.length}, minmax(0, 1fr))`,
      }}
    >
      {data.map((item) => (
        <div
          className="bar-chart-item"
          key={item.label}
        >
          <div className="bar-chart-track">
            <div
              className="bar-chart-fill"
              style={{
                height: `${(item.value / maxValue) * 100}%`,
                background: item.color,
              }}
            />
          </div>

          <strong>
            {item.displayValue ??
              `${valuePrefix}${item.value}${valueSuffix}`}
          </strong>

          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export default BarChart;