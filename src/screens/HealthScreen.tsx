import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { X, Thermometer, Activity, UtensilsCrossed, MapPin } from 'lucide-react-native';
import { Card, ImageWithFallback, Button } from '../components';
import { PetProfile } from '../types';
import { getBreedData } from '../data/breedData';
import colors from '../utils/colors';

interface HealthScreenProps {
  pet: PetProfile;
  onBack: () => void;
}

export const HealthScreen: React.FC<HealthScreenProps> = ({ pet, onBack }) => {
  const breedData = getBreedData(pet.breed);

  const vets = [
    { id: 1, name: 'Paws & Claws Spa', distance: '0.8 miles', rating: 4.9 },
    { id: 2, name: 'Happy Tails Clinic', distance: '1.2 miles', rating: 4.8 },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <X size={24} color={colors.pink400} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Spa & Treats</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Health Issues Card */}
        <Card style={styles.healthCard}>
          <View style={styles.healthHeader}>
            <View style={styles.healthIcon}>
              <Thermometer size={24} color={colors.white} />
            </View>
            <Text style={styles.healthTitle}>Cuddle Checks</Text>
          </View>
          <Text style={styles.healthSubtitle}>
            Keep an eye on these for your {pet.breed}:
          </Text>
          <View style={styles.issuesList}>
            {breedData.healthIssues.map((issue, index) => (
              <View key={index} style={styles.issueBadge}>
                <Text style={styles.issueText}>{issue}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Recipe Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Yummy In The Tummy</Text>
          <View style={styles.recipeCard}>
            <View style={styles.recipeImageContainer}>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=600"
                alt="Food"
                style={styles.recipeImage}
              />
              <View style={styles.recipeBadge}>
                <Text style={styles.recipeBadgeText}>100% Love</Text>
              </View>
            </View>
            <View style={styles.recipeContent}>
              <Text style={styles.recipeTitle}>The "{pet.name} Special"</Text>
              <Text style={styles.recipeDesc}>{breedData.recipe}</Text>
              <View style={styles.recipeTags}>
                <View style={styles.recipeTag}>
                  <Activity size={14} color={colors.pink400} />
                  <Text style={styles.recipeTagText}>High Protein</Text>
                </View>
                <View style={styles.recipeTag}>
                  <UtensilsCrossed size={14} color={colors.pink400} />
                  <Text style={styles.recipeTagText}>Grain Free</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Health Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Self-Care Tips</Text>
          <Card>
            <Text style={styles.tipsText}>{breedData.healthTips}</Text>
          </Card>
        </View>

        {/* Vets Network */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nearby Besties</Text>
            <TouchableOpacity style={styles.nearbyButton}>
              <MapPin size={16} color={colors.pink500} />
              <Text style={styles.nearbyText}>Nearby</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.vetsList}>
            {vets.map((vet) => (
              <TouchableOpacity key={vet.id} style={styles.vetCard} activeOpacity={0.7}>
                <View style={styles.vetImageContainer}>
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1701513519108-b0a234f26161?auto=format&fit=crop&q=80&w=200"
                    alt={vet.name}
                    style={styles.vetImage}
                  />
                </View>
                <View style={styles.vetInfo}>
                  <Text style={styles.vetName}>{vet.name}</Text>
                  <Text style={styles.vetDetails}>{vet.distance} • {vet.rating} ★</Text>
                </View>
                <Button variant="ghost" style={styles.visitButton} textStyle={styles.visitButtonText}>
                  <Text style={styles.visitButtonText}>Visit</Text>
                </Button>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
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
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 8,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.pink50,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.pink600,
    fontStyle: 'italic',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 128,
    gap: 24,
  },
  healthCard: {
    backgroundColor: 'rgba(255, 228, 230, 0.5)',
    borderColor: colors.rose200,
  },
  healthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  healthIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.rose500,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.rose500,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  healthTitle: {
    fontWeight: '900',
    color: colors.rose900,
    fontSize: 18,
    letterSpacing: -0.5,
  },
  healthSubtitle: {
    fontSize: 14,
    fontWeight: '700',
    color: 'rgba(159, 18, 57, 0.8)',
    marginBottom: 16,
  },
  issuesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  issueBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.rose200,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  issueText: {
    color: colors.rose500,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  section: {
    gap: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.pink900,
    fontStyle: 'italic',
    paddingHorizontal: 8,
  },
  nearbyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  nearbyText: {
    color: colors.pink500,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  recipeCard: {
    backgroundColor: colors.white,
    borderRadius: 32,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 8,
  },
  recipeImageContainer: {
    height: 192,
    position: 'relative',
  },
  recipeImage: {
    width: '100%',
    height: '100%',
  },
  recipeBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: colors.pink500,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  recipeBadgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 3,
  },
  recipeContent: {
    padding: 24,
  },
  recipeTitle: {
    fontWeight: '900',
    fontSize: 20,
    color: colors.pink900,
    marginBottom: 8,
  },
  recipeDesc: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(131, 24, 67, 0.6)',
    lineHeight: 22,
    fontStyle: 'italic',
  },
  recipeTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 24,
  },
  recipeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.pink50,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  recipeTagText: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.pink400,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  tipsText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(131, 24, 67, 0.7)',
    lineHeight: 24,
  },
  vetsList: {
    gap: 16,
  },
  vetCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: colors.pink50,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  vetImageContainer: {
    width: 64,
    height: 64,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: colors.pink50,
    borderWidth: 2,
    borderColor: colors.pink100,
  },
  vetImage: {
    width: '100%',
    height: '100%',
  },
  vetInfo: {
    flex: 1,
  },
  vetName: {
    fontWeight: '900',
    color: colors.pink900,
    fontSize: 16,
  },
  vetDetails: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.pink300,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginTop: 2,
  },
  visitButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderBottomWidth: 0,
  },
  visitButtonText: {
    fontSize: 12,
  },
});

export default HealthScreen;
