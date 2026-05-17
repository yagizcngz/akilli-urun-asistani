import { View, Text, StyleSheet } from 'react-native';

export default function TypingIndicator() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>● ● ●</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    backgroundColor: '#F1EFE8',
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginVertical: 4,
  },
  text: { color: '#888780', letterSpacing: 4, fontSize: 12 },
});