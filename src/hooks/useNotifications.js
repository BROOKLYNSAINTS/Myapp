// src/hooks/useNotifications.js
import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import apiClient from '../api/client';
import { useAuth } from './useAuth';

export const useNotifications = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [expoPushToken, setExpoPushToken] = useState('');
  const [permissionStatus, setPermissionStatus] = useState(null);
  
  // Register for push notifications
  useEffect(() => {
    if (!user) return;
    
    registerForPushNotifications();
  }, [user]);
  
  // Register for push notifications
  const registerForPushNotifications = async () => {
    if (!Constants.isDevice) {
      console.log('Must use physical device for push notifications');
      return;
    }
    
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      setPermissionStatus(finalStatus);
      
      if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notifications!');
        return;
      }
      
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      setExpoPushToken(token);
      
      // Update token on server
      if (user?.id) {
        await updateDeviceToken.mutateAsync({ 
          userId: user.id, 
          token, 
          deviceType: Platform.OS 
        });
      }
      
      // Set up notification handler
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }),
      });
    } catch (error) {
      console.error('Error registering for push notifications:', error);
    }
  };
  
  // Update device token on server
  const updateDeviceToken = useMutation({
    mutationFn: async ({ userId, token, deviceType }) => {
      const response = await apiClient.post('/api/users/device-token', {
        userId,
        token,
        deviceType
      });
      return response.data;
    }
  });
  
  // Get notification permissions
  const getNotificationPermissions = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    setPermissionStatus(status);
    return status;
  };
  
  // Request notification permissions
  const requestNotificationPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    setPermissionStatus(status);
    return status;
  };
  
  // Send a local notification
  const sendLocalNotification = async ({ title, body, data = {} }) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
      },
      trigger: null, // Show immediately
    });
  };
  
  return {
    expoPushToken,
    permissionStatus,
    getNotificationPermissions,
    requestNotificationPermissions,
    sendLocalNotification,
  };
};