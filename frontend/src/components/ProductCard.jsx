import { View, Text, StyleSheet } from 'react-native';

export default function ProductCard({ product }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title} numberOfLines={2}>{product.baslik}</Text>
      <Text style={styles.price}>
        {product.fiyat.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#E1F5EE',
    borderRadius: 12,
    padding: 12,
    marginRight: 10,
    width: 180,
    borderLeftWidth: 3,
    borderLeftColor: '#1D9E75',
  },
  title: { fontSize: 13, color: '#085041', fontWeight: '500', marginBottom: 6 },
  price: { fontSize: 14, color: '#0F6E56', fontWeight: '700' },
});