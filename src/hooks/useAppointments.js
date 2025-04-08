// src/hooks/useAppointments.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../api/client';
import { Appointment } from '../models';
import { useAuth } from './useAuth';

export const useAppointments = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const userId = user?.id;

  // Get all user appointments
  const {
    data: appointments,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['appointments', userId],
    queryFn: async () => {
      if (!userId) return [];
      const response = await apiClient.get(`/api/users/${userId}/appointments`);
      return response.data.map(appointment => new Appointment(appointment));
    },
    enabled: !!userId,
  });

  // Get upcoming appointments
  const {
    data: upcomingAppointments,
    isLoading: upcomingLoading,
  } = useQuery({
    queryKey: ['appointments', 'upcoming', userId],
    queryFn: async () => {
      if (!userId) return [];
      const response = await apiClient.get(`/api/appointments/upcoming`);
      return response.data.map(appointment => new Appointment(appointment));
    },
    enabled: !!userId,
  });

  // Get a specific appointment by ID
  const getAppointment = async (appointmentId) => {
    if (!appointmentId) return null;
    const response = await apiClient.get(`/api/appointments/${appointmentId}`);
    return new Appointment(response.data);
  };

  // Create appointment mutation
  const createAppointment = useMutation({
    mutationFn: async (appointmentData) => {
      const response = await apiClient.post('/api/appointments', appointmentData);
      return new Appointment(response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['appointments', userId]);
      queryClient.invalidateQueries(['appointments', 'upcoming', userId]);
    }
  });

  // Cancel appointment mutation
  const cancelAppointment = useMutation({
    mutationFn: async (appointmentId) => {
      const response = await apiClient.put(`/api/appointments/${appointmentId}`, {
        status: 'cancelled'
      });
      return new Appointment(response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['appointments', userId]);
      queryClient.invalidateQueries(['appointments', 'upcoming', userId]);
    }
  });

  // Update appointment payment status
  const updatePaymentStatus = useMutation({
    mutationFn: async ({ appointmentId, paymentStatus, paymentMethod, paymentId }) => {
      const response = await apiClient.put(`/api/appointments/${appointmentId}/payment`, {
        paymentStatus,
        paymentMethod,
        paymentId
      });
      return new Appointment(response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['appointments', userId]);
      queryClient.invalidateQueries(['appointments', 'upcoming', userId]);
    }
  });

  return {
    appointments,
    upcomingAppointments,
    isLoading: isLoading || upcomingLoading,
    error,
    refetch,
    getAppointment,
    createAppointment,
    cancelAppointment,
    updatePaymentStatus,
  };
};