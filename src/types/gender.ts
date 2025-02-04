export const GENDER_OPTIONS = {
  MALE: 'male',
  FEMALE: 'female',
  NON_BINARY: 'non_binary',
} as const;

export const genderDisplay = (gender: string): string => {
  switch (gender) {
    case GENDER_OPTIONS.MALE:
      return '男性';
    case GENDER_OPTIONS.FEMALE:
      return '女性';
    case GENDER_OPTIONS.NON_BINARY:
      return '非傳統性別';
    default:
      return '';
  }
}; 