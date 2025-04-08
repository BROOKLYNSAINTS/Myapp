// src/components/UI/Toast.js
import React from 'react';
import { Animated, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useToast } from '../../hooks/useToast';
import { colors } from '../../theme/colors';

export default function Toast() {
  const { toast, hideToast, fadeAnim } = useToast();
  
  if (!toast) return null;
  
  const getIconName = () => {
    switch (toast.type) {
      case 'success':
        return 'check-circle';
      case 'error':
        return 'alert-circle';
      case 'warning':
        return 'alert-triangle';
      default:
        return 'info';
    }
  };
  
  const getBackgroundColor = () => {
    switch (toast.type) {
      case 'success':
        return colors.success;
      case 'error':
        return colors.error;
      case 'warning':
        return '#F59E0B'; // Amber color
      default:
        return colors.primary;
    }
  };
  
  return (
    <Animated.View 
      style={[
        styles.container, 
        { 
          backgroundColor: getBackgroundColor(),
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-20, 0],
              }),
            },
          ],
        }
      ]}
    >
      <View style={styles.content}>
        <Feather name={getIconName()} size={20} color="white" />
        <Text style={styles.message}>{toast.message}</Text>
      </View>
      
      <TouchableOpacity onPress={hideToast}>
        <Feather name="x" size={20} color="white" />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 40,
    left: 16,
    right: 16,
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  message: {
    color: 'white',
    marginLeft: 8,
    fontSize: 14,
    flex: 1,
  },
});