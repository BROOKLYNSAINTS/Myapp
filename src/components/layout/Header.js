// src/components/layout/Header.js
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  StatusBar,
  Platform 
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';

export default function Header({ 
  title, 
  showBack = false,
  showMenu = false,
  onMenuPress,
  rightComponent,
  style,
  elevation = true,
}) {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={[
      styles.header, 
      !elevation && styles.noElevation,
      style
    ]}>
      <StatusBar 
        barStyle="dark-content"
        backgroundColor={'white'} 
      />
      
      <View style={styles.leftContainer}>
        {showBack && (
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={handleBackPress}
          >
            <Feather name="arrow-left" size={24} color={colors.text} />
          </TouchableOpacity>
        )}
        
        {showMenu && (
          <TouchableOpacity 
            style={styles.menuButton} 
            onPress={onMenuPress}
          >
            <Feather name="menu" size={24} color={colors.text} />
          </TouchableOpacity>
        )}
      </View>
      
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      
      <View style={styles.rightContainer}>
        {rightComponent}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: 'white',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
    zIndex: 10,
  },
  noElevation: {
    ...Platform.select({
      ios: {
        shadowOpacity: 0,
      },
      android: {
        elevation: 0,
      },
    }),
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 40,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  menuButton: {
    padding: 8,
    marginLeft: -8,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginHorizontal: 16,
  },
  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
  },
});