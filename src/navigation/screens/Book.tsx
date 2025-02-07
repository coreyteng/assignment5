import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type BookData = {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publishedDate?: string;
    description?: string;
    imageLinks?: {
      thumbnail: string;
      smallThumbnail?: string;
    };
  };
};

type BookStackParamList = {
  BookDetail: {
    passProps: BookData;
  };
};

export function Book() {
  const navigation = useNavigation<NativeStackNavigationProp<BookStackParamList>>();
  const [books, setBooks] = useState<BookData[]>([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=maga+trump&startIndex=0&maxResults=40');
      const data = await response.json();
      setBooks(data.items || []);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const showBookDetail = (book: BookData) => {
    navigation.navigate('BookDetail', { passProps: book });
  };

  const renderBook = (book: BookData) => {
    const imageUrl = book.volumeInfo?.imageLinks?.thumbnail || 
                    book.volumeInfo?.imageLinks?.smallThumbnail;

    return (
      <TouchableOpacity onPress={() => showBookDetail(book)}>
        <View style={styles.bookItem}>
          <Image 
            source={{ uri: imageUrl }}
            style={styles.thumbnail}
          />
          <View style={styles.bookInfo}>
            <Text style={styles.title} numberOfLines={2}>
              {book.volumeInfo.title}
            </Text>
            <Text style={styles.author}>
              {book.volumeInfo.authors?.join(', ') || '未知作者'}
            </Text>
            <Text style={styles.date}>
              {book.volumeInfo.publishedDate || '未知日期'}
            </Text>
          </View>
        </View>
        <View style={styles.separator} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        renderItem={({ item }) => renderBook(item)}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bookItem: {
    flexDirection: 'row',
    padding: 15,
  },
  thumbnail: {
    width: 60,
    height: 90,
    marginRight: 15,
  },
  bookInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  author: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
  },
}); 