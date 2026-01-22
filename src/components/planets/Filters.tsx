import type { PlanetFilters } from '../../types/planets'

export default function Filters({
    filterName,
    setFilterName,
    filterDestroyed,
    setFilterDestroyed,
} : PlanetFilters) {
  return (
    <div className="filter-section">
        <div className="filter-row">
          <div className="form-group">
            <label>Filtrar por Nombre</label>
            <div className="input-with-clear">
                <input
                type="text"
                defaultValue={filterName}
                onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    setFilterName(e.currentTarget.value);
                    }
                }}
                placeholder="Buscar por nombre..."
                />
                {filterName && (
                    <button
                        className="clear-btn"
                        onClick={() => setFilterName('')}
                    >
                        x
                    </button>
                )}
            </div>
          </div>
          <div className="form-group">
            <label>Filtrar por Estado</label>
            <select
              value={filterDestroyed === undefined ? '' : filterDestroyed ? 'destroyed' : 'active'}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '') {
                  setFilterDestroyed(undefined);
                } else {
                  setFilterDestroyed(value === 'destroyed');
                }
              }}
            >
              <option value="">Todos</option>
              <option value="destroyed">Destruido</option>
              <option value="active">Activo</option>
            </select>
          </div>
        </div>
      </div>
  )
}
