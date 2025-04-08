// src/components/barber/BarberCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Card from '../UI/Card';
import { colors } from '../../theme/colors';

export default function BarberCard({ 
  barber, 
  isSelected = false, 
  onSelect,
  showRating = true,
  compact = false,
}) {
  // Fallback image for barbers without profile pictures
  const profileImage = barber.imageUrl 
    ? { uri: barber.imageUrl } 
    : require('../../assets/default-avatar.png');

  const renderRating = () => {
    if (!showRating || !barber.rating) return null;
    
    const stars = [];
    const rating = Math.round(barber.rating * 2) / 2; // Round to nearest 0.5
    
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <Feather key={i} name="star" size={16} color={colors.secondary} />
        );
      } else if (i - 0.5 === rating) {
        stars.push(
          <Feather key={i} name="star" size={16} color={colors.secondary} />
        );
      } else {
        stars.push(
          <Feather key={i} name="star" size={16} color={colors.border} />
        );
      }
    }
    
    return (
      <View style={styles.ratingContainer}>
        <View style={styles.starsContainer}>{stars}</View>
        {barber.reviewCount ? (
          <Text style={styles.reviewCount}>({barber.reviewCount})</Text>
        ) : null}
      </View>
    );
  };

  return (
    <TouchableOpacity
      onPress={onSelect}
      activeOpacity={0.7}
    >
      <Card style={[
        styles.card,
        isSelected && styles.selectedCard,
        compact && styles.compactCard,
      ]}>
        <View style={styles.imageContainer}>
          <Image 
            source={profileImage} 
            style={styles.image} 
            resizeMode="cover"
          />
          {isSelected && (
            <View style={styles.checkmarkContainer}>
              <Feather name="check-circle" size={24} color={colors.primary} />
            </View>
          )}
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{barber.name}</Text>
          
          {barber.specialization && !compact && (
            <Text style={styles.specialization}>{barber.specialization}</Text>
          )}
          
          {renderRating()}
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 12,
    marginBottom: 12,
    marginRight: 8,
    width: 280,
  },
  compactCard: {
    width: 200,
    padding: 8,
  },
  selectedCard: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  imageContainer: {
    position: 'relative',
    marginRight: 12,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  checkmarkContainer: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 2,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  specialization: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
  },
  reviewCount: {
    marginLeft: 4,
    fontSize: 12,
    color: colors.textSecondary,
  },
});