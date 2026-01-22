import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import type { Character, Planet } from '../types';
import { planetService } from '../services/api';

const schema = yup.object().shape({
  name: yup.string()
    .required('El nombre es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(50, 'El nombre no puede tener más de 50 caracteres')
    .matches(/^[A-Z]/, 'La primera letra del nombre debe ser mayúscula'),
  ki: yup.string()
    .required('El Ki es requerido')
    .min(1, 'El Ki debe ser al menos 1')
    .test('is-less-than-maxKi', 'El Ki no puede ser mayor que el Ki máximo', function (value) {
      const { maxKi } = this.parent;
      return Number(value) <= Number(maxKi);
    }),
  maxKi: yup.string().required('El Ki máximo es requerido'),
  race: yup.string().required('La raza es requerida'),
  gender: yup.string().required('El género es requerido'),
  description: yup.string()
    .required('La descripción es requerida')
    .min(1, 'La descripción debe tener al menos 1 caracter')
    .max(1000, 'La descripción no puede tener más de 1000 caracteres'),
  originPlanet: yup.string().required('El planeta de origen es requerido'),
  affiliation: yup.string()
    .min(3, 'La afiliación debe tener al menos 3 caracteres')
    .max(50, 'La afiliación no puede tener más de 50 caracteres')
    .matches(/^[A-Z]/, 'La primera letra de la afiliación debe ser mayúscula'),
  image: yup.string().url('Debe ser una URL válida').required('La imagen es requerida'),
});

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
  const [planets, setPlanets] = useState<Planet[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Omit<Character, 'id'>>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await planetService.getAll(1, 100); // Adjust limit as needed
        setPlanets(response.items);
      } catch (error) {
        console.error('Error fetching planets:', error);
      }
    };

    fetchPlanets();
  }, []);

  useEffect(() => {
    if (character) {
      reset({
        ...character,
        originPlanet: character.originPlanet?.name || '',
      });
    } else {
      reset({
        name: '',
        ki: '',
        maxKi: '',
        race: '',
        gender: '',
        description: '',
        image: '',
        affiliation: '',
        originPlanet: '',
      });
    }
  }, [character, reset]);

  const onSubmit = (data: Omit<Character, 'id'>) => {
    onSave({
      ...data,
      id: character?.id || 0,
    } as Character);
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

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="name">Nombre *</label>
            <input
              type="text"
              id="name"
              {...register('name')}
            />
            {errors.name && <p className="error-message">{errors.name.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="race">Raza *</label>
            <input
              type="text"
              id="race"
              {...register('race')}
            />
            {errors.race && <p className="error-message">{errors.race.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="gender">Género *</label>
            <select
              id="gender"
              {...register('gender')}
            >
              <option value="">Seleccionar género</option>
              <option value="Male">Masculino</option>
              <option value="Female">Femenino</option>
              <option value="Other">Otro</option>
            </select>
            {errors.gender && <p className="error-message">{errors.gender.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="ki">Ki *</label>
            <input
              type="number"
              id="ki"
              {...register('ki')}
            />
            {errors.ki && <p className="error-message">{errors.ki.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="maxKi">Ki Máximo *</label>
            <input
              type="number"
              id="maxKi"
              {...register('maxKi')}
            />
            {errors.maxKi && <p className="error-message">{errors.maxKi.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="originPlanet">Planeta de Origen *</label>
            <select id="originPlanet" {...register('originPlanet')}>
              <option value="">Seleccionar planeta</option>
              {planets.map((planet) => (
                <option key={planet.id} value={planet.name}>
                  {planet.name}
                </option>
              ))}
            </select>
            {errors.originPlanet && <p className="error-message">{errors.originPlanet.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="affiliation">Afiliación</label>
            <input
              type="text"
              id="affiliation"
              {...register('affiliation')}
            />
            {errors.affiliation && <p className="error-message">{errors.affiliation.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="image">URL de la Imagen *</label>
            <input
              type="url"
              id="image"
              {...register('image')}
              placeholder="https://example.com/image.jpg"
            />
            {errors.image && <p className="error-message">{errors.image.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Descripción *</label>
            <textarea
              id="description"
              {...register('description')}
            />
            {errors.description && <p className="error-message">{errors.description.message}</p>}
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
