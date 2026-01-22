import { useState, useEffect } from 'react';
import { characterService } from '../services/api';
import type { Character } from '../types';
import { useAuth } from '../contexts/AuthContext';

export const useCharacters = () => {
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
      }, 1500);
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
      if (character.id < 1000000) {
        setCharacters(characters.filter((c) => c.id !== character.id));
      } else {
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
        if (editingCharacter.id >= 1000000) {
          const updatedLocal = localCharacters.map((c) =>
            c.id === character.id ? character : c
          );
          setLocalCharacters(updatedLocal);
          localStorage.setItem('localCharacters', JSON.stringify(updatedLocal));
          setCharacters(characters.map((c) => (c.id === character.id ? character : c)));
        } else {
          setCharacters(characters.map((c) => (c.id === character.id ? character : c)));
        }
      } else {
        const newCharacter = { ...character, id: Date.now() };
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
    const matchesAffiliation = !filterAffiliation || character?.affiliation?.toLowerCase().includes(filterAffiliation.toLowerCase());
    const matchesGender = !filterGender || character.gender.toLowerCase().includes(filterGender.toLowerCase());
    return matchesName && matchesRace && matchesKi && matchesAffiliation && matchesGender;
  });

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
    }, 1500);
  };

  const handleKiFilterChange = (value: string) => {
    setLoading(true);
    setTimeout(() => {
      setFilterKi(value);
      setLoading(false);
    }, 1500);
  };

  const exportToCSV = () => {
    const csvRows = [
      ['ID', 'Name', 'Ki', 'Race', 'Gender', 'Description', 'Affiliation', 'Image'],
    ];

    uniqueCharacters.forEach((character) => {
      csvRows.push([
        String(character.id),
        character.name,
        character.ki,
        character.race,
        character.gender,
        character.description,
        character.affiliation,
        character.image,
      ]);
    });

    const csvContent = csvRows.map((e) => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.href) {
      URL.revokeObjectURL(link.href);
    }
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', 'characters.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    characters,
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
    setFilterKi,
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
  };
};
