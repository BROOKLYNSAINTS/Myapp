// src/models/user.js
export default class User {
    constructor(data = {}) {
      this.id = data.id || 0;
      this.username = data.username || '';
      this.firstName = data.firstName || '';
      this.lastName = data.lastName || '';
      this.email = data.email || '';
      this.phone = data.phone || '';
      this.enableNotifications = data.enableNotifications !== undefined ? data.enableNotifications : true;
      this.role = data.role || 'customer';
      this.shopId = data.shopId || null;
      this.barberId = data.barberId || null;
      this.changeBarber = data.changeBarber || false;
    }
  
    get fullName() {
      return `${this.firstName} ${this.lastName}`.trim();
    }
  }