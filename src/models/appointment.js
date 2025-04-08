// src/models/appointment.js
export default class Appointment {
    constructor(data = {}) {
      this.id = data.id || 0;
      this.userId = data.userId || 0;
      this.barberId = data.barberId || 0;
      this.serviceId = data.serviceId || 0;
      this.date = data.date || '';
      this.time = data.time || '';
      this.status = data.status || 'pending';
      this.paymentStatus = data.paymentStatus || 'unpaid';
      this.shopId = data.shopId || null;
      this.paymentMethod = data.paymentMethod || null;
      this.paymentId = data.paymentId || null;
      this.paymentAmount = data.paymentAmount || null;
      this.paymentCurrency = data.paymentCurrency || 'USD';
      this.paymentFee = data.paymentFee || null;
      this.createdAt = data.createdAt || new Date().toISOString();
      
      // These are populated relations (not stored in the database)
      this.barber = data.barber || null;
      this.service = data.service || null;
      this.user = data.user || null;
    }
  
    get isPending() {
      return this.status === 'pending';
    }
  
    get isConfirmed() {
      return this.status === 'confirmed';
    }
  
    get isCancelled() {
      return this.status === 'cancelled';
    }
  
    get isCompleted() {
      return this.status === 'completed';
    }
  
    get isPaid() {
      return this.paymentStatus === 'paid';
    }
  
    get formattedDateTime() {
      const dateObj = new Date(this.date);
      const dateString = dateObj.toLocaleDateString();
      return `${dateString} at ${this.time}`;
    }
  }