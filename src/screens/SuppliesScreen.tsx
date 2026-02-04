import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { X, ShoppingBag } from 'lucide-react-native';
import { Card } from '../components';
import colors from '../utils/colors';

interface SuppliesScreenProps {
  onBack: () => void;
}

export const SuppliesScreen: React.FC<SuppliesScreenProps> = ({ onBack }) => {
  const supplies = [
    { id: 1, name: 'Organic Pet Kibble', price: 24.99 },
    { id: 2, name: 'Premium Treats', price: 12.99 },
    { id: 3, name: 'Cozy Pet Bed', price: 49.99 },
    { id: 4, name: 'Interactive Toy Set', price: 18.99 },
    { id: 5, name: 'Grooming Kit', price: 34.99 },
    { id: 6, name: 'Travel Carrier', price: 59.99 },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <X size={20} color={colors.slate800} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Daily Supplies</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {supplies.map((item) => (
            <Card key={item.id} style={styles.productCard}>
              <View style={styles.productImage}>
                <ShoppingBag size={32} color={colors.slate300} />
              </View>
              <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
              <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>Add to cart</Text>
              </TouchableOpacity>
            </Card>
          ))}
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
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  productCard: {
    width: '47%',
    padding: 12,
  },
  productImage: {
    aspectRatio: 1,
    backgroundColor: colors.slate100,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  productName: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.slate800,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.indigo600,
    marginTop: 4,
  },
  addButton: {
    backgroundColor: colors.slate900,
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  addButtonText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
});

export default SuppliesScreen;
