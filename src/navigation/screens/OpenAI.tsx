import { Text } from '@react-navigation/elements';
import { StyleSheet, View, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';

type RouteParams = {
  OpenAI: {
    userMessage: string;
  };
};

type Props = {
  route: RouteProp<RouteParams, 'OpenAI'>;
};

export function OpenAI({ route }: Props) {
  const userMessage = route.params?.userMessage || '未收到訊息';

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>
        您的問題是：{userMessage}
      </Text>
      
      <Image 
        source={{
          uri: 'https://news.cnyes.com/_next/image?url=https%3A%2F%2Fcimg.cnyes.cool%2Fprod%2Fnews%2F5368876%2Fl%2F5c2d89bc2d6c3be8cfd99821b28543c0.jpg&w=3840&q=75'
        }}
        style={styles.image}
      />
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
  image: {
    width: 300,
    height: 200,
    resizeMode: 'contain'
  },
  questionText: {
    fontSize: 16,
    marginBottom: 10,
  }
});
