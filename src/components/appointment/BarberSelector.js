// src/components/appointment/BarberSelector.js
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import BarberCard from '../barber/BarberCard';
import { colors } from '../../theme/colors';

export default function BarberSelector({ barbers, selectedBarber, onSelectBarber }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Barber</Text>
      <FlatList
        data={barbers}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <BarberCard
              barber={item}
              isSelected={selectedBarber?.id === item.id}
              onSelect={() => onSelectBarber(item)}
            />
          </View>
        )}
      />
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
    marginBottom: 12,
    color: colors.text,
  },
  cardContainer: {
    width: 160,
    marginRight: 12,
  },
});