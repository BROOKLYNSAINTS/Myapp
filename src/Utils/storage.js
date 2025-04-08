// src/utils/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys enum to avoid typos and centralize keys
export const StorageKeys = {
  USER: '@barber:user',
  AUTH_TOKEN: '@barber:auth_token',
  SELECTED_SHOP: '@barber:selected_shop',
  ONBOARDING_COMPLETED: '@barber:onboarding_completed',
  THEME_PREFERENCE: '@barber:theme_preference',
  RECENT_SERVICES: '@barber:recent_services',
  FAVORITE_BARBERS: '@barber:favorite_barbers',
  LAST_SYNC: '@barber:last_sync',
  APP_SETTINGS: '@barber:app_settings',
};

/**
 * Store data in AsyncStorage
 * @param {string} key - Storage key
 * @param {any} value - Data to store (will be JSON stringified)
 * @return {Promise<void>}
 */
export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (error) {
    console.error('Error storing data:', error);
    return false;
  }
};

/**
 * Retrieve data from AsyncStorage
 * @param {string} key - Storage key
 * @return {Promise<any>} Retrieved data (JSON parsed)
 */
export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error getting data:', error);
    return null;
  }
};

/**
 * Remove data from AsyncStorage
 * @param {string} key - Storage key
 * @return {Promise<boolean>} Success status
 */
export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing data:', error);
    return false;
  }
};

/**
 * Clear all app data from AsyncStorage
 * @return {Promise<boolean>} Success status
 */
export const clearAllData = async () => {
  try {
    const keys = Object.values(StorageKeys);
    await AsyncStorage.multiRemove(keys);
    return true;
  } catch (error) {
    console.error('Error clearing all data:', error);
    return false;
  }
};

/**
 * Store authentication token
 * @param {string} token - JWT token
 * @return {Promise<boolean>} Success status
 */
export const storeAuthToken = async (token) => {
  return await storeData(StorageKeys.AUTH_TOKEN, token);
};

/**
 * Get stored authentication token
 * @return {Promise<string|null>} JWT token or null
 */
export const getAuthToken = async () => {
  return await getData(StorageKeys.AUTH_TOKEN);
};

/**
 * Store user object
 * @param {Object} user - User object
 * @return {Promise<boolean>} Success status
 */
export const storeUser = async (user) => {
  return await storeData(StorageKeys.USER, user);
};

/**
 * Get stored user object
 * @return {Promise<Object|null>} User object or null
 */
export const getUser = async () => {
  return await getData(StorageKeys.USER);
};

/**
 * Set onboarding completion status
 * @param {boolean} completed - Whether onboarding is completed
 * @return {Promise<boolean>} Success status
 */
export const setOnboardingCompleted = async (completed = true) => {
  return await storeData(StorageKeys.ONBOARDING_COMPLETED, completed);
};

/**
 * Check if onboarding is completed
 * @return {Promise<boolean>} Onboarding completion status
 */
export const isOnboardingCompleted = async () => {
  const completed = await getData(StorageKeys.ONBOARDING_COMPLETED);
  return completed === true;
};

/**
 * Store app settings
 * @param {Object} settings - Settings object
 * @return {Promise<boolean>} Success status
 */
export const storeAppSettings = async (settings) => {
  return await storeData(StorageKeys.APP_SETTINGS, settings);
};

/**
 * Get app settings
 * @return {Promise<Object>} Settings object
 */
export const getAppSettings = async () => {
  const settings = await getData(StorageKeys.APP_SETTINGS);
  return settings || {};
};