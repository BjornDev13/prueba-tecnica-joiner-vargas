import React, { useState, useEffect } from 'react';
import { characterService } from '../services/api';
import type { Character } from '../types';
import { useAuth } from '../contexts/AuthContext';
import CharacterModal from '../components/CharacterModal';
import Filters from '../components/character/Filters';
import CharacterGrid from '../components/character/CharacterGrid';
import Loader from '../components/Loader';

const Characters: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterName, setFilterName] = useState('');
  const [filterRace, setFilterRace] = useState('');
  const [filterKi, setFilterKi] = useState('');
  const [filterAffiliation, setFilterAffiliation] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null);
  const [localCharacters, setLocalCharacters] = useState<Character[]>([]);
  const { user } = useAuth();

  // Load local characters from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('localCharacters');
    if (saved) {
      setLocalCharacters(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    loadCharacters();
  }, [page, filterName, filterRace, filterKi, filterAffiliation, filterGender]);

  const loadCharacters = async () => {
    try {
      setLoading(true);
      setError('');
      const filters = {
        name: filterName,
        race: filterRace,
        ki: filterKi,
        affiliation: filterAffiliation,
        gender: filterGender,
      };
      const data = await characterService.getAll(page, 12, filters);
      setCharacters(data.items);
      setTotalPages(data.meta.totalPages);
    } catch (err) {
      setError('Failed to load characters. Please try again.');
      console.error(err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handleCreate = () => {
    setEditingCharacter(null);
    setShowModal(true);
  };

  const handleEdit = (character: Character) => {
    setEditingCharacter(character);
    setShowModal(true);
  };

  const handleDelete = async (character: Character) => {
    if (!window.confirm(`Are you sure you want to delete ${character.name}?`)) {
      return;
    }

    try {
      // For API characters, simulate deletion
      if (character.id < 1000000) {
        setCharacters(characters.filter((c) => c.id !== character.id));
      } else {
        // For local characters, actually remove from local storage
        const updatedLocal = localCharacters.filter((c) => c.id !== character.id);
        setLocalCharacters(updatedLocal);
        localStorage.setItem('localCharacters', JSON.stringify(updatedLocal));
        setCharacters(characters.filter((c) => c.id !== character.id));
      }
    } catch (err) {
      setError('Failed to delete character.');
      console.error(err);
    }
  };

  const handleSave = async (character: Character) => {
    try {
      if (editingCharacter) {
        // Update existing character
        if (editingCharacter.id >= 1000000) {
          // Local character
          const updatedLocal = localCharacters.map((c) =>
            c.id === character.id ? character : c
          );
          setLocalCharacters(updatedLocal);
          localStorage.setItem('localCharacters', JSON.stringify(updatedLocal));
          setCharacters(characters.map((c) => (c.id === character.id ? character : c)));
        } else {
          // API character - simulate update
          setCharacters(characters.map((c) => (c.id === character.id ? character : c)));
        }
      } else {
        // Create new character
        const newCharacter = {
          ...character,
          id: Date.now(), // Generate unique ID
        };
        const updatedLocal = [...localCharacters, newCharacter];
        setLocalCharacters(updatedLocal);
        localStorage.setItem('localCharacters', JSON.stringify(updatedLocal));
        setCharacters([newCharacter, ...characters]);
      }
      setShowModal(false);
    } catch (err) {
      setError('Failed to save character.');
      console.error(err);
    }
  };

  const filteredCharacters = [...localCharacters, ...characters].filter((character) => {
    const matchesName = character.name.toLowerCase().includes(filterName.toLowerCase());
    const matchesRace = !filterRace || character.race.toLowerCase().includes(filterRace.toLowerCase());
    const matchesKi = !filterKi || character.ki.toLowerCase().includes(filterKi.toLowerCase());
    const matchesAffiliation = !filterAffiliation || character.affiliation.toLowerCase().includes(filterAffiliation.toLowerCase());
    const matchesGender = !filterGender || character.gender.toLowerCase().includes(filterGender.toLowerCase());
    return matchesName && matchesRace && matchesKi && matchesAffiliation && matchesGender;
  });

  // Remove duplicates (in case a character exists both locally and in API)
  const uniqueCharacters = Array.from(
    new Map(filteredCharacters.map((c) => [c.id, c])).values()
  );

  const handleFilterChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    if (page !== 1) {
      setPage(1);
    }
    setLoading(true);
    setTimeout(() => {
      setter(value);
      setLoading(false);
    }, 500);
  };

  const handleKiFilterChange = (value: string) => {
    setLoading(true);
    setTimeout(() => {
      setFilterKi(value);
      setLoading(false);
    }, 500);
  };

  if (loading) {
    return <Loader show={loading} />;
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1>Personajes</h1>
        {user?.role === 'admin' && (
          <button className="btn btn-primary" onClick={handleCreate}>
            ➕ Crear Personaje
          </button>
        )}
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
