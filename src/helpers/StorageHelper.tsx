import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProfileData } from '../types/profile';

const PROFILE_KEY = 'profileData';

export const saveProfileData = async (data: ProfileData) => {
  try {
    await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('保存個人資料時發生錯誤:', error);
    return false;
  }
};

export const getProfileData = async () => {
  try {
    const data = await AsyncStorage.getItem(PROFILE_KEY);
    const parsedData = data ? JSON.parse(data) : null;
    return parsedData;
  } catch (error) {
    console.error('讀取個人資料時發生錯誤:', error);
    return null;
  }
};

export const clearProfileData = async () => {
  try {
    await AsyncStorage.removeItem(PROFILE_KEY);
    return true;
  } catch (error) {
    console.error('清除個人資料時發生錯誤:', error);
    return false;
  }
};
