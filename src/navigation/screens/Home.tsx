import React, { useState } from 'react';
import { Button, Text } from '@react-navigation/elements';
import { StyleSheet, View, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type HomeStackParamList = {
  OpenAI: {
    userMessage: string;
  };
  DeepSeek: {
    userMessage: string;
  };
};

export function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const [userInput, setUserInput] = useState('');

  return (
    <View style={styles.container}> 
      <TextInput
        style={styles.input}
        placeholder="我可以為你做什麼？"
        value={userInput}
        onChangeText={setUserInput}
        multiline={true}
        numberOfLines={4}
        textAlignVertical="top"
      />
      
      <Text style={styles.largeText}>選擇人工智慧</Text>
      
      <Button 
        onPress={() => navigation.navigate('OpenAI', { userMessage: userInput })}
      >
        Go to OpenAI
      </Button>
      
      <Button 
        onPress={() => navigation.navigate('DeepSeek', { userMessage: userInput })}
      >
        Go to DeepSeek
      </Button>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  largeText: {
    fontSize: 25,
  },
  input: {
    width: '80%',
    minHeight: 40,
    maxHeight: 120,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 0,
    marginBottom: 20,
  },
});
