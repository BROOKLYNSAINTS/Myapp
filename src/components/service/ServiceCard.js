// src/components/service/ServiceCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Card from '../UI/Card';
import Badge from '../UI/Badge';
import { colors } from '../../theme/colors';
import { formatCurrency } from '../../utils/formatters';

export default function ServiceCard({ 
  service, 
  isSelected = false, 
  onSelect,
  showDetail = true,
  compact = false,
}) {
  // Fallback image for services without images
  const serviceImage = service.imageUrl 
    ? { uri: service.imageUrl } 
    : require('../../assets/default-service.png');
  
  const formatDuration = (minutes) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (remainingMinutes === 0) {
      return `${hours} hr`;
    }
    
    return `${hours} hr ${remainingMinutes} min`;
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
        <View style={styles.cardContent}>
          {!compact && (
            <View style={styles.imageContainer}>
              <Image 
                source={serviceImage} 
                style={styles.image} 
                resizeMode="cover"
              />
            </View>
          )}
          
          <View style={styles.infoContainer}>
            <View style={styles.titleRow}>
              <Text style={styles.name} numberOfLines={1}>
                {service.name}
              </Text>
              
              {service.popular && (
                <Badge 
                  label="Popular" 
                  variant="secondary"
                  size="small"
                  style={styles.badge}
                />
              )}
            </View>
            
            {showDetail && service.description && !compact && (
              <Text style={styles.description} numberOfLines={2}>
                {service.description}
              </Text>
            )}
            
            <View style={styles.detailsRow}>
              <Text style={styles.price}>
                {formatCurrency(service.price)}
              </Text>
              
              {service.duration && (
                <View style={styles.durationContainer}>
                  <Feather name="clock" size={14} color={colors.textSecondary} />
                  <Text style={styles.duration}>
                    {formatDuration(service.duration)}
                  </Text>
                </View>
              )}
            </View>
          </View>
          
          {isSelected && (
            <View style={styles.checkmarkContainer}>
              <Feather name="check-circle" size={24} color={colors.primary} />
            </View>
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  compactCard: {
    width: 200,
    margin: 8,
  },
  selectedCard: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    marginRight: 12,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  badge: {
    marginLeft: 8,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  duration: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  checkmarkContainer: {
    marginLeft: 8,
  },
});