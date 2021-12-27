import React from 'react';
import { Text } from 'react-native';
import defaultStyles from '../config/styles';

export default function AppText({ children, style, ...ortherProps }) {
  return (
    <Text style={[defaultStyles.text, style]} {...ortherProps}>
      {children}
    </Text>
  );
}
