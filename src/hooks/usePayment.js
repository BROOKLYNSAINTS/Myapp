// src/hooks/usePayment.js
import { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import apiClient from '../api/client';
import { useToast } from './useToast';

export const usePayment = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Create a Stripe payment intent
  const createStripePaymentIntent = async ({ amount, appointmentId }) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.post('/api/payments/stripe/create-intent', {
        amount,
        appointmentId,
      });
      
      return response.data.clientSecret;
    } catch (err) {
      console.error('Stripe payment intent error:', err);
      const errorMessage = err.response?.data?.message || 'Failed to create payment intent';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Create a PayPal order
  const createPayPalOrder = async ({ amount, appointmentId }) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.post('/api/payments/paypal/create-order', {
        amount,
        appointmentId,
      });
      
      return response.data;
    } catch (err) {
      console.error('PayPal order error:', err);
      const errorMessage = err.response?.data?.message || 'Failed to create PayPal order';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Capture a PayPal order
  const capturePayPalOrder = async ({ orderId, appointmentId }) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.post('/api/payments/paypal/capture-order', {
        orderId,
        appointmentId,
      });
      
      return response.data;
    } catch (err) {
      console.error('PayPal capture error:', err);
      const errorMessage = err.response?.data?.message || 'Failed to capture PayPal payment';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Generate a Cash App payment link
  const generateCashAppLink = async ({ amount, appointmentId, cashtag }) => {
    if (!cashtag) {
      setError('Cash App cashtag is required');
      return null;
    }
    
    // Format cashtag (remove $ if present)
    const formattedCashtag = cashtag.startsWith('$') ? cashtag.substring(1) : cashtag;
    return `https://cash.app/$${formattedCashtag}/${amount}`;
  };

  // Update payment status for an appointment
  const updatePaymentStatus = useMutation({
    mutationFn: async ({ appointmentId, paymentStatus, paymentMethod, paymentId }) => {
      const response = await apiClient.put(`/api/appointments/${appointmentId}/payment`, {
        paymentStatus,
        paymentMethod,
        paymentId
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['appointments']);
      showToast({
        type: 'success',
        message: 'Payment status updated successfully',
      });
    },
    onError: (err) => {
      showToast({
        type: 'error',
        message: err.message || 'Failed to update payment status',
      });
    }
  });

  return {
    loading,
    error,
    createStripePaymentIntent,
    createPayPalOrder,
    capturePayPalOrder,
    generateCashAppLink,
    updatePaymentStatus,
  };
};