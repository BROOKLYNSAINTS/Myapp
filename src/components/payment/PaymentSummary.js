// src/components/payment/PaymentSummary.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from '../UI/Card';
import Divider from '../UI/Divider';
import { colors } from '../../theme/colors';
import { formatCurrency } from '../../utils/formatters';

export default function PaymentSummary({ 
  appointment, 
  showDiscount = false,
  showTax = false,
  discount = 0,
  taxRate = 0.08,  // 8% tax rate
}) {
  if (!appointment || !appointment.service) {
    return null;
  }

  const { service } = appointment;
  const servicePrice = service.price;
  const discountAmount = showDiscount ? (servicePrice * (discount / 100)) : 0;
  const subtotal = servicePrice - discountAmount;
  const taxAmount = showTax ? (subtotal * taxRate) : 0;
  const total = subtotal + taxAmount;

  return (
    <Card style={styles.container}>
      <Text style={styles.title}>Payment Summary</Text>
      
      <View style={styles.row}>
        <Text style={styles.label}>{service.name}</Text>
        <Text style={styles.value}>{formatCurrency(servicePrice)}</Text>
      </View>
      
      {showDiscount && discount > 0 && (
        <View style={styles.row}>
          <Text style={styles.label}>Discount ({discount}%)</Text>
          <Text style={styles.discountValue}>-{formatCurrency(discountAmount)}</Text>
        </View>
      )}
      
      {showTax && (
        <>
          <Divider style={styles.divider} />
          
          <View style={styles.row}>
            <Text style={styles.label}>Subtotal</Text>
            <Text style={styles.value}>{formatCurrency(subtotal)}</Text>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.label}>Tax ({(taxRate * 100).toFixed(0)}%)</Text>
            <Text style={styles.value}>{formatCurrency(taxAmount)}</Text>
          </View>
        </>
      )}
      
      <Divider style={styles.divider} />
      
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    paddingVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: colors.text,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    color: colors.text,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  discountValue: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.success,
  },
  divider: {
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
});