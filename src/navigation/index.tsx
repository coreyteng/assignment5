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
import { Profile } from './screens/Profile';
import { ProfileDetail } from './screens/ProfileDetail';
import { ProfileData } from '../types/profile';
import { Book } from './screens/Book';
import { BookDetail } from './screens/BookDetail';
import type { BookData } from './screens/Book';

//for redux
import { Provider } from 'react-redux';
import configureStore from '../redux/store';

import * as SplashScreen from 'expo-splash-screen';

const store = configureStore();

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
          <Ionicons name="accessibility" size={size} color={color} />
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
    Book: {
      screen: Book,
      options: {
        title: 'Book',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="book" size={size} color={color} />
        ),
      },
    },
    Profile: {
      screen: Profile,
      options: {
        title: 'Profile',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person" size={size} color={color} />
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
    Profile: {
      screen: Profile,
      linking: {
        path: ':user(@[a-zA-Z0-9-_]+)',
        parse: {
          user: (value) => value.replace(/^@/, ''),
        },
        stringify: {
          user: (value) => `@${value}`,
        },
      },
    },
    ProfileDetail: {
      screen: ProfileDetail,
      options: {
        title: '個人詳細資料',
        headerBackTitle: '返回',
      },
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
    BookDetail: {
      screen: BookDetail,
      options: ({ navigation }) => ({
        headerLeft: () => (
          <HeaderButton onPress={navigation.goBack}>
            <Text>返回</Text>
          </HeaderButton>
        ),
      }),
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

// 將 Navigation 包裹在 Provider 中
export function NavigationWithProvider() {
  return (
    <Provider store={store}>
      <Navigation 
        linking={{
          enabled: 'auto',
          prefixes: ['assignment5://'],
        }}
        onReady={() => {
          SplashScreen.hideAsync();
        }}
      />
    </Provider>
  );
}

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends StaticParamList<typeof RootStack> {
      Profile: { profileData?: ProfileData } | undefined;
      ProfileDetail: { initialData?: ProfileData } | undefined;
      BookDetail: { passProps: BookData };
    }
  }
};

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

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Profile" 
        component={Profile}
        options={{
          headerShown: true,
          title: '個人資料',
          headerLeft: () => null,
          gestureEnabled: false // 禁用手勢返回
        }}
      />
      <Stack.Screen 
        name="ProfileDetail" 
        component={ProfileDetail}
        options={{
          headerShown: true,
          title: '編輯個人資料',
          headerBackTitle: ' ',  // iOS 的返回文字
          headerLeft: () => null, // 移除返回按鈕
        }}
      />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export function AppNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileStack}
        options={{
          title: '個人資料',
          // 其他 Tab 設定...
        }}
      />
      {/* 其他 Tab 頁面... */}
    </Tab.Navigator>
  );
}

export type ProfileStackParamList = {
  Profile: { profileData?: ProfileData };
  ProfileDetail: { initialData?: ProfileData };
};

export type BookStackParamList = {
  BookDetail: {
    passProps: BookData;
  };
};
