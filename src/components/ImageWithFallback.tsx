import React, { useState } from 'react';
import { Image, View, StyleSheet, ImageStyle, ViewStyle } from 'react-native';
import colors from '../utils/colors';

interface ImageWithFallbackProps {
  src: string;
  alt?: string;
  style?: ImageStyle;
  containerStyle?: ViewStyle;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ 
  src, 
  alt, 
  style,
  containerStyle 
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <View style={[styles.fallbackContainer, containerStyle, style]}>
        <View style={styles.fallbackIcon}>
          <View style={styles.fallbackRect} />
        </View>
      </View>
    );
  }

  return (
    <Image
      source={{ uri: src }}
      style={style}
      onError={() => setHasError(true)}
      accessibilityLabel={alt}
    />
  );
};

const styles = StyleSheet.create({
  fallbackContainer: {
    backgroundColor: colors.slate100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackIcon: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackRect: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.slate300,
  },
});

export default ImageWithFallback;
