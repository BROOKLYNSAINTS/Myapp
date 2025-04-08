// src/hooks/useBarbers.js
import { useQuery } from '@tanstack/react-query';
import apiClient from '../api/client';
import { Barber } from '../models';

export const useBarbers = (shopId) => {
  // Get all barbers (optionally filtered by shop)
  const {
    data: barbers,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: shopId ? ['barbers', 'shop', shopId] : ['barbers'],
    queryFn: async () => {
      const endpoint = shopId ? `/api/shops/${shopId}/barbers` : '/api/barbers';
      const response = await apiClient.get(endpoint);
      return response.data.map(barber => new Barber(barber));
    },
    enabled: true, // Always enabled
  });

  // Get a specific barber by ID
  const getBarber = async (barberId) => {
    if (!barberId) return null;
    
    const response = await apiClient.get(`/api/barbers/${barberId}`);
    return new Barber(response.data);
  };

  // Get barber availability for a date
  const getBarberAvailability = async (barberId, date) => {
    if (!barberId || !date) return [];
    
    const response = await apiClient.get(`/api/barbers/${barberId}/availability/${date}`);
    return response.data;
  };

  return {
    barbers,
    isLoading,
    error,
    refetch,
    getBarber,
    getBarberAvailability,
  };
};