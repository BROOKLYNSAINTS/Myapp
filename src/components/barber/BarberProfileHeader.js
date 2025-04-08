// src/components/barber/BarberProfileHeader.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export default function BarberProfileHeader({ 
  barber,
  onBack,
  onBookAppointment,
}) {
  // Fallback image for barbers without profile pictures
  const profileImage = barber.imageUrl 
    ? { uri: barber.imageUrl } 
    : require('../../assets/default-avatar.png');

  const renderRating = () => {
    if (!barber.rating) return null;
    
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
          <Text style={styles.reviewCount}>({barber.reviewCount} reviews)</Text>
        ) : null}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {onBack && (
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={onBack}
          >
            <Feather name="arrow-left" size={24} color={colors.text} />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.profileContainer}>
        <Image 
          source={profileImage} 
          style={styles.image} 
          resizeMode="cover"
        />
        
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{barber.name}</Text>
          
          {barber.specialization && (
            <Text style={styles.specialization}>{barber.specialization}</Text>
          )}
          
          {renderRating()}
          
          {onBookAppointment && (
            <TouchableOpacity 
              style={styles.bookButton}
              onPress={onBookAppointment}
            >
              <Text style={styles.bookButtonText}>Book Appointment</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    padding: 4,
  },
  profileContainer: {
    flexDirection: 'row',
    padding: 16,
    paddingTop: 0,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 16,
  },
  infoContainer: {
    flex: '1',
    justifyContent: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  specialization: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  reviewCount: {
    marginLeft: 4,
    fontSize: 14,
    color: colors.textSecondary,
  },
  bookButton: {
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});