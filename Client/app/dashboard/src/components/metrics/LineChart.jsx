function LineChart({ data }) {
  const maxValue = Math.max(
    ...data.map((item) => item.value),
    1
  );

  const chartWidth = 340;
  const chartHeight = 180;

  const padding = {
    top: 20,
    right: 20,
    bottom: 35,
    left: 40,
  };

  const innerWidth =
    chartWidth - padding.left - padding.right;

  const innerHeight =
    chartHeight - padding.top - padding.bottom;

  const coordinates = data.map((item, index) => {
    const x =
      padding.left +
      (index /
        Math.max(data.length - 1, 1)) *
        innerWidth;

    const y =
      padding.top +
      (1 - item.value / maxValue) *
        innerHeight;

    return {
      ...item,
      x,
      y,
    };
  });

  const points = coordinates
    .map((p) => `${p.x},${p.y}`)
    .join(" ");

  const maxSteps = 5;

  const steps =
    maxValue <= maxSteps
      ? maxValue
      : maxSteps;

  const axisValues = [];

  for (let i = 0; i <= steps; i++) {
    axisValues.push(
      Math.round(maxValue - (maxValue * i) / steps)
    );
  }

  // elimina repetidos (por ejemplo 2,2,1,1,0)
  const uniqueAxisValues = [...new Set(axisValues)];

  return (
    <div className="line-chart">
      <svg
        className="line-chart-svg"
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
      >
        {/* Líneas horizontales + eje Y */}

        {uniqueAxisValues.map((value, index) => {
          const y =
            padding.top +
            (index /
              Math.max(uniqueAxisValues.length - 1, 1)) *
              innerHeight;

          return (
            <g key={value}>
              <line
                x1={padding.left}
                y1={y}
                x2={chartWidth - padding.right}
                y2={y}
                stroke="#ECECEC"
                strokeDasharray="3 3"
              />

              <text
                x={padding.left - 8}
                y={y + 4}
                textAnchor="end"
                className="line-chart-axis"
              >
                {value}
              </text>
            </g>
          );
        })}

        {/* Línea */}

        <polyline
          points={points}
          fill="none"
          stroke="#4F8EF7"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Puntos */}

        {coordinates.map((point) => (
          <g key={point.label}>
            <circle
              cx={point.x}
              cy={point.y}
              r="5"
              fill="white"
              stroke="#4F8EF7"
              strokeWidth="2"
            />

            <circle
              cx={point.x}
              cy={point.y}
              r="2.2"
              fill="#4F8EF7"
            />

            <text
              x={point.x}
              y={chartHeight - 10}
              textAnchor="middle"
              className="line-chart-month"
            >
              {point.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default LineChart;