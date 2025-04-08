// src/components/UI/Card.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export default function Card({ children, style, elevation = 2 }) {
  return (
    <View 
      style={[
        styles.card, 
        { elevation }, 
        style
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});