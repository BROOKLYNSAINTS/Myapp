// src/components/appointment/TimeSelector.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';
import Loading from '../UI/Loading';

export default function TimeSelector({
  timeSlots,
  selectedTime,
  onSelectTime,
  isLoading,
}) {
  if (isLoading) {
    return <Loading text="Loading available times..." />;
  }

  if (!timeSlots || timeSlots.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No available time slots for this date</Text>
      </View>
    );
  }

  const renderTimeSlot = ({ item }) => {
    const isSelected = selectedTime === item.time;
    const isAvailable = item.available;

    return (
      <TouchableOpacity
        style={[
          styles.timeSlot,
          isSelected && styles.selectedTimeSlot,
          !isAvailable && styles.unavailableTimeSlot,
        ]}
        onPress={() => isAvailable && onSelectTime(item.time)}
        disabled={!isAvailable}
      >
        <Text
          style={[
            styles.timeText,
            isSelected && styles.selectedTimeText,
            !isAvailable && styles.unavailableTimeText,
          ]}
        >
          {formatTime(item.time)}
        </Text>
      </TouchableOpacity>
    );
  };

  const formatTime = (time) => {
    // Assuming time is in format "HH:MM"
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const amPm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${amPm}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Time</Text>
      
      <FlatList
        data={timeSlots}
        renderItem={renderTimeSlot}
        keyExtractor={(item, index) => `${item.time}-${index}`}
        numColumns={3}
        scrollEnabled={false}
        columnWrapperStyle={styles.row}
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
  row: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  timeSlot: {
    flex: 1,
    margin: 4,
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedTimeSlot: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  unavailableTimeSlot: {
    backgroundColor: '#f5f5f5',
    borderColor: '#e0e0e0',
  },
  timeText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  selectedTimeText: {
    color: 'white',
  },
  unavailableTimeText: {
    color: '#aaa',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});