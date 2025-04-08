// src/components/barber/BarberList.js
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import BarberCard from './BarberCard';
import Loading from '../UI/Loading';
import { colors } from '../../theme/colors';

export default function BarberList({
  barbers,
  onSelectBarber,
  isLoading,
  title = "Our Barbers",
  horizontal = true,
  showEmpty = true,
  compact = false,
}) {
  if (isLoading) {
    return <Loading text="Loading barbers..." />;
  }

  if (!barbers || barbers.length === 0) {
    if (!showEmpty) return null;
    
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No barbers available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      
      <FlatList
        data={barbers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <BarberCard
            barber={item}
            onSelect={() => onSelectBarber(item)}
            compact={compact}
          />
        )}
        horizontal={horizontal}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={horizontal ? styles.horizontalContent : styles.verticalContent}
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
    marginHorizontal: 16,
    color: colors.text,
  },
  horizontalContent: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  verticalContent: {
    padding: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    margin: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});