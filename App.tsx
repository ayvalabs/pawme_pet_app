import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  OnboardingScreen,
  CameraScreen,
  AnalyzingScreen,
  DashboardScreen,
  HealthScreen,
  SmartHomeScreen,
  CommunityScreen,
  SuppliesScreen,
  LoginScreen,
} from './src/screens';
import { Screen, PetProfile } from './src/types';
import { getDogBreeds, getCatBreeds } from './src/data/breedData';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import colors from './src/utils/colors';

const PET_STORAGE_KEY = '@pawme_pet_profile';

function AppContent() {
  const { user, loading } = useAuth();
  const [screen, setScreen] = useState<Screen>('login');
  const [pet, setPet] = useState<PetProfile | null>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [petLoading, setPetLoading] = useState(true);

  // Load saved pet data on mount
  useEffect(() => {
    const loadPetData = async () => {
      try {
        const savedPet = await AsyncStorage.getItem(PET_STORAGE_KEY);
        if (savedPet) {
          setPet(JSON.parse(savedPet));
        }
      } catch (error) {
        console.log('Error loading pet data:', error);
      } finally {
        setPetLoading(false);
      }
    };
    loadPetData();
  }, []);

  // Handle auth state changes - go to dashboard if pet exists, otherwise onboarding
  useEffect(() => {
    if (!loading && !petLoading) {
      if (user) {
        if (pet) {
          setScreen('dashboard');
        } else {
          setScreen('onboarding');
        }
      } else {
        setScreen('login');
      }
    }
  }, [user, loading, pet, petLoading]);

  // Save pet data whenever it changes
  const savePet = async (newPet: PetProfile) => {
    try {
      await AsyncStorage.setItem(PET_STORAGE_KEY, JSON.stringify(newPet));
      setPet(newPet);
    } catch (error) {
      console.log('Error saving pet data:', error);
    }
  };

  const startIdentification = () => setScreen('camera');

  const handleCapture = (imageUri: string) => {
    setScreen('analyzing');
    
    // Simulate AI breed recognition
    setTimeout(() => {
      const allBreeds = [...getDogBreeds(), ...getCatBreeds()];
      const randomBreed = allBreeds[Math.floor(Math.random() * allBreeds.length)];
      const type = getCatBreeds().includes(randomBreed) ? 'cat' : 'dog';
      
      const img = type === 'dog'
        ? 'https://images.unsplash.com/photo-1649504277328-1f84d8bb19b0?auto=format&fit=crop&q=80&w=600'
        : 'https://images.unsplash.com/photo-1599907370836-939f2d59b897?auto=format&fit=crop&q=80&w=600';

      const newPet: PetProfile = {
        name: type === 'dog' ? 'Cooper' : 'Luna',
        breed: randomBreed,
        type: type as 'dog' | 'cat',
        age: '2 Years',
        imageUrl: imageUri.startsWith('http') ? img : imageUri,
      };
      savePet(newPet);
      setScreen('dashboard');
    }, 3000);
  };

  const handleNavigate = (newScreen: Screen) => {
    setScreen(newScreen);
  };

  const handleLoginSuccess = () => {
    setScreen('onboarding');
  };

  // Show loading screen while checking auth state or pet data
  if (loading || petLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.pink400} />
      </View>
    );
  }

  const renderScreen = () => {
    switch (screen) {
      case 'login':
        return <LoginScreen onSuccess={handleLoginSuccess} />;
      
      case 'onboarding':
        return <OnboardingScreen onStartCapture={startIdentification} />;
      
      case 'camera':
        return (
          <CameraScreen
            onCapture={handleCapture}
            onClose={() => setScreen('onboarding')}
          />
        );
      
      case 'analyzing':
        return <AnalyzingScreen />;
      
      case 'dashboard':
        if (!pet) return null;
        return (
          <DashboardScreen
            pet={pet}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onNavigate={handleNavigate}
          />
        );
      
      case 'health':
        if (!pet) return null;
        return (
          <HealthScreen
            pet={pet}
            onBack={() => setScreen('dashboard')}
          />
        );
      
      case 'smart-home':
        return (
          <SmartHomeScreen
            onBack={() => setScreen('dashboard')}
          />
        );
      
      case 'community':
        return (
          <CommunityScreen
            onBack={() => setScreen('dashboard')}
          />
        );
      
      case 'supplies':
        return (
          <SuppliesScreen
            onBack={() => setScreen('dashboard')}
          />
        );
      
      default:
        return <LoginScreen onSuccess={handleLoginSuccess} />;
    }
  };

  return (
    <>
      <StatusBar style={screen === 'camera' ? 'light' : 'dark'} />
      {renderScreen()}
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.pink50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
