// src/components/UI/Badge.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export default function Badge({ 
  label, 
  variant = 'primary', 
  size = 'medium',
  style 
}) {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'primary':
        return colors.primary;
      case 'secondary':
        return colors.secondary;
      case 'success':
        return colors.success;
      case 'error':
        return colors.error;
      case 'outline':
        return 'transparent';
      default:
        return colors.primary;
    }
  };
  
  const getTextColor = () => {
    if (variant === 'outline') {
      return colors.primary;
    }
    
    if (variant === 'secondary') {
      return colors.black;
    }
    
    return 'white';
  };
  
  const getBorderColor = () => {
    if (variant === 'outline') {
      return colors.primary;
    }
    
    return getBackgroundColor();
  };
  
  const getFontSize = () => {
    switch (size) {
      case 'small':
        return 10;
      case 'medium':
        return 12;
      case 'large':
        return 14;
      default:
        return 12;
    }
  };
  
  const getPadding = () => {
    switch (size) {
      case 'small':
        return { paddingVertical: 2, paddingHorizontal: 6 };
      case 'medium':
        return { paddingVertical: 4, paddingHorizontal: 8 };
      case 'large':
        return { paddingVertical: 6, paddingHorizontal: 12 };
      default:
        return { paddingVertical: 4, paddingHorizontal: 8 };
    }
  };
  
  return (
    <View
      style={[
        styles.badge,
        { 
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
        },
        getPadding(),
        style
      ]}
    >
      <Text 
        style={[
          styles.text, 
          { 
            color: getTextColor(),
            fontSize: getFontSize(),
          }
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 16,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '500',
    textAlign: 'center',
  },
});