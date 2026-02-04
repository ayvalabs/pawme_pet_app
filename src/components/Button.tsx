import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import colors from '../utils/colors';

interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'dark';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  onPress, 
  variant = 'primary', 
  style,
  textStyle 
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          container: styles.primaryContainer,
          text: styles.primaryText,
        };
      case 'secondary':
        return {
          container: styles.secondaryContainer,
          text: styles.secondaryText,
        };
      case 'ghost':
        return {
          container: styles.ghostContainer,
          text: styles.ghostText,
        };
      case 'dark':
        return {
          container: styles.darkContainer,
          text: styles.darkText,
        };
      default:
        return {
          container: styles.primaryContainer,
          text: styles.primaryText,
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={[styles.base, variantStyles.container, style]}
      activeOpacity={0.8}
    >
      {typeof children === 'string' ? (
        <Text style={[styles.baseText, variantStyles.text, textStyle]}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderBottomWidth: 4,
  },
  baseText: {
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },
  primaryContainer: {
    backgroundColor: colors.pink400,
    borderBottomColor: colors.pink500,
    shadowColor: colors.pink400,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  primaryText: {
    color: colors.white,
  },
  secondaryContainer: {
    backgroundColor: colors.white,
    borderBottomColor: colors.pink100,
  },
  secondaryText: {
    color: colors.pink500,
  },
  ghostContainer: {
    backgroundColor: colors.pink50,
    borderBottomColor: colors.pink100,
  },
  ghostText: {
    color: colors.pink600,
  },
  darkContainer: {
    backgroundColor: colors.slate800,
    borderBottomColor: colors.slate900,
  },
  darkText: {
    color: colors.white,
  },
});

export default Button;
