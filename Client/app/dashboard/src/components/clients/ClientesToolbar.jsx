function ClientesToolbar() {
  return (
    <div className="clientes-toolbar">

      <button className="toolbar-btn">
        <i className="bi bi-search"></i>
        Buscar
      </button>

      <button className="toolbar-btn">
        <i className="bi bi-funnel"></i>
        Filtrar
      </button>

    </div>
  );
}

export default ClientesToolbar;