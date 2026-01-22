import React from 'react';
import { useState, useEffect } from 'react';
import type { Character } from '../types';

interface CharacterModalProps {
  character: Character | null;
  onSave: (character: Character) => void;
  onClose: () => void;
}

const CharacterModal: React.FC<CharacterModalProps> = ({
  character,
  onSave,
  onClose,
}) => {
  const [formData, setFormData] = useState<Omit<Character, 'id'>>({
    name: '',
    ki: '',
    maxKi: '',
    race: '',
    gender: '',
    description: '',
    image: '',
    affiliation: '',
  });

  useEffect(() => {
    if (character) {
      setFormData({
        name: character.name,
        ki: character.ki,
        maxKi: character.maxKi,
        race: character.race,
        gender: character.gender,
        description: character.description,
        image: character.image,
        affiliation: character.affiliation,
      });
    }
  }, [character]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: character?.id || 0,
    } as Character);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{character ? 'Editar Personaje' : 'Crear Personaje'}</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="race">Raza *</label>
            <input
              type="text"
              id="race"
              name="race"
              value={formData.race}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="gender">Género *</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar género</option>
              <option value="Male">Masculino</option>
              <option value="Female">Femenino</option>
              <option value="Other">Otro</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="ki">Ki *</label>
            <input
              type="text"
              id="ki"
              name="ki"
              value={formData.ki}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="maxKi">Ki Máximo *</label>
            <input
              type="text"
              id="maxKi"
              name="maxKi"
              value={formData.maxKi}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="affiliation">Afiliación *</label>
            <input
              type="text"
              id="affiliation"
              name="affiliation"
              value={formData.affiliation}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">URL de la Imagen *</label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Descripción *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {character ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CharacterModal;
