import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { Heart, Camera } from 'lucide-react-native';
import { Button } from '../components';
import colors from '../utils/colors';

interface OnboardingScreenProps {
  onStartCapture: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onStartCapture }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [scaleAnim]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.mainLogo}>
            <Text style={styles.pawIcon}>🐾</Text>
          </View>
          <Animated.View 
            style={[
              styles.heartBadge,
              { transform: [{ scale: scaleAnim }] }
            ]}
          >
            <Heart size={24} color={colors.white} fill={colors.white} />
          </Animated.View>
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            <Text style={styles.titlePaw}>PAW</Text>
            <Text style={styles.titleMe}>ME</Text>
          </Text>
          <Text style={styles.subtitle}>
            Made with ❤️ for the world's cutest pet parents!
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button onPress={onStartCapture} style={styles.button}>
          <Camera size={24} color={colors.white} />
          <Text style={styles.buttonText}>Snap a Cutie</Text>
        </Button>
        <Text style={styles.magicText}>✨ Magic AI Scanner ✨</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pink50,
    paddingHorizontal: 32,
    paddingTop: 80,
    paddingBottom: 40,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
  },
  logoContainer: {
    position: 'relative',
  },
  mainLogo: {
    width: 112,
    height: 112,
    backgroundColor: colors.pink400,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.pink400,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 50,
    elevation: 16,
    transform: [{ rotate: '3deg' }],
    borderWidth: 4,
    borderColor: colors.white,
  },
  pawIcon: {
    fontSize: 56,
  },
  heartBadge: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    width: 48,
    height: 48,
    backgroundColor: colors.rose500,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.rose500,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
    transform: [{ rotate: '-12deg' }],
    borderWidth: 4,
    borderColor: colors.white,
  },
  textContainer: {
    alignItems: 'center',
    gap: 16,
  },
  title: {
    fontSize: 48,
    fontWeight: '900',
    letterSpacing: -2,
  },
  titlePaw: {
    color: colors.pink600,
  },
  titleMe: {
    color: colors.pink400,
  },
  subtitle: {
    color: 'rgba(131, 24, 67, 0.6)',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    maxWidth: 280,
  },
  buttonContainer: {
    gap: 16,
    paddingBottom: 40,
  },
  button: {
    width: '100%',
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '700',
  },
  magicText: {
    textAlign: 'center',
    fontSize: 12,
    color: colors.pink300,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 3,
  },
});

export default OnboardingScreen;
