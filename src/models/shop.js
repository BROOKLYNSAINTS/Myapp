// src/models/shop.js
export default class Shop {
    constructor(data = {}) {
      this.id = data.id || 0;
      this.name = data.name || '';
      this.address = data.address || '';
      this.city = data.city || '';
      this.state = data.state || '';
      this.zipCode = data.zipCode || '';
      this.phone = data.phone || '';
      this.email = data.email || '';
      this.website = data.website || '';
      this.logoUrl = data.logoUrl || '';
      this.acceptedPaymentMethods = data.acceptedPaymentMethods || [];
      this.active = data.active !== undefined ? data.active : true;
    }
  }