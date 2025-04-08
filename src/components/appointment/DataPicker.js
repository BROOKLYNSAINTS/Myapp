// src/components/appointment/DatePicker.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { getDayName, getMonthName, getDateOrdinal } from '../../utils/dateTime';

export default function DatePicker({
  onSelectDate,
  selectedDate,
  minDate = new Date(),
  maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // +30 days
  disabledDates = [],
}) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Generate dates for the next 2 weeks
  const generateDates = () => {
    const dates = [];
    const startDate = new Date();
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      if (date <= maxDate && date >= minDate) {
        dates.push(date);
      }
    }
    
    return dates;
  };
  
  const formatDateForAPI = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  const isDateDisabled = (date) => {
    return disabledDates.some(disabledDate => 
      new Date(disabledDate).toDateString() === date.toDateString()
    );
  };
  
  const isDateSelected = (date) => {
    if (!selectedDate) return false;
    
    const selected = new Date(selectedDate);
    return selected.toDateString() === date.toDateString();
  };
  
  const handleDateSelect = (date) => {
    if (isDateDisabled(date)) return;
    
    onSelectDate(formatDateForAPI(date));
  };
  
  const dates = generateDates();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Date</Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.datesContainer}
      >
        {dates.map((date, index) => {
          const disabled = isDateDisabled(date);
          const selected = isDateSelected(date);
          
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.dateItem,
                disabled && styles.disabledDate,
                selected && styles.selectedDate,
              ]}
              onPress={() => handleDateSelect(date)}
              disabled={disabled}
            >
              <Text style={[
                styles.dayName,
                selected && styles.selectedText,
                disabled && styles.disabledText,
              ]}>
                {getDayName(date).slice(0, 3)}
              </Text>
              
              <Text style={[
                styles.dateNumber,
                selected && styles.selectedText,
                disabled && styles.disabledText,
              ]}>
                {date.getDate()}
              </Text>
              
              <Text style={[
                styles.monthName,
                selected && styles.selectedText,
                disabled && styles.disabledText,
              ]}>
                {getMonthName(date).slice(0, 3)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
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
  datesContainer: {
    paddingVertical: 8,
  },
  dateItem: {
    width: 70,
    height: 90,
    backgroundColor: 'white',
    borderRadius: 8,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    padding: 8,
  },
  selectedDate: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  disabledDate: {
    backgroundColor: '#f5f5f5',
    borderColor: '#e0e0e0',
  },
  dayName: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  dateNumber: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  monthName: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  selectedText: {
    color: 'white',
  },
  disabledText: {
    color: '#aaa',
  },
});