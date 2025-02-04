import { ProfileData } from './profile';

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Profile: { profileData?: ProfileData } | undefined;
      ProfileDetail: { initialData?: ProfileData } | undefined;
      [key: string]: object | undefined;
    }
  }
} 