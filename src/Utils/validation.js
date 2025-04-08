// src/utils/validation.js

/**
 * Validate email address format
 * @param {string} email - Email to validate
 * @return {boolean} Validation result
 */
export function isValidEmail(email) {
    if (!email) return false;
    
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  /**
   * Validate phone number format (US)
   * @param {string} phone - Phone number to validate
   * @return {boolean} Validation result
   */
  export function isValidPhone(phone) {
    if (!phone) return false;
    
    // Strip all non-digits and check length
    const digits = phone.replace(/\D/g, '');
    return digits.length === 10;
  }
  
  /**
   * Validate password strength
   * @param {string} password - Password to validate
   * @return {Object} Validation result with details
   */
  export function validatePassword(password) {
    if (!password) {
      return { 
        valid: false, 
        message: 'Password is required',
        strength: 0
      };
    }
    
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    let strength = 0;
    let message = '';
    
    if (password.length >= minLength) strength += 1;
    if (hasUppercase) strength += 1;
    if (hasLowercase) strength += 1;
    if (hasNumbers) strength += 1;
    if (hasSpecialChars) strength += 1;
    
    if (password.length < minLength) {
      message = `Password must be at least ${minLength} characters long`;
    } else if (strength < 3) {
      message = 'Make your password stronger by adding uppercase letters, numbers, or special characters';
    } else {
      message = 'Password is acceptable';
    }
    
    return {
      valid: password.length >= minLength && strength >= 3,
      message,
      strength: Math.min(Math.floor((strength / 5) * 100), 100),
      checks: {
        length: password.length >= minLength,
        hasUppercase,
        hasLowercase,
        hasNumbers,
        hasSpecialChars
      }
    };
  }
  
  /**
   * Validate a username format
   * @param {string} username - Username to validate
   * @return {boolean} Validation result
   */
  export function isValidUsername(username) {
    if (!username) return false;
    
    // Alphanumeric, underscore, hyphen, 3-20 chars
    const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
    return usernameRegex.test(username);
  }
  
  /**
   * Check if a string is empty or only whitespace
   * @param {string} value - String to check
   * @return {boolean} True if empty or whitespace
   */
  export function isEmpty(value) {
    return value === undefined || 
           value === null || 
           (typeof value === 'string' && value.trim() === '');
  }
  
  /**
   * Validate a date string (YYYY-MM-DD)
   * @param {string} dateStr - Date string to validate
   * @return {boolean} Validation result
   */
  export function isValidDate(dateStr) {
    if (!dateStr) return false;
    
    // Check format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;
    
    // Parse date parts and check if valid
    const [year, month, day] = dateStr.split('-').map(part => parseInt(part, 10));
    const date = new Date(year, month - 1, day);
    
    return date.getFullYear() === year && 
           date.getMonth() === month - 1 && 
           date.getDate() === day;
  }
  
  /**
   * Check if input is a valid number
   * @param {any} value - Value to check
   * @return {boolean} True if value is a number
   */
  export function isNumber(value) {
    if (value === null || value === undefined || value === '') return false;
    return !isNaN(Number(value));
  }
  
  /**
   * Check if a date is in the future
   * @param {string} dateStr - Date string (YYYY-MM-DD)
   * @return {boolean} True if date is in the future
   */
  export function isFutureDate(dateStr) {
    if (!isValidDate(dateStr)) return false;
    
    const [year, month, day] = dateStr.split('-').map(part => parseInt(part, 10));
    const date = new Date(year, month - 1, day);
    date.setHours(0, 0, 0, 0);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return date > today;
  }
  
  /**
   * Check if a date is in the past
   * @param {string} dateStr - Date string (YYYY-MM-DD)
   * @return {boolean} True if date is in the past
   */
  export function isPastDate(dateStr) {
    if (!isValidDate(dateStr)) return false;
    
    const [year, month, day] = dateStr.split('-').map(part => parseInt(part, 10));
    const date = new Date(year, month - 1, day);
    date.setHours(0, 0, 0, 0);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return date < today;
  }