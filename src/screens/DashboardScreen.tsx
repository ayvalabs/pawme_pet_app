import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Alert } from 'react-native';
import { Bell, Heart, Video, Info, ShieldCheck, Plus, LogOut } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Card, ImageWithFallback, BottomNav, InsightItem } from '../components';
import { PetProfile, Screen } from '../types';
import { getBreedData } from '../data/breedData';
import { useAuth } from '../contexts/AuthContext';
import colors from '../utils/colors';

interface DashboardScreenProps {
  pet: PetProfile;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onNavigate: (screen: Screen) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ 
  pet, 
  activeTab, 
  onTabChange,
  onNavigate 
}) => {
  const { user, signOut } = useAuth();
  const breedData = getBreedData(pet.breed);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const cardAnim = useRef(new Animated.Value(20)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut();
            } catch (error) {
              Alert.alert('Error', 'Failed to sign out. Please try again.');
            }
          }
        },
      ]
    );
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(progressAnim, {
        toValue: 0.7,
        duration: 1000,
        useNativeDriver: false,
      }),
      Animated.timing(cardAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(cardOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerLabel}>Sweet Home</Text>
          <Text style={styles.headerTitle}>Hi, {user?.displayName || pet.name}! 👋</Text>
        </View>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={24} color={colors.pink400} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <LogOut size={20} color={colors.rose500} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Pet Card */}
        <Animated.View 
          style={[
            styles.petCardContainer,
            { 
              transform: [{ translateY: cardAnim }],
              opacity: cardOpacity 
            }
          ]}
        >
          <View style={styles.petCard}>
            <ImageWithFallback 
              src={pet.imageUrl} 
              alt={pet.breed}
              style={styles.petImage}
            />
            <LinearGradient
              colors={['transparent', 'rgba(219, 39, 119, 0.6)']}
              style={styles.petCardGradient}
            />
            <View style={styles.petCardContent}>
              <View>
                <View style={styles.breedBadge}>
                  <Text style={styles.breedBadgeText}>✨ {pet.breed} ✨</Text>
                </View>
                <Text style={styles.petName}>{pet.name}</Text>
              </View>
              <View style={styles.heartButton}>
                <Heart size={24} color={colors.rose500} fill={colors.rose500} />
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Action Quick Grid */}
        <View style={styles.actionGrid}>
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => onNavigate('health')}
            activeOpacity={0.7}
          >
            <View style={[styles.actionIcon, { backgroundColor: colors.rose100 }]}>
              <Heart size={24} color={colors.rose500} />
            </View>
            <View>
              <Text style={styles.actionTitle}>Health</Text>
              <Text style={styles.actionSubtitle}>Recipes & Tips</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => onNavigate('smart-home')}
            activeOpacity={0.7}
          >
            <View style={[styles.actionIcon, { backgroundColor: colors.sky100 }]}>
              <Video size={24} color={colors.sky500} />
            </View>
            <View>
              <Text style={styles.actionTitle}>Monitoring</Text>
              <Text style={styles.actionSubtitle}>IP Cameras</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Breed Insight Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Daily Fluff Info</Text>
            <TouchableOpacity>
              <Text style={styles.sectionLink}>View Diary</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.insightList}>
            <InsightItem 
              icon={<Info size={24} color={colors.pink400} />}
              title="How to Speak Pet"
              desc={breedData.communication}
            />
            <InsightItem 
              icon={<ShieldCheck size={24} color={colors.pink400} />}
              title="Wagging Walks"
              desc={`${breedData.walks} of fun! Most comfy in ${breedData.season}`}
            />
          </View>
        </View>

        {/* Training Progress */}
        <View style={styles.trainingCard}>
          <View style={styles.trainingHeader}>
            <View>
              <Text style={styles.trainingTitle}>Today's Lesson</Text>
              <Text style={styles.trainingSubtitle}>For {pet.breed}s</Text>
            </View>
            <TouchableOpacity style={styles.addButton}>
              <Plus size={20} color={colors.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.trainingText}>
            "{breedData.training}"
          </Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
            </View>
            <Text style={styles.progressText}>70% Cuteness Mastered</Text>
          </View>
          <View style={styles.trainingGlow} />
        </View>
      </ScrollView>

      {/* Bottom Nav */}
      <BottomNav 
        active={activeTab} 
        onChange={(tab) => {
          onTabChange(tab);
          if (tab === 'health') onNavigate('health');
          if (tab === 'home') onNavigate('dashboard');
          if (tab === 'camera') onNavigate('smart-home');
          if (tab === 'community') onNavigate('community');
          if (tab === 'store') onNavigate('supplies');
        }} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pink50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 8,
  },
  headerLabel: {
    color: colors.pink400,
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 3,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: colors.pink600,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  notificationButton: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 2,
    borderColor: colors.pink50,
  },
  signOutButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.rose100,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 120,
    gap: 24,
  },
  petCardContainer: {
    borderRadius: 40,
    overflow: 'hidden',
    shadowColor: colors.pink400,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.2,
    shadowRadius: 50,
    elevation: 16,
  },
  petCard: {
    height: 288,
    borderRadius: 40,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: colors.white,
  },
  petImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  petCardGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '60%',
  },
  petCardContent: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  breedBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  breedBadgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  petName: {
    fontSize: 36,
    fontWeight: '900',
    color: colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  heartButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 2,
    borderColor: colors.pink50,
  },
  actionGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  actionCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 32,
    padding: 24,
    gap: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 30,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(252, 231, 243, 0.5)',
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionTitle: {
    fontWeight: '900',
    color: colors.pink900,
    fontSize: 18,
    letterSpacing: -0.5,
  },
  actionSubtitle: {
    fontSize: 12,
    color: colors.pink400,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  section: {
    gap: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.pink900,
    letterSpacing: -0.5,
    fontStyle: 'italic',
  },
  sectionLink: {
    color: colors.pink500,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  insightList: {
    gap: 16,
  },
  trainingCard: {
    backgroundColor: colors.pink500,
    borderRadius: 32,
    padding: 24,
    overflow: 'hidden',
  },
  trainingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  trainingTitle: {
    fontWeight: '900',
    fontSize: 20,
    color: colors.white,
    letterSpacing: -0.5,
    fontStyle: 'italic',
  },
  trainingSubtitle: {
    color: colors.pink100,
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 3,
    opacity: 0.8,
  },
  addButton: {
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  trainingText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
    lineHeight: 26,
    marginBottom: 24,
  },
  progressContainer: {
    gap: 12,
  },
  progressBar: {
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.white,
    borderRadius: 6,
    shadowColor: colors.white,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
  progressText: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.white,
    textTransform: 'uppercase',
    letterSpacing: 3,
    opacity: 0.9,
  },
  trainingGlow: {
    position: 'absolute',
    right: -32,
    bottom: -32,
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});

export default DashboardScreen;
