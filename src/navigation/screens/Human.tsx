import React, { useState } from 'react';
import { View, Text, Image, Button, TextInput, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { changeName } from '../../redux/action';

interface RootState {
  newName: string;
  // 其他 state 屬性...
}

export function Human() {
  const [name, setName] = useState('')
  const dispatch = useDispatch();
  const newName = useSelector((state: RootState) => state.newName);
  
  return (
    <View style={styles.container}>
      <Text style={styles.humanText}>Human Screen</Text>
      <Image 
        source={{ uri: 'https://img.technews.tw/wp-content/uploads/2017/05/25114940/4203717138_581f815945_z.jpg' }} 
        style={styles.image} 
      />

      <TextInput
          maxLength={10}
          style={styles.input}
          onChangeText={(text) => setName(text)}
          value={name}
      />
      <Text>HumanName: {newName}</Text>
      <Button 
        title="Redux Change Name"
        onPress={() => dispatch(changeName(name))}
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
  input: {
    height: 50,
    width: 300,
    borderWidth: 5,
    borderColor: 'darkgray',
    backgroundColor: 'gray',
    fontSize: 28,
    textAlign: 'center',
    color: 'white'
  },
});
