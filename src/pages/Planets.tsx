import React, { useState, useEffect } from 'react';
import { planetService } from '../services/api';
import type { Planet } from '../types';

const Planets: React.FC = () => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterName, setFilterName] = useState('');
  const [filterDestroyed, setFilterDestroyed] = useState<string>('');

  useEffect(() => {
    loadPlanets();
  }, [page]);

  const loadPlanets = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await planetService.getAll(page, 12);
      setPlanets(data.items);
      setTotalPages(data.meta.totalPages);
    } catch (err) {
      setError('Failed to load planets. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredPlanets = planets.filter((planet) => {
    const matchesName = planet.name.toLowerCase().includes(filterName.toLowerCase());
    const matchesDestroyed =
      filterDestroyed === '' ||
      (filterDestroyed === 'destroyed' && planet.isDestroyed) ||
      (filterDestroyed === 'active' && !planet.isDestroyed);
    return matchesName && matchesDestroyed;
  });

  if (loading && planets.length === 0) {
    return <div className="loading">Cargando planetas...</div>;
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1>Planetas</h1>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="filter-section">
        <div className="filter-row">
          <div className="form-group">
            <label>Filtrar por Nombre</label>
            <input
              type="text"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              placeholder="Buscar por nombre..."
            />
          </div>
          <div className="form-group">
            <label>Filtrar por Estado</label>
            <select
              value={filterDestroyed}
              onChange={(e) => setFilterDestroyed(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="active">Activo</option>
              <option value="destroyed">Destruido</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid">
        {filteredPlanets.map((planet) => (
          <div key={planet.id} className="planet-card">
            <img src={planet.image} alt={planet.name} />
            <div className="card-content">
              <h3>{planet.name}</h3>
              <p>
                <strong>Estado:</strong>{' '}
                <span style={{ color: planet.isDestroyed ? '#ef476f' : '#06d6a0' }}>
                  {planet.isDestroyed ? 'Destruido' : 'Activo'}
                </span>
              </p>
              <p>{planet.description.substring(0, 100)}...</p>
            </div>
          </div>
        ))}
      </div>

      {!filterName && !filterDestroyed && (
        <div className="pagination">
          <button onClick={() => setPage(1)} disabled={page === 1}>
            Primero
          </button>
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            Anterior
          </button>
          <span className="page-info">
            Página {page} de {totalPages}
          </span>
          <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
            Siguiente
          </button>
          <button onClick={() => setPage(totalPages)} disabled={page === totalPages}>
            Último
          </button>
        </div>
      )}
    </div>
  );
};

export default Planets;
