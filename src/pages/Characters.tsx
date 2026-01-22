import React, { useState, useEffect } from 'react';
import { characterService } from '../services/api';
import type { Character } from '../types';
import { useAuth } from '../contexts/AuthContext';
import CharacterModal from '../components/CharacterModal';

const Characters: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterName, setFilterName] = useState('');
  const [filterRace, setFilterRace] = useState('');
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
  }, [page]);

  const loadCharacters = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await characterService.getAll(page, 12);
      setCharacters(data.items);
      setTotalPages(data.meta.totalPages);
    } catch (err) {
      setError('Failed to load characters. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
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
    return matchesName && matchesRace;
  });

  // Remove duplicates (in case a character exists both locally and in API)
  const uniqueCharacters = Array.from(
    new Map(filteredCharacters.map((c) => [c.id, c])).values()
  );

  if (loading && characters.length === 0) {
    return <div className="loading">Loading characters...</div>;
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1>Characters</h1>
        {user?.role === 'admin' && (
          <button className="btn btn-primary" onClick={handleCreate}>
            ➕ Create Character
          </button>
        )}
      </div>

      {error && <div className="error">{error}</div>}

      <div className="filter-section">
        <div className="filter-row">
          <div className="form-group">
            <label>Filter by Name</label>
            <input
              type="text"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              placeholder="Search by name..."
            />
          </div>
          <div className="form-group">
            <label>Filter by Race</label>
            <input
              type="text"
              value={filterRace}
              onChange={(e) => setFilterRace(e.target.value)}
              placeholder="Search by race..."
            />
          </div>
        </div>
      </div>

      <div className="grid">
        {uniqueCharacters.map((character) => (
          <div key={character.id} className="character-card">
            <img src={character.image} alt={character.name} />
            <div className="card-content">
              <h3>{character.name}</h3>
              <p><strong>Race:</strong> {character.race}</p>
              <p><strong>Gender:</strong> {character.gender}</p>
              <p><strong>Ki:</strong> {character.ki}</p>
              <p><strong>Affiliation:</strong> {character.affiliation}</p>
              {user?.role === 'admin' && (
                <div className="card-actions">
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => handleEdit(character)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(character)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {!filterName && !filterRace && (
        <div className="pagination">
          <button onClick={() => setPage(1)} disabled={page === 1}>
            First
          </button>
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            Previous
          </button>
          <span className="page-info">
            Page {page} of {totalPages}
          </span>
          <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
            Next
          </button>
          <button onClick={() => setPage(totalPages)} disabled={page === totalPages}>
            Last
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
