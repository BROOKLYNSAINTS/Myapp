// src/utils/dateTime.js

/**
 * Get the full day name for a date
 * @param {Date} date - The date object
 * @return {string} Day name (e.g., "Monday")
 */
export function getDayName(date) {
    const days = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 
      'Thursday', 'Friday', 'Saturday'
    ];
    return days[date.getDay()];
  }
  
  /**
   * Get the full month name for a date
   * @param {Date} date - The date object
   * @return {string} Month name (e.g., "January")
   */
  export function getMonthName(date) {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[date.getMonth()];
  }
  
  /**
   * Get the ordinal suffix for a day (st, nd, rd, th)
   * @param {number} day - The day of the month
   * @return {string} Day with ordinal suffix (e.g., "1st", "2nd")
   */
  export function getDateOrdinal(day) {
    if (day > 3 && day < 21) return `${day}th`;
    
    switch (day % 10) {
      case 1: return `${day}st`;
      case 2: return `${day}nd`;
      case 3: return `${day}rd`;
      default: return `${day}th`;
    }
  }
  
  /**
   * Format a date as YYYY-MM-DD
   * @param {Date} date - The date object
   * @return {string} Formatted date string
   */
  export function formatDateForAPI(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  /**
   * Parse a date string from API (YYYY-MM-DD) to a Date object
   * @param {string} dateStr - The date string in YYYY-MM-DD format
   * @return {Date} JavaScript Date object
   */
  export function parseAPIDate(dateStr) {
    const [year, month, day] = dateStr.split('-').map(num => parseInt(num, 10));
    return new Date(year, month - 1, day);
  }
  
  /**
   * Format time string from API (HH:MM) to 12-hour format with AM/PM
   * @param {string} timeStr - The time string in 24-hour format
   * @return {string} Formatted time string (e.g., "2:30 PM")
   */
  export function formatTime(timeStr) {
    if (!timeStr) return '';
    
    const [hours, minutes] = timeStr.split(':').map(num => parseInt(num, 10));
    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    return `${hours12}:${String(minutes).padStart(2, '0')} ${period}`;
  }
  
  /**
   * Format a date in a human-readable format
   * @param {string} dateStr - The date string in YYYY-MM-DD format
   * @return {string} Formatted date (e.g., "Monday, January 1st, 2023")
   */
  export function formatDateFull(dateStr) {
    if (!dateStr) return '';
    
    const date = parseAPIDate(dateStr);
    const day = getDateOrdinal(date.getDate());
    const month = getMonthName(date.getMonth());
    const dayName = getDayName(date);
    const year = date.getFullYear();
    
    return `${dayName}, ${month} ${day}, ${year}`;
  }
  
  /**
   * Format a date in a short format
   * @param {string} dateStr - The date string in YYYY-MM-DD format
   * @return {string} Formatted date (e.g., "Jan 1, 2023")
   */
  export function formatDateShort(dateStr) {
    if (!dateStr) return '';
    
    const date = parseAPIDate(dateStr);
    const month = getMonthName(date.getMonth()).substring(0, 3);
    const day = date.getDate();
    const year = date.getFullYear();
    
    return `${month} ${day}, ${year}`;
  }
  
  /**
   * Get a human-readable relative time (today, tomorrow, in X days)
   * @param {string} dateStr - The date string in YYYY-MM-DD format
   * @return {string} Relative time description
   */
  export function getRelativeTimeDescription(dateStr) {
    if (!dateStr) return '';
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const date = parseAPIDate(dateStr);
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays > 1 && diffDays < 7) return `In ${diffDays} days`;
    return formatDateShort(dateStr);
  }
  
  /**
   * Check if a date is in the past
   * @param {string} dateStr - The date string in YYYY-MM-DD format
   * @return {boolean} True if the date is in the past
   */
  export function isDateInPast(dateStr) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const date = parseAPIDate(dateStr);
    return date < today;
  }
  
  /**
   * Calculate the difference in days between two dates
   * @param {string} dateStr1 - First date string in YYYY-MM-DD format 
   * @param {string} dateStr2 - Second date string in YYYY-MM-DD format
   * @return {number} Difference in days
   */
  export function daysDifference(dateStr1, dateStr2) {
    const date1 = parseAPIDate(dateStr1);
    const date2 = parseAPIDate(dateStr2);
    
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  }