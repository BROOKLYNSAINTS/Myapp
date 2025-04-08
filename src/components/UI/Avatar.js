// src/components/UI/Avatar.js
import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export default function Avatar({ 
  source, 
  name, 
  size = 'medium', 
  style 
}) {
  const getInitials = (name) => {
    if (!name) return '?';
    
    const parts = name.trim().split(' ');
    if (parts.length > 1) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    
    return parts[0][0].toUpperCase();
  };
  
  const getSize = () => {
    switch (size) {
      case 'small':
        return 32;
      case 'medium':
        return 48;
      case 'large':
        return 64;
      case 'xlarge':
        return 96;
      default:
        return 48;
    }
  };
  
  const getFontSize = () => {
    switch (size) {
      case 'small':
        return 12;
      case 'medium':
        return 18;
      case 'large':
        return 24;
      case 'xlarge':
        return 36;
      default:
        return 18;
    }
  };
  
  const avatarSize = getSize();
  
  return (
    <View 
      style={[
        styles.container, 
        { 
          width: avatarSize, 
          height: avatarSize,
          borderRadius: avatarSize / 2,
        },
        style
      ]}
    >
      {source ? (
        <Image 
          source={{ uri: source }} 
          style={styles.image} 
          resizeMode="cover"
        />
      ) : (
        <Text style={[styles.initials, { fontSize: getFontSize() }]}>
          {getInitials(name)}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  initials: {
    color: 'white',
    fontWeight: 'bold',
  },
});