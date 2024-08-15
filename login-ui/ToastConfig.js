import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ToastConfig = {
  success: ({ text1, text2 }) => (
    <View style={styles.successContainer}>
      <Text style={styles.successText}>{text1}</Text>
      <Text style={styles.successText}>{text2}</Text>
    </View>
  ),
  error: ({ text1, text2 }) => (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{text1}</Text>
      <Text style={styles.errorText}>{text2}</Text>
    </View>
  ),
  // Ajoutez d'autres types de Toast ici si nécessaire
};

const styles = StyleSheet.create({
  successContainer: {
    height: 60,
    width: '100%',
    backgroundColor: 'green',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successText: {
    color: 'white',
  },
  errorContainer: {
    height: 60,
    width: '100%',
    backgroundColor: 'red',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'white',
  },
});

export default ToastConfig;



