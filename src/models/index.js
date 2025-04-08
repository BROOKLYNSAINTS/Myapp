// src/models/index.js
import Shop from './shop';
import User from './user';
import Barber from './barber';
import Service from './service';
import Appointment from './appointment';

// Payment method enum
export const PaymentMethod = {
  STRIPE: "stripe",
  PAYPAL: "paypal", 
  SQUARE: "square", 
  CASHAPP: "cashapp", 
  CASH: "cash"
};

// Appointment status enum
export const AppointmentStatus = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  CANCELLED: "cancelled",
  COMPLETED: "completed"
};

// Payment status enum
export const PaymentStatus = {
  UNPAID: "unpaid",
  PAID: "paid",
  FAILED: "failed",
  REFUNDED: "refunded"
};

export {
  Shop,
  User,
  Barber,
  Service,
  Appointment
};