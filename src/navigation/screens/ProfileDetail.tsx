import { useState } from 'react';
import { StyleSheet, View, TextInput, Platform, TouchableOpacity } from 'react-native';
import { Button, Text } from '@react-navigation/elements';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as StorageHelper from '../../helpers/StorageHelper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { GENDER_OPTIONS, genderDisplay } from '../../types/gender';

type ProfileStackParamList = {
  Profile: { profileData: any };
  ProfileDetail: { initialData?: any };
};

type Props = NativeStackScreenProps<ProfileStackParamList, 'ProfileDetail'>;

export function ProfileDetail({ route }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<ReactNavigation.RootParamList>>();
  
  // 設定預設日期為當前日期，並去除時間部分
  const getDefaultDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  };

  const [profileData, setProfileData] = useState({
    name: route.params?.initialData?.name || '',
    gender: route.params?.initialData?.gender || '',
    birthday: route.params?.initialData?.birthday ? 
      (() => {
        const date = new Date(route.params.initialData.birthday);
        date.setHours(0, 0, 0, 0);
        return date;
      })() : 
      getDefaultDate(),
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      // 確保選擇的日期不包含時間部分
      selectedDate.setHours(0, 0, 0, 0);
      setProfileData(prev => ({ ...prev, birthday: selectedDate }));
    }
  };

  const handleSave = async () => {
    try {
      // 驗證數據
      if (!profileData.name.trim()) {
        alert('請輸入姓名');
        return;
      }
      if (profileData.name.length > 255) {
        alert('姓名不能超過255個字');
        return;
      }
      if (!profileData.gender) {
        alert('請選擇性別');
        return;
      }
      if (!profileData.birthday) {
        alert('請選擇生日');
        return;
      }

      // 修改日期處理方式
      const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      const dateOnly = formatDate(profileData.birthday);
      const success = await StorageHelper.saveProfileData({
        ...profileData,
        birthday: dateOnly,
      });
      
      if (success) {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'HomeTabs',
              state: {
                routes: [
                  {
                    name: 'Profile',
                    params: {
                      profileData: {
                        ...profileData,
                        birthday: dateOnly,
                      }
                    }
                  }
                ]
              }
            }
          ]
        });
      } else {
        alert('保存失敗，請重試');
      }
    } catch (error) {
      alert('發生錯誤，請重試');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <Text>姓名：</Text>
        <TextInput
          style={styles.input}
          value={profileData.name}
          onChangeText={(text) => setProfileData(prev => ({ ...prev, name: text }))}
          placeholder="請輸入姓名"
          maxLength={255}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text>性別：</Text>
        <View style={styles.genderButtons}>
          <TouchableOpacity 
            style={[
              styles.genderButton, 
              profileData.gender === GENDER_OPTIONS.MALE && styles.genderButtonSelected
            ]}
            onPress={() => setProfileData(prev => ({ ...prev, gender: GENDER_OPTIONS.MALE }))}
          >
            <Text>{genderDisplay(GENDER_OPTIONS.MALE)}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.genderButton, 
              profileData.gender === GENDER_OPTIONS.FEMALE && styles.genderButtonSelected
            ]}
            onPress={() => setProfileData(prev => ({ ...prev, gender: GENDER_OPTIONS.FEMALE }))}
          >
            <Text>{genderDisplay(GENDER_OPTIONS.FEMALE)}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.genderButton, 
              profileData.gender === GENDER_OPTIONS.NON_BINARY && styles.genderButtonSelected
            ]}
            onPress={() => setProfileData(prev => ({ ...prev, gender: GENDER_OPTIONS.NON_BINARY }))}
          >
            <Text>{genderDisplay(GENDER_OPTIONS.NON_BINARY)}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text>生日：</Text>
        <TouchableOpacity 
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text>
            {profileData.birthday instanceof Date 
              ? profileData.birthday.toLocaleDateString('zh-TW', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })
              : '請選擇生日'}
          </Text>
        </TouchableOpacity>
        {Platform.OS === 'android' ? (
          showDatePicker && (
            <DateTimePicker
              value={profileData.birthday instanceof Date ? profileData.birthday : new Date()}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )
        ) : (
          <DateTimePicker
            value={profileData.birthday instanceof Date ? profileData.birthday : new Date()}
            mode="date"
            display="spinner"
            onChange={onDateChange}
            style={{ display: showDatePicker ? 'flex' : 'none' }}
          />
        )}
      </View>

      <Button onPress={handleSave}>
        儲存
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
  inputGroup: {
    gap: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  pickerIOS: {
    height: 50,
    width: '100%',
  },
  genderButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  genderButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  genderButtonSelected: {
    backgroundColor: '#e0e0e0',
    borderColor: '#666',
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
}); 