// src/components/layout/Section.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export default function Section({ 
  title, 
  children,
  onSeeAll,
  seeAllText = 'See All',
  style,
  titleStyle,
}) {
  return (
    <View style={[styles.section, style]}>
      <View style={styles.header}>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
        
        {onSeeAll && (
          <TouchableOpacity 
            style={styles.seeAllButton}
            onPress={onSeeAll}
          >
            <Text style={styles.seeAllText}>{seeAllText}</Text>
            <Feather 
              name="chevron-right" 
              size={16} 
              color={colors.primary} 
              style={styles.seeAllIcon}
            />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  seeAllIcon: {
    marginLeft: 2,
  },
  content: {
    // No padding here to allow children to handle their own padding
  },
});