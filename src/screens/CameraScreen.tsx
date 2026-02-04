import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { X, Image as ImageIcon } from 'lucide-react-native';
import colors from '../utils/colors';

interface CameraScreenProps {
  onCapture: (imageUri: string) => void;
  onClose: () => void;
}

export const CameraScreen: React.FC<CameraScreenProps> = ({ onCapture, onClose }) => {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spin = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    spin.start();
    return () => spin.stop();
  }, [rotateAnim]);

  const spinInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        if (photo?.uri) {
          onCapture(photo.uri);
        }
      } catch (error) {
        console.log('Error taking picture:', error);
        // Fallback to a sample image for demo
        onCapture('https://images.unsplash.com/photo-1649504277328-1f84d8bb19b0?auto=format&fit=crop&q=80&w=600');
      }
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      onCapture(result.assets[0].uri);
    }
  };

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>We need camera access to scan your pet!</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.galleryButton} onPress={pickImage}>
          <Text style={styles.galleryButtonText}>Or pick from gallery</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <X size={24} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Pet Scanner</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.frameContainer}>
          <Animated.View 
            style={[
              styles.frame,
              { transform: [{ rotate: spinInterpolate }] }
            ]} 
          />
          <Text style={styles.frameText}>Position your pet in the circle</Text>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity style={styles.sideButton} onPress={pickImage}>
            <ImageIcon size={20} color={colors.white} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <View style={styles.captureButtonInner} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.sideButton}
            onPress={() => setFacing(facing === 'back' ? 'front' : 'back')}
          >
            <Text style={styles.flipText}>↻</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  camera: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
  },
  headerTitle: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 3,
  },
  frameContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  frame: {
    width: 256,
    height: 256,
    borderRadius: 128,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
  },
  frameText: {
    position: 'absolute',
    bottom: 48,
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontWeight: '500',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 48,
    paddingVertical: 48,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  sideButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButtonInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.white,
  },
  flipText: {
    color: colors.white,
    fontSize: 24,
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  permissionText: {
    color: colors.white,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 24,
  },
  permissionButton: {
    backgroundColor: colors.pink400,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 24,
  },
  permissionButtonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
  galleryButton: {
    marginTop: 16,
    padding: 16,
  },
  galleryButtonText: {
    color: colors.pink300,
    fontSize: 14,
  },
});

export default CameraScreen;
