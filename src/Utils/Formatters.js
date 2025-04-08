// src/utils/formatters.js

/**
 * Format a number as currency (USD)
 * @param {number} amount - The amount to format
 * @return {string} Formatted currency string
 */
export function formatCurrency(amount) {
    if (amount === undefined || amount === null) return '';
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }
  
  /**
   * Format a phone number in US format (XXX) XXX-XXXX
   * @param {string} phone - The phone number to format
   * @return {string} Formatted phone number
   */
  export function formatPhone(phone) {
    if (!phone) return '';
    
    // Remove all non-digit characters
    const digits = phone.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX
    if (digits.length === 10) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    }
    
    // If not 10 digits, return original cleaned digits
    return digits;
  }
  
  /**
   * Format a name with proper capitalization
   * @param {string} name - The name to format
   * @return {string} Formatted name
   */
  export function formatName(name) {
    if (!name) return '';
    
    return name
      .split(' ')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(' ');
  }
  
  /**
   * Truncate text with ellipsis if it exceeds maxLength
   * @param {string} text - The text to truncate
   * @param {number} maxLength - Maximum length before truncation
   * @return {string} Truncated text
   */
  export function truncateText(text, maxLength = 100) {
    if (!text || text.length <= maxLength) return text;
    
    return text.slice(0, maxLength) + '...';
  }
  
  /**
   * Format a duration in minutes to a human-readable string
   * @param {number} minutes - Duration in minutes
   * @return {string} Formatted duration
   */
  export function formatDuration(minutes) {
    if (!minutes && minutes !== 0) return '';
    
    if (minutes < 60) {
      return `${minutes} min`;
    }
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (remainingMinutes === 0) {
      return hours === 1 ? '1 hour' : `${hours} hours`;
    }
    
    return `${hours}h ${remainingMinutes}m`;
  }
  
  /**
   * Format an email address to hide part of it for privacy
   * @param {string} email - The email to format
   * @return {string} Partially hidden email
   */
  export function formatEmailForPrivacy(email) {
    if (!email) return '';
    
    const [username, domain] = email.split('@');
    if (!username || !domain) return email;
    
    let hiddenUsername;
    if (username.length <= 3) {
      hiddenUsername = username[0] + '***';
    } else {
      hiddenUsername = username[0] + '***' + username.slice(-1);
    }
    
    return `${hiddenUsername}@${domain}`;
  }
  
  /**
   * Format rating as stars (e.g., "★★★★☆")
   * @param {number} rating - Rating from 0-5
   * @return {string} Star representation
   */
  export function formatRatingStars(rating) {
    if (rating === undefined || rating === null) return '';
    
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    return '★'.repeat(fullStars) + 
           (halfStar ? '⭑' : '') + 
           '☆'.repeat(emptyStars);
  }
  
  /**
   * Format status text with proper capitalization and spacing
   * @param {string} status - Status string (e.g., "pending_approval")
   * @return {string} Formatted status
   */
  export function formatStatus(status) {
    if (!status) return '';
    
    // Replace underscores and hyphens with spaces
    const spacedStatus = status.replace(/[_-]/g, ' ');
    
    // Capitalize first letter of each word
    return spacedStatus
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }