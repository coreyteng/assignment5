import { Text } from '@react-navigation/elements';
import { StyleSheet, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';

type RouteParams = {
  DeepSeek: {
    userMessage: string;
  };
};

type Props = {
  route: RouteProp<RouteParams, 'DeepSeek'>;
};

export function DeepSeek({ route }: Props) {
  const userMessage = route.params?.userMessage || '未收到訊息';
  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>
        您的問題是：{userMessage}
      </Text>
      <Text style={styles.title}>DeepSeek</Text>

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
  title: {
    fontSize: 40,
    color: 'blue',
    fontWeight: 'bold',
  },
  questionText: {
    fontSize: 16,
    marginBottom: 10,
  }
});
