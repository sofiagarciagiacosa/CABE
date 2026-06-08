function ClientesToolbar({
  search,
  setSearch,
  filters,
  setFilters,
}) {

  return (
    <div className="clientes-toolbar">

      {/* SEARCH */}

      <div className="toolbar-search">

        <i className="bi bi-search" />

        <input
          type="text"
          placeholder="Buscar cliente..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

      </div>

      {/* FILTROS */}

      <select
        value={filters.estado}
        onChange={(e) =>
          setFilters({
            ...filters,
            estado:
              e.target.value,
          })
        }
      >
        <option value="">
          Estado
        </option>

        <option>
          Prospecto
        </option>

        <option>
          Contactado
        </option>

        <option>
          Cliente Activo
        </option>

        <option>
          Proyecto en Pausa
        </option>

        <option>
          Finalizado
        </option>

        <option>
          Archivado
        </option>

      </select>

      <select
        value={filters.rubro}
        onChange={(e) =>
          setFilters({
            ...filters,
            rubro:
              e.target.value,
          })
        }
      >
        <option value="">
          Rubro
        </option>

        <option>
          Tecnología
        </option>

        <option>
          Salud
        </option>

        <option>
          Educación
        </option>

        <option>
          E-commerce
        </option>

        <option>
          Gastronomía
        </option>

        <option>
          Moda
        </option>

        <option>
          Marketing
        </option>

        <option>
          Inmobiliaria
        </option>

      </select>

      <select
        value={
          filters.prioridad
        }
        onChange={(e) =>
          setFilters({
            ...filters,
            prioridad:
              e.target.value,
          })
        }
      >
        <option value="">
          Prioridad
        </option>

        <option>
          Alta
        </option>

        <option>
          Media
        </option>

        <option>
          Baja
        </option>

      </select>

    </div>
  );
}

export default ClientesToolbar;