import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../utils/colors';

interface InsightItemProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export const InsightItem: React.FC<InsightItemProps> = ({ icon, title, desc }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc}>{desc}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 16,
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: colors.pink50,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 56,
    height: 56,
    backgroundColor: colors.pink50,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  title: {
    fontWeight: '900',
    color: colors.pink900,
    fontSize: 16,
    letterSpacing: -0.5,
  },
  desc: {
    fontSize: 14,
    color: 'rgba(131, 24, 67, 0.6)',
    lineHeight: 22,
    marginTop: 4,
    fontWeight: '500',
  },
});

export default InsightItem;
