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
          <h2>{character ? 'Edit Character' : 'Create Character'}</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name *</label>
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
            <label htmlFor="race">Race *</label>
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
            <label htmlFor="gender">Gender *</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
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
            <label htmlFor="maxKi">Max Ki *</label>
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
            <label htmlFor="affiliation">Affiliation *</label>
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
            <label htmlFor="image">Image URL *</label>
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
            <label htmlFor="description">Description *</label>
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
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {character ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CharacterModal;
