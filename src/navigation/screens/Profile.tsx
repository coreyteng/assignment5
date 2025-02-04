import { StyleSheet, View } from 'react-native';
import { Button, Text } from '@react-navigation/elements';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import * as StorageHelper from '../../helpers/StorageHelper';
import { ProfileData } from '../../types/profile';
import { genderDisplay } from '../../types/gender';

type Props = NativeStackScreenProps<ReactNavigation.RootParamList, 'Profile'>;

export function Profile({ route }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<ReactNavigation.RootParamList>>();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  React.useEffect(() => {
    const loadProfileData = async () => {
      const data = await StorageHelper.getProfileData();
      //console.log('Profile頁面載入的個人資料:', data);
      setProfileData(data);
    };
    loadProfileData();
    const unsubscribe = navigation.addListener('focus', () => {
      //console.log('Profile頁面獲得焦點，重新加載數據');
      loadProfileData();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      {profileData ? (
        <View style={styles.profileInfo}>
          <Text>姓名：{profileData.name}</Text>
          <Text>性別：{genderDisplay(profileData.gender)}</Text>
          <Text>生日：{profileData.birthday}</Text>
        </View>
      ) : (
        <Text>尚未填寫個人資料</Text>
      )}
      <Button 
        onPress={() => navigation.navigate('ProfileDetail', {
          initialData: profileData
        })}
      >
        {profileData ? '編輯個人資料' : '填寫個人資料'}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  profileInfo: {
    gap: 10,
  },
});
