// src/hooks/useAuth.js
import { useState, useEffect, createContext, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../api/client';
import { User } from '../models';
import { StorageKeys } from '../utils/storage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for existing user on startup
  useEffect(() => {
    const loadUser = async () => {
      try {
        // Try to fetch the stored user
        const storedUser = await AsyncStorage.getItem(StorageKeys.USER);
        
        if (storedUser) {
          setUser(new User(JSON.parse(storedUser)));
        }
        
        // Validate with the server
        const response = await apiClient.get('/api/user');
        const userData = response.data;
        
        if (userData) {
          // Update with latest data from server
          const userObj = new User(userData);
          setUser(userObj);
          await AsyncStorage.setItem(StorageKeys.USER, JSON.stringify(userObj));
        } else if (storedUser) {
          // If server says no user but we had one stored, clear it
          await AsyncStorage.removeItem(StorageKeys.USER);
          setUser(null);
        }
      } catch (err) {
        console.error('Error loading user:', err);
        await AsyncStorage.removeItem(StorageKeys.USER);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.post('/api/login', { 
        username, 
        password 
      });
      
      const userData = response.data;
      const userObj = new User(userData);
      
      setUser(userObj);
      await AsyncStorage.setItem(StorageKeys.USER, JSON.stringify(userObj));
      
      return userObj;
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.post('/api/register', userData);
      
      const newUserData = response.data;
      const userObj = new User(newUserData);
      
      setUser(userObj);
      await AsyncStorage.setItem(StorageKeys.USER, JSON.stringify(userObj));
      
      return userObj;
    } catch (err) {
      console.error('Registration error:', err);
      const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    
    try {
      await apiClient.post('/api/logout');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      await AsyncStorage.removeItem(StorageKeys.USER);
      setUser(null);
      setLoading(false);
    }
  };

  const updateUserProfile = async (userId, updatedData) => {
    setLoading(true);
    
    try {
      const response = await apiClient.put(`/api/users/${userId}`, updatedData);
      
      const updatedUserData = response.data;
      const userObj = new User(updatedUserData);
      
      setUser(userObj);
      await AsyncStorage.setItem(StorageKeys.USER, JSON.stringify(userObj));
      
      return userObj;
    } catch (err) {
      console.error('Update profile error:', err);
      const errorMessage = err.response?.data?.message || 'Failed to update profile. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};