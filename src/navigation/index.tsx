import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderButton, Text } from '@react-navigation/elements';
import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Home } from './screens/Home';
import { OpenAI } from './screens/OpenAI';
import { DeepSeek } from './screens/DeepSeek';
import { Human } from './screens/Human';
import { Note } from './screens/Note';
import { NoteDetail } from './screens/NoteDetail';
import { NotFound } from './screens/NotFound';

const HomeTabs = createBottomTabNavigator({
  screens: {
    Home: {
      screen: Home,
      options: {
        title: 'AI',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="rocket" size={size} color={color} />
        ),
      },
    },
    Human: {
      screen: Human,
      options: {
        title: 'Human',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person" size={size} color={color} />
        ),
      },
    },
    Note: {
      screen: Note,
      options: {
        title: 'Note',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="document" size={size} color={color} />
        ),
      },
    },
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    HomeTabs: {
      screen: HomeTabs,
      options: {
        title: 'Home',
        headerShown: false,
      },
    },
    OpenAI: {
      screen: OpenAI,
      options: ({ navigation }) => ({
        presentation: 'modal',
        headerRight: () => (
          <HeaderButton onPress={navigation.goBack}>
            <Text>Close</Text>
          </HeaderButton>
        ),
      }),
    },
    DeepSeek: {
      screen: DeepSeek,
      options: ({ navigation }) => ({
        headerLeft: () => (
          <HeaderButton onPress={navigation.goBack}>
            <Text>返回</Text>
          </HeaderButton>
        ),
      }),
    },
    NoteDetail: {
      screen: NoteDetail,
      options: ({ navigation }) => ({
        headerLeft: () => (
          <HeaderButton onPress={navigation.goBack}>
            <Text>返回</Text>
          </HeaderButton>
        ),
      }),
    },
    NotFound: {
      screen: NotFound,
      options: {
        title: '404',
      },
      linking: {
        path: '*',
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type NoteDetailParams = {
  passProps: {
    id: string;
    note: string;
    date: string;
    image: string | { uri: string };
  };
};

export type NoteStackParamList = {
  NoteDetail: NoteDetailParams;
};
