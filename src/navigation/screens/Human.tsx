import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export function Human() {
  return (
    <View style={styles.container}>
      <Text style={styles.humanText}>Human Screen</Text>
      <Image 
        source={{ uri: 'https://img.technews.tw/wp-content/uploads/2017/05/25114940/4203717138_581f815945_z.jpg' }} 
        style={styles.image} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  humanText: {
    fontSize: 24,
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: 'cover',
  },
});
