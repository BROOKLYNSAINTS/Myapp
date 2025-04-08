// src/models/barber.js
export default class Barber {
    constructor(data = {}) {
      this.id = data.id || 0;
      this.name = data.name || '';
      this.specialization = data.specialization || '';
      this.rating = data.rating || 5.0;
      this.reviewCount = data.reviewCount || 0;
      this.imageUrl = data.imageUrl || null;
      this.shopId = data.shopId || null;
      this.userId = data.userId || null;
    }
  }