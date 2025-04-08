// src/utils/constants.js

// App Configuration
export const APP_CONFIG = {
    VERSION: '1.0.0',
    BUILD_NUMBER: '1',
    APP_NAME: 'Back Home Barber',
    SUPPORT_EMAIL: 'support@backhomebarber.com',
    TERMS_URL: 'https://backhomebarber.com/terms',
    PRIVACY_URL: 'https://backhomebarber.com/privacy',
    HELP_CENTER_URL: 'https://backhomebarber.com/help',
  };
  
  // API Configuration
  export const API_CONFIG = {
    BASE_URL: 'https://api.backhomebarber.com',
    TIMEOUT: 15000, // 15 seconds
    VERSION: 'v1',
  };
  
  // User Roles
  export const USER_ROLES = {
    CUSTOMER: 'customer',
    BARBER: 'barber',
    ADMIN: 'admin',
    SHOP_OWNER: 'shop_owner',
    DEVELOPER: 'developer',
  };
  
  // Appointment Status
  export const APPOINTMENT_STATUS = {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    NO_SHOW: 'no_show',
  };
  
  // Payment Status
  export const PAYMENT_STATUS = {
    PENDING: 'pending',
    PAID: 'paid',
    FAILED: 'failed',
    REFUNDED: 'refunded',
  };
  
  // Payment Methods
  export const PAYMENT_METHODS = {
    STRIPE: 'stripe',
    PAYPAL: 'paypal',
    CASHAPP: 'cashapp',
    CASH: 'cash',
  };
  
  // Error Messages
  export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Network error. Please check your connection and try again.',
    SERVER_ERROR: 'Something went wrong on our end. Please try again later.',
    AUTH_ERROR: 'Authentication error. Please log in again.',
    TIMEOUT_ERROR: 'Request timed out. Please try again.',
    VALIDATION_ERROR: 'Please check your information and try again.',
  };
  
  // Notification Types
  export const NOTIFICATION_TYPES = {
    APPOINTMENT_REMINDER: 'appointment_reminder',
    APPOINTMENT_CONFIRMATION: 'appointment_confirmation',
    APPOINTMENT_CANCELLED: 'appointment_cancelled',
    PAYMENT_RECEIVED: 'payment_received',
    PAYMENT_FAILED: 'payment_failed',
    SYSTEM_NOTIFICATION: 'system_notification',
  };
  
  // Theme Colors (re-exported for convenience)
  export const COLORS = {
    PRIMARY: '#008000', // Jamaican Green
    SECONDARY: '#FFD700', // Jamaican Gold
    ACCENT: '#333333', // Jamaican Black
    SUCCESS: '#00C853',
    ERROR: '#D32F2F',
    WARNING: '#FFA000',
    INFO: '#2196F3',
    BACKGROUND: '#FFFFFF',
    SURFACE: '#F5F5F5',
    TEXT: '#212121',
    TEXT_SECONDARY: '#757575',
    BORDER: '#DDDDDD',
  };
  
  // Default App Settings
  export const DEFAULT_SETTINGS = {
    notificationsEnabled: true,
    emailNotifications: true,
    smsNotifications: true,
    darkMode: false,
    language: 'en',
    autoLogin: true,
  };
  
  // RegEx Patterns
  export const REGEX_PATTERNS = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE_US: /^\(\d{3}\) \d{3}-\d{4}$/,
    ZIPCODE_US: /^\d{5}(-\d{4})?$/,
    URL: /^(http|https):\/\/[^ "]+$/,
    CASHTAG: /^\$?[a-zA-Z][a-zA-Z0-9]{1,20}$/,
  };
  
  // Time Slots Configuration
  export const TIME_SLOTS_CONFIG = {
    START_HOUR: 9, // 9 AM
    END_HOUR: 18, // 6 PM
    INTERVAL_MINUTES: 30, // 30-minute intervals
  };