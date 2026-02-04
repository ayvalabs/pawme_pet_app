import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Rect, Path, Ellipse, G } from 'react-native-svg';
import colors from '../utils/colors';

interface PawIconProps {
  size?: number;
  variant?: 'filled' | 'outlined';
}

export const PawIcon: React.FC<PawIconProps> = ({ size = 80, variant = 'filled' }) => {
  if (variant === 'outlined') {
    // Outlined version (for loading screen)
    return (
      <View style={[styles.container, { width: size, height: size }]}>
        <Svg width={size} height={size} viewBox="0 0 200 200">
          {/* Rounded square with pink border */}
          <Rect
            x="10"
            y="10"
            width="180"
            height="180"
            rx="32"
            ry="32"
            fill="white"
            stroke={colors.pink200}
            strokeWidth="4"
          />
          
          {/* Pink arc at top */}
          <Path
            d="M 30 40 Q 100 10 170 40"
            fill="none"
            stroke={colors.pink400}
            strokeWidth="6"
            strokeLinecap="round"
          />
          
          {/* Two paw prints */}
          <G transform="translate(45, 70)">
            {/* First paw */}
            <G transform="rotate(-20, 40, 50)">
              <Ellipse cx="40" cy="70" rx="22" ry="20" fill="#1a1a1a" />
              <Ellipse cx="18" cy="35" rx="12" ry="14" fill="#1a1a1a" />
              <Ellipse cx="42" cy="26" rx="12" ry="14" fill="#1a1a1a" />
              <Ellipse cx="66" cy="35" rx="12" ry="14" fill="#1a1a1a" />
            </G>
            
            {/* Second paw */}
            <G transform="translate(55, 40) rotate(-20, 40, 50)">
              <Ellipse cx="40" cy="70" rx="22" ry="20" fill="#1a1a1a" />
              <Ellipse cx="18" cy="35" rx="12" ry="14" fill="#1a1a1a" />
              <Ellipse cx="42" cy="26" rx="12" ry="14" fill="#1a1a1a" />
              <Ellipse cx="66" cy="35" rx="12" ry="14" fill="#1a1a1a" />
            </G>
          </G>
        </Svg>
      </View>
    );
  }

  // Filled version (for login screen / app icon style)
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox="0 0 200 200">
        {/* Pink rounded square background */}
        <Rect
          x="10"
          y="10"
          width="180"
          height="180"
          rx="40"
          ry="40"
          fill={colors.pink400}
        />
        
        {/* Two paw prints */}
        <G transform="translate(45, 65)">
          {/* First paw */}
          <G transform="rotate(-20, 40, 50)">
            <Ellipse cx="40" cy="70" rx="22" ry="20" fill="#1a1a1a" />
            <Ellipse cx="18" cy="35" rx="12" ry="14" fill="#1a1a1a" />
            <Ellipse cx="42" cy="26" rx="12" ry="14" fill="#1a1a1a" />
            <Ellipse cx="66" cy="35" rx="12" ry="14" fill="#1a1a1a" />
          </G>
          
          {/* Second paw */}
          <G transform="translate(55, 40) rotate(-20, 40, 50)">
            <Ellipse cx="40" cy="70" rx="22" ry="20" fill="#1a1a1a" />
            <Ellipse cx="18" cy="35" rx="12" ry="14" fill="#1a1a1a" />
            <Ellipse cx="42" cy="26" rx="12" ry="14" fill="#1a1a1a" />
            <Ellipse cx="66" cy="35" rx="12" ry="14" fill="#1a1a1a" />
          </G>
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PawIcon;
