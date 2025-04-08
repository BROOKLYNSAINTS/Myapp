// src/components/service/ServiceList.js
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ServiceCard from './ServiceCard';
import Loading from '../UI/Loading';
import { colors } from '../../theme/colors';

export default function ServiceList({
  services,
  onSelectService,
  isLoading,
  title = "Our Services",
  horizontal = false,
  showEmpty = true,
  compact = false,
}) {
  if (isLoading) {
    return <Loading text="Loading services..." />;
  }

  if (!services || services.length === 0) {
    if (!showEmpty) return null;
    
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No services available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      
      <FlatList
        data={services}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ServiceCard
            service={item}
            onSelect={() => onSelectService(item)}
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
    paddingHorizontal: 16,
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