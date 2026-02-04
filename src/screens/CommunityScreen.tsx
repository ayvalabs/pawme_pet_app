import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { X } from 'lucide-react-native';
import { Card, Button } from '../components';
import colors from '../utils/colors';

interface CommunityScreenProps {
  onBack: () => void;
}

export const CommunityScreen: React.FC<CommunityScreenProps> = ({ onBack }) => {
  const playdates = [
    { id: 1, title: 'Central Park Run', month: 'Feb', day: '11', time: '2pm', petsAttending: 8 },
    { id: 2, title: 'Beach Day Splash', month: 'Feb', day: '12', time: '10am', petsAttending: 12 },
    { id: 3, title: 'Puppy Yoga Session', month: 'Feb', day: '15', time: '9am', petsAttending: 6 },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <X size={20} color={colors.slate800} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Community</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Playdates</Text>
          <View style={styles.playdateList}>
            {playdates.map((playdate) => (
              <Card key={playdate.id} style={styles.playdateCard}>
                <View style={styles.dateBox}>
                  <Text style={styles.dateMonth}>{playdate.month}</Text>
                  <Text style={styles.dateDay}>{playdate.day}</Text>
                </View>
                <View style={styles.playdateInfo}>
                  <Text style={styles.playdateTitle}>{playdate.title}</Text>
                  <Text style={styles.playdateDetails}>
                    {playdate.petsAttending} Pets attending • {playdate.time}
                  </Text>
                </View>
                <Button variant="ghost" style={styles.joinButton}>
                  <Text style={styles.joinButtonText}>Join</Text>
                </Button>
              </Card>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pet Parent Groups</Text>
          <Card style={styles.groupCard}>
            <Text style={styles.groupEmoji}>🐕</Text>
            <View style={styles.groupInfo}>
              <Text style={styles.groupTitle}>Golden Retriever Lovers</Text>
              <Text style={styles.groupMembers}>1,234 members</Text>
            </View>
            <Button variant="ghost" style={styles.joinButton}>
              <Text style={styles.joinButtonText}>Join</Text>
            </Button>
          </Card>
          <Card style={styles.groupCard}>
            <Text style={styles.groupEmoji}>🐈</Text>
            <View style={styles.groupInfo}>
              <Text style={styles.groupTitle}>Persian Cat Club</Text>
              <Text style={styles.groupMembers}>892 members</Text>
            </View>
            <Button variant="ghost" style={styles.joinButton}>
              <Text style={styles.joinButtonText}>Join</Text>
            </Button>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nearby Pet Parents</Text>
          <View style={styles.nearbyGrid}>
            {[1, 2, 3, 4].map((i) => (
              <View key={i} style={styles.nearbyCard}>
                <View style={styles.nearbyAvatar}>
                  <Text style={styles.nearbyAvatarText}>🐾</Text>
                </View>
                <Text style={styles.nearbyName}>Pet Parent {i}</Text>
                <Text style={styles.nearbyDistance}>0.{i} mi</Text>
              </View>
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
    backgroundColor: colors.slate50,
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
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.slate800,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 96,
    gap: 32,
  },
  section: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.slate800,
  },
  playdateList: {
    gap: 16,
  },
  playdateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
  },
  dateBox: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: colors.indigo100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateMonth: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.indigo600,
    textTransform: 'uppercase',
  },
  dateDay: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.indigo600,
  },
  playdateInfo: {
    flex: 1,
  },
  playdateTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.slate800,
  },
  playdateDetails: {
    fontSize: 12,
    color: colors.slate500,
    marginTop: 2,
  },
  joinButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 0,
  },
  joinButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.pink600,
  },
  groupCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    marginBottom: 12,
  },
  groupEmoji: {
    fontSize: 32,
  },
  groupInfo: {
    flex: 1,
  },
  groupTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.slate800,
  },
  groupMembers: {
    fontSize: 12,
    color: colors.slate500,
    marginTop: 2,
  },
  nearbyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  nearbyCard: {
    width: '47%',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  nearbyAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.pink50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  nearbyAvatarText: {
    fontSize: 24,
  },
  nearbyName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.slate800,
  },
  nearbyDistance: {
    fontSize: 12,
    color: colors.slate500,
    marginTop: 2,
  },
});

export default CommunityScreen;
