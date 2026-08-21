function FormHistoryPanel({ selectedForm }) {
  if (!selectedForm) {
    return null;
  }

  return (
    <aside className="form-history-panel">
      <div className="form-history-header">
        <span>Historial del cliente</span>
        <strong>{selectedForm.client}</strong>
      </div>

      <div className="form-history-list">
        {selectedForm.history.map((item) => (
          <div
            className="form-history-item"
            key={`${item.date}-${item.text}`}
          >
            <span>{item.date}</span>
            <p>{item.text}</p>
          </div>
        ))}
      </div>

      <div className="form-next-step">
        <span>Proximo paso sugerido</span>
        <p>{selectedForm.nextStep}</p>
      </div>
    </aside>
  );
}

export default FormHistoryPanel;
