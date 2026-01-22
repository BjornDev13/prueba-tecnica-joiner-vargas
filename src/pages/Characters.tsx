import React from 'react';
import CharacterModal from '../components/CharacterModal';
import Filters from '../components/character/Filters';
import CharacterGrid from '../components/character/CharacterGrid';
import Loader from '../components/Loader';
import { useCharacters } from '../hooks/useCharacters';

const Characters: React.FC = () => {
  const {
    loading,
    error,
    page,
    totalPages,
    filterName,
    filterRace,
    filterKi,
    filterAffiliation,
    filterGender,
    showModal,
    editingCharacter,
    user,
    uniqueCharacters,
    setPage,
    setFilterName,
    setFilterRace,
    setFilterAffiliation,
    setFilterGender,
    setShowModal,
    handleCreate,
    handleEdit,
    handleDelete,
    handleSave,
    handleFilterChange,
    handleKiFilterChange,
    exportToCSV,
  } = useCharacters();

  if (loading) {
    return <Loader show={loading} />;
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1>Personajes</h1>
        <div className="page-header__actions">
          <button className="btn" onClick={exportToCSV}>
            Exportar a CSV
          </button>
          {user?.role === 'admin' && (
            <button className="btn btn-primary" onClick={handleCreate}>
              ➕ Crear Personaje
            </button>
          )}
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      <Filters
        filterName={filterName}
        setFilterName={(value) => handleFilterChange(setFilterName, value)}
        filterRace={filterRace}
        setFilterRace={(value) => handleFilterChange(setFilterRace, value)}
        filterKi={filterKi}
        setFilterKi={handleKiFilterChange}
        filterAffiliation={filterAffiliation}
        setFilterAffiliation={(value) => handleFilterChange(setFilterAffiliation, value)}
        filterGender={filterGender}
        setFilterGender={(value) => handleFilterChange(setFilterGender, value)}
      />

      <CharacterGrid
        uniqueCharacters={uniqueCharacters}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        user={user}
      />

      {!filterName && !filterRace && (
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

      {showModal && (
        <CharacterModal
          character={editingCharacter}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Characters;