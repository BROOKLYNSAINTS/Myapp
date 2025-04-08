// src/components/layout/Container.js
import React from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  StatusBar,
  RefreshControl
} from 'react-native';
import { colors } from '../../theme/colors';

export default function Container({ 
  children, 
  style,
  scrollable = true,
  refreshing = false,
  onRefresh,
  insetsBottom = true,
  insetsTop = true,
  keyboardAvoiding = true,
  backgroundColor = colors.background,
}) {
  const content = (
    <View style={[styles.container, { backgroundColor }, style]}>
      {scrollable ? (
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          refreshControl={
            onRefresh ? (
              <RefreshControl 
                refreshing={refreshing} 
                onRefresh={onRefresh}
                colors={[colors.primary]}
                tintColor={colors.primary}
              />
            ) : undefined
          }
        >
          {children}
        </ScrollView>
      ) : (
        children
      )}
    </View>
  );

  if (keyboardAvoiding && Platform.OS === 'ios') {
    return (
      <SafeAreaView 
        style={[
          styles.safeArea, 
          { backgroundColor },
          !insetsTop && styles.noTopInsets,
          !insetsBottom && styles.noBottomInsets,
        ]}
      >
        <StatusBar barStyle="dark-content" backgroundColor={backgroundColor} />
        <KeyboardAvoidingView 
          style={styles.keyboardAvoid}
          behavior="padding"
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          {content}
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView 
      style={[
        styles.safeArea, 
        { backgroundColor },
        !insetsTop && styles.noTopInsets,
        !insetsBottom && styles.noBottomInsets,
      ]}
    >
      <StatusBar barStyle="dark-content" backgroundColor={backgroundColor} />
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  noTopInsets: {
    paddingTop: 0,
  },
  noBottomInsets: {
    paddingBottom: 0,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  keyboardAvoid: {
    flex: 1,
  },
});