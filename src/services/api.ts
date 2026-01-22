import axios from 'axios';
import { Character, Planet, ApiResponse } from '../types';

const API_BASE_URL = 'https://dragonball-api.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const characterService = {
  // Get all characters with pagination
  getAll: async (page: number = 1, limit: number = 10) => {
    const response = await api.get<ApiResponse<Character>>(`/characters?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Get character by ID
  getById: async (id: number) => {
    const response = await api.get<Character>(`/characters/${id}`);
    return response.data;
  },

  // Create character (simulated - API might not support this)
  create: async (character: Omit<Character, 'id'>) => {
    // Since the public API may not support POST, we'll simulate it
    // In a real scenario, this would be:
    // const response = await api.post<Character>('/characters', character);
    // For now, we'll return a mock response
    return { ...character, id: Date.now() };
  },

  // Update character (simulated)
  update: async (id: number, character: Partial<Character>) => {
    // const response = await api.put<Character>(`/characters/${id}`, character);
    return { ...character, id };
  },

  // Delete character (simulated)
  delete: async (id: number) => {
    // await api.delete(`/characters/${id}`);
    return { success: true };
  },
};

export const planetService = {
  // Get all planets with pagination
  getAll: async (page: number = 1, limit: number = 10) => {
    const response = await api.get<ApiResponse<Planet>>(`/planets?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Get planet by ID
  getById: async (id: number) => {
    const response = await api.get<Planet>(`/planets/${id}`);
    return response.data;
  },
};

export default api;
