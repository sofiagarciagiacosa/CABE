function MetricsToolbar({
  period,
  setPeriod,
  view,
  setView,
  onExport,
}) {
  return (
    <div className="metrics-toolbar">
      <div className="metrics-period-control">
        {["30 dias", "Trimestre", "Anual"].map((item) => (
          <button
            key={item}
            className={period === item ? "active" : ""}
            onClick={() => setPeriod(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <select
        value={view}
        onChange={(event) => setView(event.target.value)}
      >
        <option value="general">Vista general</option>
        <option value="comercial">Comercial</option>
        <option value="operativa">Operativa</option>
      </select>

      <button
        className="metrics-export-btn"
        onClick={onExport}
      >
        <i className="bi bi-download" />
        Exportar datos
      </button>
    </div>
  );
}

export default MetricsToolbar;
