function FormsToolbar({
  search,
  setSearch,
  filters,
  setFilters,
}) {
  return (
    <div className="forms-toolbar">
      <div className="forms-search">
        <i className="bi bi-search" />
        <input
          type="text"
          placeholder="Buscar por cliente, proyecto o formulario..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <select
        value={filters.type}
        onChange={(event) =>
          setFilters({
            ...filters,
            type: event.target.value,
          })
        }
      >
        <option value="">Tipo</option>
        <option value="Brief">Brief</option>
        <option value="Propuesta">Propuesta</option>
        <option value="Entrega final">Entrega final</option>
      </select>

      <select
        value={filters.status}
        onChange={(event) =>
          setFilters({
            ...filters,
            status: event.target.value,
          })
        }
      >
        <option value="">Estado</option>
        <option value="Borrador">Borrador</option>
        <option value="En revision">En revision</option>
        <option value="Aprobado">Aprobado</option>
        <option value="Archivado">Archivado</option>
      </select>

      <select
        value={filters.client}
        onChange={(event) =>
          setFilters({
            ...filters,
            client: event.target.value,
          })
        }
      >
        <option value="">Cliente</option>
        <option value="Bruma Studio">Bruma Studio</option>
        <option value="Casa Luma">Casa Luma</option>
        <option value="Nido Market">Nido Market</option>
      </select>
    </div>
  );
}

export default FormsToolbar;
