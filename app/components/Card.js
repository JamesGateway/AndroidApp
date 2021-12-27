import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';

import Text from './Text';
import colors from '../config/colors';

export default function Card({ title, http, message, date, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{title}</Text>
          {http && <Text style={styles.http}>{http}</Text>}
          {message && <Text style={styles.message}>{message}</Text>}
          {date && <Text style={styles.date}>Date: {date}</Text>}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: 'hidden',
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    marginBottom: 8,
    fontWeight: 'bold',
    fontSize: 22,
  },
  message: {
    marginVertical: 15,
  },
});
