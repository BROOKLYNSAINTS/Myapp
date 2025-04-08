// src/components/payment/CashAppButton.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Share, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { formatCurrency } from '../../utils/formatters';

export default function CashAppButton({
  amount,
  cashtag,
  appointmentId,
  onPaymentSuccess,
  onPaymentError,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateCashAppLink = () => {
    // Format the cashtag (remove $ if present)
    const formattedCashtag = cashtag.startsWith('$') ? cashtag.substring(1) : cashtag;
    // Generate CashApp link with amount and cashtag
    return `https://cash.app/$${formattedCashtag}/${amount}`;
  };

  const handlePayWithCashApp = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const cashAppUrl = generateCashAppLink();
      
      // Check if CashApp app can be opened
      const canOpen = await Linking.canOpenURL(cashAppUrl);
      
      if (canOpen) {
        await Linking.openURL(cashAppUrl);
        
        // After user returns from CashApp, show confirmation alert
        Alert.alert(
          'Payment Confirmation',
          'Did you complete the payment in Cash App?',
          [
            {
              text: 'No, Cancel',
              style: 'cancel',
              onPress: () => {
                setError('Payment was not completed.');
              },
            },
            {
              text: 'Yes, Completed',
              onPress: () => handlePaymentConfirmation(),
            },
          ],
          { cancelable: false }
        );
      } else {
        // If CashApp isn't installed, offer to share the payment link
        sharePaymentLink();
      }
    } catch (err) {
      console.error('CashApp error:', err);
      setError('Unable to open Cash App. You may need to install it first.');
      if (onPaymentError) {
        onPaymentError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  const sharePaymentLink = async () => {
    try {
      const cashAppUrl = generateCashAppLink();
      
      await Share.share({
        message: `Please send ${formatCurrency(amount)} to ${cashtag} on Cash App: ${cashAppUrl}`,
        url: cashAppUrl,
      });
    } catch (err) {
      console.error('Share error:', err);
      setError('Failed to share payment link.');
    }
  };

  const handlePaymentConfirmation = async () => {
    try {
      // Send payment confirmation to server
      const response = await fetch(`/api/appointments/${appointmentId}/payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethod: 'cashapp',
          paymentStatus: 'paid',
          amount,
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        if (onPaymentSuccess) {
          onPaymentSuccess({
            id: `cashapp-${Date.now()}`,
            provider: 'cashapp',
          });
        }
      } else {
        setError('Failed to confirm payment. Please contact support.');
        if (onPaymentError) {
          onPaymentError(new Error('Payment confirmation failed'));
        }
      }
    } catch (err) {
      console.error('Payment confirmation error:', err);
      setError('Failed to confirm payment. Please try again.');
      if (onPaymentError) {
        onPaymentError(err);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cash App</Text>
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Send <Text style={styles.amountText}>{formatCurrency(amount)}</Text> to{' '}
          <Text style={styles.cashtagText}>{cashtag}</Text>
        </Text>
      </View>
      
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
      
      <TouchableOpacity
        style={[
          styles.cashAppButton,
          loading && styles.disabledButton
        ]}
        onPress={handlePayWithCashApp}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <>
            <Feather name="external-link" size={18} color="white" style={styles.buttonIcon} />
            <Text style={styles.cashAppButtonText}>Pay with Cash App</Text>
          </>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.shareButton}
        onPress={sharePaymentLink}
      >
        <Feather name="share-2" size={18} color={colors.primary} style={styles.buttonIcon} />
        <Text style={styles.shareButtonText}>Share Payment Link</Text>
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
  infoContainer: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  infoText: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
  },
  amountText: {
    fontWeight: 'bold',
    color: colors.text,
  },
  cashtagText: {
    fontWeight: 'bold',
    color: '#00D632', // Cash App green
  },
  errorText: {
    color: colors.error,
    marginTop: 8,
    marginBottom: 8,
    fontSize: 14,
  },
  cashAppButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00D632', // Cash App green
    paddingVertical: 12,
    borderRadius: 8,
  },
  disabledButton: {
    opacity: 0.7,
  },
  buttonIcon: {
    marginRight: 8,
  },
  cashAppButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  shareButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});