// src/components/appointment/ServiceSelector.js
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ServiceCard from '../service/ServiceCard';
import Loading from '../UI/Loading';
import { colors } from '../../theme/colors';

export default function ServiceSelector({
  services,
  selectedServiceId,
  onSelectService,
  isLoading,
}) {
  if (isLoading) {
    return <Loading text="Loading services..." />;
  }

  if (!services || services.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No services available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Service</Text>
      
      <FlatList
        data={services}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ServiceCard
            service={item}
            isSelected={selectedServiceId === item.id}
            onSelect={() => onSelectService(item.id)}
          />
        )}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
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
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});