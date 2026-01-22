import { useState, useEffect } from 'react';
import { planetService } from '../services/api';
import type { Planet } from '../types';

export const usePlanets = () => {
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

  return {
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
  };
};
