import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import type { BookData } from './Book';

type BookDetailParams = {
  BookDetail: {
    passProps: BookData;
  };
};

type Props = {
  route: RouteProp<BookDetailParams, 'BookDetail'>;
};

export function BookDetail({ route }: Props) {
  const book = route.params.passProps;
  const { volumeInfo } = book;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Image 
          source={{ 
            uri: volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x193'
          }}
          style={styles.image}
        />
        
        <Text style={styles.title}>{volumeInfo.title}</Text>
        
        <Text style={styles.author}>
          作者：{volumeInfo.authors?.join(', ') || '未知作者'}
        </Text>
        
        <Text style={styles.date}>
          出版日期：{volumeInfo.publishedDate || '未知日期'}
        </Text>

        <Text style={styles.description}>
          {volumeInfo.description || '暫無描述'}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    padding: 16,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 300,
    marginVertical: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  author: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  date: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
  },
}); 