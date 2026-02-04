import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { PawIcon } from '../components';
import colors from '../utils/colors';

export const AnalyzingScreen: React.FC = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Rotation animation
    const rotate = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    // Scale animation
    const scale = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    // Bounce animation for paw
    const bounce = Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -20,
          duration: 500,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 500,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    rotate.start();
    scale.start();
    bounce.start();

    return () => {
      rotate.stop();
      scale.stop();
      bounce.stop();
    };
  }, [rotateAnim, scaleAnim, bounceAnim]);

  const spinInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.loaderContainer}>
        <View style={styles.outerRing}>
          <Animated.View 
            style={[
              styles.spinnerRing,
              { 
                transform: [
                  { rotate: spinInterpolate },
                  { scale: scaleAnim }
                ] 
              }
            ]}
          />
        </View>
        <Animated.View 
          style={[
            styles.pawIconContainer,
            { transform: [{ translateY: bounceAnim }] }
          ]}
        >
          <PawIcon size={160} variant="outlined" />
        </Animated.View>
      </View>
      
      <View style={styles.textContainer}>
        <Text style={styles.title}>Finding the breed...</Text>
        <Text style={styles.subtitle}>Checking for maximum cuteness</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    gap: 32,
  },
  loaderContainer: {
    position: 'relative',
    width: 192,
    height: 192,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerRing: {
    width: 192,
    height: 192,
    borderRadius: 48,
    borderWidth: 8,
    borderColor: colors.pink50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinnerRing: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 40,
    borderWidth: 8,
    borderTopColor: colors.pink400,
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  pawIconContainer: {
    position: 'absolute',
  },
  textContainer: {
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: colors.pink600,
    fontStyle: 'italic',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(131, 24, 67, 0.4)',
    textTransform: 'uppercase',
    letterSpacing: 3,
  },
});

export default AnalyzingScreen;
