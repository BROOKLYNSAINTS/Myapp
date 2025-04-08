// src/components/payment/StripePaymentForm.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { CardField, useStripe, useConfirmPayment } from '@stripe/stripe-react-native';
import { colors } from '../../theme/colors';

export default function StripePaymentForm({
  amount,
  appointmentId,
  onPaymentSuccess,
  onPaymentError,
}) {
  const { createPaymentMethod } = useStripe();
  const { confirmPayment, loading } = useConfirmPayment();
  
  const [cardComplete, setCardComplete] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch payment intent from server
    const fetchPaymentIntent = async () => {
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount,
            appointmentId,
          }),
        });
        
        const { clientSecret } = await response.json();
        setClientSecret(clientSecret);
      } catch (err) {
        console.error('Error fetching payment intent:', err);
        setError('Unable to process payment. Please try again later.');
        if (onPaymentError) {
          onPaymentError(err);
        }
      }
    };

    fetchPaymentIntent();
  }, [amount, appointmentId]);

  const handlePayment = async () => {
    if (!clientSecret || !cardComplete) {
      return;
    }

    try {
      const { error, paymentIntent } = await confirmPayment(clientSecret, {
        type: 'Card',
      });

      if (error) {
        console.error('Payment confirmation error:', error);
        setError(error.message);
        if (onPaymentError) {
          onPaymentError(error);
        }
      } else if (paymentIntent) {
        if (onPaymentSuccess) {
          onPaymentSuccess(paymentIntent);
        }
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError('An unexpected error occurred. Please try again.');
      if (onPaymentError) {
        onPaymentError(err);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Credit or Debit Card</Text>
      
      <CardField
        postalCodeEnabled={true}
        placeholder={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={styles.cardStyle}
        style={styles.cardField}
        onCardChange={(cardDetails) => {
          setCardComplete(cardDetails.complete);
        }}
      />
      
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
      
      <TouchableOpacity
        style={[
          styles.payButton,
          (!cardComplete || loading) && styles.disabledButton
        ]}
        onPress={handlePayment}
        disabled={!cardComplete || loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.payButtonText}>Pay Now</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: colors.text,
  },
  cardField: {
    width: '100%',
    height: 50,
    marginVertical: 8,
  },
  cardStyle: {
    backgroundColor: '#FFFFFF',
    textColor: '#000000',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  errorText: {
    color: colors.error,
    marginTop: 8,
    fontSize: 14,
  },
  payButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  disabledButton: {
    opacity: 0.7,
    backgroundColor: colors.border,
  },
  payButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});