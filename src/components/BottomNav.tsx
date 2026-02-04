import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Home, Stethoscope, Video, Users, ShoppingBag } from 'lucide-react-native';
import colors from '../utils/colors';

interface BottomNavProps {
  active: string;
  onChange: (tab: string) => void;
}

const tabs = [
  { id: 'home', icon: Home, label: 'Sweet Home' },
  { id: 'health', icon: Stethoscope, label: 'Care' },
  { id: 'camera', icon: Video, label: 'Watch' },
  { id: 'community', icon: Users, label: 'Social' },
  { id: 'store', icon: ShoppingBag, label: 'Shop' },
];

export const BottomNav: React.FC<BottomNavProps> = ({ active, onChange }) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = active === tab.id;
        const IconComponent = tab.icon;
        
        return (
          <TouchableOpacity
            key={tab.id}
            onPress={() => onChange(tab.id)}
            style={[styles.tab, isActive && styles.activeTab]}
            activeOpacity={0.7}
          >
            <IconComponent
              size={24}
              color={isActive ? colors.white : colors.pink200}
              fill={isActive ? colors.white : 'transparent'}
            />
            {isActive && (
              <Text style={styles.activeLabel}>{tab.label}</Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 32,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 50,
    elevation: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  tab: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    padding: 8,
    borderRadius: 16,
  },
  activeTab: {
    backgroundColor: colors.pink400,
    transform: [{ scale: 1.1 }],
    shadowColor: colors.pink400,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  activeLabel: {
    fontSize: 8,
    fontWeight: '900',
    color: colors.white,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export default BottomNav;
