// src/components/appointment/AppointmentCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Card from '../UI/Card';
import Badge from '../UI/Badge';
import { colors } from '../../theme/colors';
import { formatDate, formatTime, formatCurrency } from '../../utils/formatters';

export default function AppointmentCard({ 
  appointment, 
  onPress, 
  showActions = true,
  onCancel,
}) {
  const getStatusBadge = () => {
    switch (appointment.status) {
      case 'confirmed':
        return <Badge label="Confirmed" variant="success" />;
      case 'pending':
        return <Badge label="Pending" variant="secondary" />;
      case 'cancelled':
        return <Badge label="Cancelled" variant="error" />;
      case 'completed':
        return <Badge label="Completed" variant="primary" />;
      default:
        return null;
    }
  };

  const getPaymentStatusBadge = () => {
    switch (appointment.paymentStatus) {
      case 'paid':
        return <Badge label="Paid" variant="success" size="small" />;
      case 'pending':
        return <Badge label="Payment Pending" variant="secondary" size="small" />;
      case 'failed':
        return <Badge label="Payment Failed" variant="error" size="small" />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <TouchableOpacity 
        onPress={onPress}
        style={styles.container}
        activeOpacity={0.7}
      >
        <View style={styles.header}>
          <Text style={styles.dateTime}>
            {formatDate(appointment.date)} at {formatTime(appointment.time)}
          </Text>
          {getStatusBadge()}
        </View>

        {appointment.service && (
          <View style={styles.serviceContainer}>
            <Text style={styles.serviceName}>{appointment.service.name}</Text>
            <Text style={styles.servicePrice}>
              {formatCurrency(appointment.service.price)}
            </Text>
          </View>
        )}

        {appointment.barber && (
          <View style={styles.barberContainer}>
            <Feather name="user" size={16} color={colors.textSecondary} />
            <Text style={styles.barberName}>{appointment.barber.name}</Text>
          </View>
        )}

        <View style={styles.footer}>
          {getPaymentStatusBadge()}
          
          {showActions && appointment.status !== 'cancelled' && appointment.status !== 'completed' && (
            <TouchableOpacity 
              onPress={onCancel}
              style={styles.cancelButton}
            >
              <Feather name="x-circle" size={16} color={colors.error} />
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateTime: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  serviceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  barberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  barberName: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancelText: {
    color: colors.error,
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
});