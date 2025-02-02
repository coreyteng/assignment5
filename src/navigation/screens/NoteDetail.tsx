import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { NoteDetailParams } from '../index';
import { RouteProp } from '@react-navigation/native';

type Props = {
  route: RouteProp<{ NoteDetail: NoteDetailParams }, 'NoteDetail'>;
};

export function NoteDetail({ route }: Props) {
  const { note, date, image } = route.params.passProps;
  
  console.log('Image URL:', image);

  return (
    <View style={styles.container}>
      <Image 
        source={typeof image === 'string' ? { uri: image } : image}
        style={styles.image}
        resizeMode="contain"
        onError={(error) => console.log('Image loading error:', error.nativeEvent.error)}
      />
      <Text style={styles.noteText}>{note}</Text>
      <Text style={styles.dateText}>{date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 10,
  },
  noteText: {
    fontSize: 16,
    alignSelf: 'center',
    marginBottom: 8,
    color: 'black',
  },
  dateText: {
    fontSize: 14,
    alignSelf: 'center',
    color: 'gray',
  },
});
