// src/components/payment/PayPalButton.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { colors } from '../../theme/colors';

export default function PayPalButton({
  amount,
  appointmentId,
  onPaymentSuccess,
  onPaymentError,
  onCancel,
}) {
  const [loading, setLoading] = useState(false);
  const [paypalUrl, setPaypalUrl] = useState(null);
  const [error, setError] = useState(null);

  const initiatePayPalPayment = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/create-paypal-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          appointmentId,
        }),
      });
      
      const data = await response.json();
      
      if (data.approvalUrl) {
        setPaypalUrl(data.approvalUrl);
      } else {
        setError('Failed to initiate PayPal payment. Please try again.');
        if (onPaymentError) {
          onPaymentError(new Error('Failed to get PayPal approval URL'));
        }
      }
    } catch (err) {
      console.error('PayPal error:', err);
      setError('Unable to connect to PayPal. Please try again later.');
      if (onPaymentError) {
        onPaymentError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleWebViewNavigationStateChange = (navState) => {
    const { url } = navState;
    
    // Detect successful payment return URL
    if (url.includes('/payment-success')) {
      // Extract order ID from URL if needed
      const params = new URLSearchParams(url.split('?')[1]);
      const orderId = params.get('orderId');
      
      setPaypalUrl(null); // Close WebView
      
      if (onPaymentSuccess) {
        onPaymentSuccess({
          id: orderId,
          provider: 'paypal',
        });
      }
    }
    
    // Detect cancelled payment
    if (url.includes('/payment-cancel')) {
      setPaypalUrl(null); // Close WebView
      
      if (onCancel) {
        onCancel();
      }
    }
  };

  if (paypalUrl) {
    return (
      <View style={styles.webViewContainer}>
        <WebView
          source={{ uri: paypalUrl }}
          onNavigationStateChange={handleWebViewNavigationStateChange}
          startInLoadingState={true}
          renderLoading={() => (
            <View style={styles.webViewLoader}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          )}
        />
        
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => {
            setPaypalUrl(null);
            if (onCancel) {
              onCancel();
            }
          }}
        >
          <Text style={styles.closeButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PayPal</Text>
      
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
      
      <TouchableOpacity
        style={[
          styles.paypalButton,
          loading && styles.disabledButton
        ]}
        onPress={initiatePayPalPayment}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.paypalButtonText}>Pay with PayPal</Text>
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
  errorText: {
    color: colors.error,
    marginTop: 8,
    marginBottom: 8,
    fontSize: 14,
  },
  paypalButton: {
    backgroundColor: '#0070BA', // PayPal blue
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    opacity: 0.7,
  },
  paypalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  webViewContainer: {
    flex: 1,
    height: 400, // Fixed height or adjust based on your needs
    position: 'relative',
    marginVertical: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    overflow: 'hidden',
  },
  webViewLoader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  closeButton: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 8,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});