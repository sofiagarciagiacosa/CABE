function FormsStats({ stats }) {
  return (
    <div className="forms-stats">
      {stats.map((stat) => (
        <article
          className="forms-stat-card"
          key={stat.label}
        >
          <div className={`forms-stat-icon ${stat.tone}`}>
            <i className={`bi ${stat.icon}`} />
          </div>

          <div>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
          </div>
        </article>
      ))}
    </div>
  );
}

export default FormsStats;
