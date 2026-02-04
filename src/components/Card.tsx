import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import colors from '../utils/colors';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({ children, style }) => {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 32,
    padding: 24,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 30,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(252, 231, 243, 0.5)',
  },
});

export default Card;
