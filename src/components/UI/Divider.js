// src/components/UI/Divider.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export default function Divider({ style, color = colors.border }) {
  return (
    <View 
      style={[
        styles.divider, 
        { backgroundColor: color },
        style
      ]} 
    />
  );
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    width: '100%',
    marginVertical: 16,
  },
});