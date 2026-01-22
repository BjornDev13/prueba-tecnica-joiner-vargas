import React from 'react';
import Filters from '../components/planets/Filters';
import Loader from '../components/Loader';
import { usePlanets } from '../hooks/usePlanets';

const Planets: React.FC = () => {
  const {
    planets,
    loading,
    error,
    page,
    totalPages,
    filterName,
    filterDestroyed,
    setPage,
    setFilterName,
    setFilterDestroyed,
  } = usePlanets();

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
        {planets.map((planet) => (
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

      {!filterName && filterDestroyed === undefined && (
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
