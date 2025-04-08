// src/components/service/ServiceDetail.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { formatCurrency } from '../../utils/formatters';
import Badge from '../UI/Badge';

export default function ServiceDetail({ 
  service,
  onBookNow,
  onBack,
}) {
  // Fallback image for services without images
  const serviceImage = service.imageUrl 
    ? { uri: service.imageUrl } 
    : require('../../assets/default-service-large.png');
  
  const formatDuration = (minutes) => {
    if (minutes < 60) {
      return `${minutes} minutes`;
    }
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (remainingMinutes === 0) {
      return hours === 1 ? `1 hour` : `${hours} hours`;
    }
    
    const hourText = hours === 1 ? 'hour' : 'hours';
    return `${hours} ${hourText} ${remainingMinutes} min`;
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
        <Text style={styles.headerTitle} numberOfLines={1}>
          Service Details
        </Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Image 
          source={serviceImage} 
          style={styles.image} 
          resizeMode="cover"
        />
        
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.name}>{service.name}</Text>
            
            {service.popular && (
              <Badge 
                label="Popular" 
                variant="secondary"
                style={styles.badge}
              />
            )}
          </View>
          
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Feather name="clock" size={18} color={colors.primary} />
              <Text style={styles.infoText}>
                {formatDuration(service.duration)}
              </Text>
            </View>
            
            <View style={styles.infoItem}>
              <Feather name="dollar-sign" size={18} color={colors.primary} />
              <Text style={styles.infoText}>
                {formatCurrency(service.price)}
              </Text>
            </View>
          </View>
          
          {service.description && (
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>Description</Text>
              <Text style={styles.description}>{service.description}</Text>
            </View>
          )}
        </View>
      </ScrollView>
      
      {onBookNow && (
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.bookButton}
            onPress={onBookNow}
          >
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 250,
  },
  contentContainer: {
    padding: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    flex: 1,
  },
  badge: {
    marginLeft: 8,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  infoText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 8,
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  footer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  bookButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});