import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import { X, Plus, Wifi, Video, Settings } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Card, ImageWithFallback } from '../components';
import { Camera } from '../types';
import colors from '../utils/colors';

interface SmartHomeScreenProps {
  onBack: () => void;
}

export const SmartHomeScreen: React.FC<SmartHomeScreenProps> = ({ onBack }) => {
  const [cameras, setCameras] = useState<Camera[]>([
    { id: 1, name: 'Cozy Living Room', status: 'online', type: 'Matter 1.0' },
    { id: 2, name: 'Tasty Kitchen', status: 'online', type: 'Matter 1.1' },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCameraName, setNewCameraName] = useState('');
  const [newCameraIP, setNewCameraIP] = useState('');

  const addCamera = () => {
    if (!newCameraName.trim() || !newCameraIP.trim()) {
      Alert.alert('Missing Info', 'Please enter camera name and IP address');
      return;
    }

    const newCamera: Camera = {
      id: Date.now(),
      name: newCameraName,
      status: 'online',
      type: 'Matter 1.2',
      streamUrl: `rtsp://${newCameraIP}/stream`,
    };

    setCameras([...cameras, newCamera]);
    setNewCameraName('');
    setNewCameraIP('');
    setShowAddModal(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <X size={24} color={colors.pink400} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Peep & Watch</Text>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={() => setShowAddModal(true)}>
          <Plus size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Matter Integration Banner */}
        <LinearGradient
          colors={[colors.pink400, colors.rose500]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.matterBanner}
        >
          <View style={styles.matterContent}>
            <View style={styles.matterHeader}>
              <View style={styles.matterIcon}>
                <Wifi size={20} color={colors.white} />
              </View>
              <Text style={styles.matterLabel}>Universal Love</Text>
            </View>
            <Text style={styles.matterTitle}>Matter Magic</Text>
            <Text style={styles.matterDesc}>
              Watching over your furry angels from any brand's camera! 📸
            </Text>
          </View>
          <View style={styles.matterGlow} />
        </LinearGradient>

        {/* Camera Feeds */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Live Snuggles</Text>
          <View style={styles.cameraList}>
            {cameras.map((cam) => (
              <Card key={cam.id} style={styles.cameraCard}>
                <View style={styles.cameraPreview}>
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1767355112909-88ceaa7acf18?auto=format&fit=crop&q=80&w=800"
                    alt={cam.name}
                    style={styles.cameraImage}
                  />
                  <View style={styles.cameraOverlay}>
                    <TouchableOpacity style={styles.playButton}>
                      <Video size={32} color={colors.white} fill={colors.white} />
                    </TouchableOpacity>
                    <Text style={styles.connectText}>Connect Heartbeat</Text>
                  </View>
                  <View style={styles.cameraNameBadge}>
                    <View style={styles.statusDot} />
                    <Text style={styles.cameraNameText}>{cam.name}</Text>
                  </View>
                  <View style={styles.cameraTypeBadge}>
                    <Text style={styles.cameraTypeText}>{cam.type}</Text>
                  </View>
                </View>
                <View style={styles.cameraInfo}>
                  <View>
                    <Text style={styles.cameraTitle}>{cam.name}</Text>
                    <Text style={styles.cameraStatus}>Scanning for sweet dreams...</Text>
                  </View>
                  <TouchableOpacity style={styles.settingsButton}>
                    <Settings size={20} color={colors.pink400} />
                  </TouchableOpacity>
                </View>
              </Card>
            ))}
          </View>
        </View>

        {/* Matter Compatibility Info */}
        <Card style={styles.infoCard}>
          <Text style={styles.infoTitle}>🔌 Matter Compatible</Text>
          <Text style={styles.infoText}>
            This app works with any Matter-compatible IP camera from any brand. 
            Simply add your camera's IP address and start monitoring your pets!
          </Text>
          <View style={styles.brandList}>
            <Text style={styles.brandItem}>• Ring</Text>
            <Text style={styles.brandItem}>• Nest</Text>
            <Text style={styles.brandItem}>• Arlo</Text>
            <Text style={styles.brandItem}>• Wyze</Text>
            <Text style={styles.brandItem}>• TP-Link</Text>
            <Text style={styles.brandItem}>• Any RTSP Camera</Text>
          </View>
        </Card>
      </ScrollView>

      {/* Add Camera Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Camera</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <X size={24} color={colors.pink400} />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.inputLabel}>Camera Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Bedroom Camera"
              placeholderTextColor={colors.pink300}
              value={newCameraName}
              onChangeText={setNewCameraName}
            />
            
            <Text style={styles.inputLabel}>IP Address / Stream URL</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 192.168.1.100"
              placeholderTextColor={colors.pink300}
              value={newCameraIP}
              onChangeText={setNewCameraIP}
              keyboardType="url"
              autoCapitalize="none"
            />

            <Text style={styles.matterNote}>
              ✨ Matter protocol auto-discovers compatible devices on your network
            </Text>

            <TouchableOpacity style={styles.addCameraButton} onPress={addCamera}>
              <Text style={styles.addCameraButtonText}>Add Camera</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
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
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.pink400,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.pink400,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    borderBottomWidth: 4,
    borderBottomColor: colors.pink500,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 128,
    gap: 24,
  },
  matterBanner: {
    borderRadius: 40,
    padding: 32,
    overflow: 'hidden',
    shadowColor: colors.pink400,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  matterContent: {
    zIndex: 10,
  },
  matterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  matterIcon: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
  },
  matterLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.white,
    textTransform: 'uppercase',
    letterSpacing: 4,
    opacity: 0.9,
  },
  matterTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: colors.white,
    fontStyle: 'italic',
    letterSpacing: -1,
    marginBottom: 12,
  },
  matterDesc: {
    color: colors.pink50,
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.9,
    lineHeight: 22,
  },
  matterGlow: {
    position: 'absolute',
    right: -64,
    bottom: -64,
    width: 224,
    height: 224,
    borderRadius: 112,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transform: [{ rotate: '12deg' }],
  },
  section: {
    gap: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.pink900,
    fontStyle: 'italic',
    paddingHorizontal: 8,
  },
  cameraList: {
    gap: 24,
  },
  cameraCard: {
    padding: 0,
    overflow: 'hidden',
  },
  cameraPreview: {
    height: 224,
    backgroundColor: colors.slate800,
    position: 'relative',
  },
  cameraImage: {
    width: '100%',
    height: '100%',
    opacity: 0.6,
  },
  cameraOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  connectText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 4,
    marginTop: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  cameraNameBadge: {
    position: 'absolute',
    top: 20,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.rose500,
    shadowColor: colors.rose500,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  cameraNameText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  cameraTypeBadge: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(236, 72, 153, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  cameraTypeText: {
    color: colors.white,
    fontSize: 8,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontStyle: 'italic',
  },
  cameraInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    backgroundColor: colors.white,
  },
  cameraTitle: {
    fontWeight: '900',
    color: colors.pink900,
    fontSize: 18,
    letterSpacing: -0.5,
  },
  cameraStatus: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.pink300,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.pink50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoCard: {
    backgroundColor: colors.white,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.pink900,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: 'rgba(131, 24, 67, 0.7)',
    lineHeight: 22,
    marginBottom: 16,
  },
  brandList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  brandItem: {
    fontSize: 12,
    color: colors.pink500,
    fontWeight: '600',
    backgroundColor: colors.pink50,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    paddingBottom: 48,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.pink600,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.pink900,
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: colors.pink50,
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    color: colors.pink900,
    borderWidth: 2,
    borderColor: colors.pink100,
  },
  matterNote: {
    fontSize: 12,
    color: colors.pink400,
    marginTop: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  addCameraButton: {
    backgroundColor: colors.pink400,
    borderRadius: 24,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
    borderBottomWidth: 4,
    borderBottomColor: colors.pink500,
  },
  addCameraButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default SmartHomeScreen;
