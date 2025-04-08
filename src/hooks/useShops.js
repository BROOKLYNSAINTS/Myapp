// src/hooks/useShops.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../api/client';
import { Shop } from '../models';
import { StorageKeys } from '../utils/storage';

export const useShops = () => {
  const queryClient = useQueryClient();
  
  // Get all active shops
  const {
    data: shops,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['shops', 'active'],
    queryFn: async () => {
      const response = await apiClient.get('/api/shops/active');
      return response.data.map(shop => new Shop(shop));
    },
    enabled: true, // Always enabled
  });

  // Get a specific shop by ID
  const getShop = async (shopId) => {
    if (!shopId) return null;
    
    const response = await apiClient.get(`/api/shops/${shopId}`);
    return new Shop(response.data);
  };

  // Get/set selected shop for user
  const getSelectedShop = async () => {
    const shopJson = await AsyncStorage.getItem(StorageKeys.SELECTED_SHOP);
    if (!shopJson) return null;
    
    try {
      const shopData = JSON.parse(shopJson);
      return new Shop(shopData);
    } catch (err) {
      console.error('Error parsing selected shop:', err);
      return null;
    }
  };

  const setSelectedShop = async (shop) => {
    if (!shop) {
      await AsyncStorage.removeItem(StorageKeys.SELECTED_SHOP);
      return;
    }
    
    await AsyncStorage.setItem(StorageKeys.SELECTED_SHOP, JSON.stringify(shop));
  };

  // For shop owners/admins - create a new shop
  const createShop = useMutation({
    mutationFn: async (shopData) => {
      const response = await apiClient.post('/api/shops', shopData);
      return new Shop(response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['shops']);
      queryClient.invalidateQueries(['shops', 'active']);
    }
  });

  // For shop owners - update shop details
  const updateShop = useMutation({
    mutationFn: async ({ shopId, data }) => {
      const response = await apiClient.put(`/api/shops/${shopId}`, data);
      return new Shop(response.data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['shops']);
      queryClient.invalidateQueries(['shops', 'active']);
      queryClient.invalidateQueries(['shops', data.id]);
    }
  });

  return {
    shops,
    isLoading,
    error,
    refetch,
    getShop,
    getSelectedShop,
    setSelectedShop,
    createShop,
    updateShop,
  };
};