import axios from 'axios';
import type { Character, Planet, ApiResponse } from '../types';

const API_BASE_URL = 'https://dragonball-api.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const characterService = {
  // Get all characters with pagination and filtering
  getAll: async (page: number = 1, limit: number = 10, filters: Record<string, string | number> = {}) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    let hasFilters = false;
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
        hasFilters = true;
      }
    });

    const response = await api.get<ApiResponse<Character> | Character[]>(`/characters?${params.toString()}`);
    
    if (Array.isArray(response.data)) {
      return {
        items: response.data,
        meta: {
          totalItems: response.data.length,
          itemCount: response.data.length,
          itemsPerPage: limit,
          totalPages: 1,
          currentPage: 1,
        },
        links: {}
      };
    }
    
    return response.data as ApiResponse<Character>;
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
  delete: async (_id: number) => {
    // await api.delete(`/characters/${id}`);
    console.log(`Character with ID ${_id} deleted (simulated).`);
    return { success: true };
  },
};

export const planetService = {
  // Get all planets with pagination and filtering
  getAll: async (page: number = 1, limit: number = 10, filters: Record<string, string | number | boolean> = {}) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });

    const response = await api.get<ApiResponse<Planet> | Planet[]>(`/planets?${params.toString()}`);

    if (Array.isArray(response.data)) {
      return {
        items: response.data,
        meta: {
          totalItems: response.data.length,
          itemCount: response.data.length,
          itemsPerPage: limit,
          totalPages: 1,
          currentPage: 1,
        },
        links: {}
      };
    }

    return response.data as ApiResponse<Planet>;
  },

  // Get planet by ID
  getById: async (id: number) => {
    const response = await api.get<Planet>(`/planets/${id}`);
    return response.data;
  },
};

export default api;
