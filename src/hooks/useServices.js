// src/hooks/useServices.js
import { useQuery } from '@tanstack/react-query';
import apiClient from '../api/client';
import { Service } from '../models';

export const useServices = (shopId) => {
  // Get all services (optionally filtered by shop)
  const {
    data: services,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: shopId ? ['services', 'shop', shopId] : ['services'],
    queryFn: async () => {
      const endpoint = shopId ? `/api/shops/${shopId}/services` : '/api/services';
      const response = await apiClient.get(endpoint);
      return response.data.map(service => new Service(service));
    },
    enabled: true, // Always enabled
  });

  // Get popular services
  const {
    data: popularServices,
    isLoading: popularLoading,
  } = useQuery({
    queryKey: ['services', 'popular'],
    queryFn: async () => {
      const response = await apiClient.get('/api/services/popular');
      return response.data.map(service => new Service(service));
    },
    enabled: true, // Always enabled
  });

  // Get a specific service by ID
  const getService = async (serviceId) => {
    if (!serviceId) return null;
    
    const response = await apiClient.get(`/api/services/${serviceId}`);
    return new Service(response.data);
  };

  return {
    services,
    popularServices,
    isLoading: isLoading || popularLoading,
    error,
    refetch,
    getService,
  };
};