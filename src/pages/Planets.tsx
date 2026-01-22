import React, { useState, useEffect } from 'react';
import { planetService } from '../services/api';
import type { Planet } from '../types';
import Filters from '../components/planets/Filters';
import Loader from '../components/Loader';

const Planets: React.FC = () => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterName, setFilterName] = useState('');
  const [filterDestroyed, setFilterDestroyed] = useState<boolean>();

  useEffect(() => {
    loadPlanets(filterName, filterDestroyed);
  }, [page, filterName, filterDestroyed]);

  const loadPlanets = async (name?: string, isDestroyed?: boolean) => {
    try {
      setLoading(true);
      setError('');
      const filters: Record<string, string | number | boolean> = {};
      if (name) filters.name = name;
      if (isDestroyed !== undefined) filters.isDestroyed = isDestroyed;

      const data = await planetService.getAll(page, 12, filters);
      setPlanets(data.items);
      setTotalPages(data.meta.totalPages);
    } catch (err) {
      setError('Failed to load planets. Please try again.');
      console.error(err);
    } finally {
      setTimeout(() => setLoading(false), 500); // Simulate loading delay
    }
  };

  const filteredPlanets = planets;

  if (loading) {
    return <Loader show={loading} />;
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1>Planetas</h1>
      </div>

      {error && <div className="error">{error}</div>}

      <Filters
        filterName={filterName}
        setFilterName={setFilterName}
        filterDestroyed={filterDestroyed}
        setFilterDestroyed={setFilterDestroyed}
      />

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
