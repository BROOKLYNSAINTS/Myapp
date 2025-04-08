// src/models/service.js
export default class Service {
    constructor(data = {}) {
      this.id = data.id || 0;
      this.name = data.name || '';
      this.description = data.description || '';
      this.duration = data.duration || 30;
      this.price = data.price || 0;
      this.imageUrl = data.imageUrl || null;
      this.popular = data.popular !== undefined ? data.popular : false;
      this.shopId = data.shopId || null;
    }
  
    get formattedPrice() {
      return `$${this.price.toFixed(2)}`;
    }
  
    get formattedDuration() {
      return `${this.duration} min`;
    }
  }