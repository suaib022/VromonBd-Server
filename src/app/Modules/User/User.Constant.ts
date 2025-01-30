export const USER_ROLE = {
  admin: 'admin',
  user: 'user',
};
export type TUserRole = keyof typeof USER_ROLE;
export const Role: TUserRole[] = ['admin', 'user'];

export const GENDER = {
  male: 'male',
  female: 'female',
  other: 'other',
};
export type TGender = keyof typeof GENDER;
export const Gender: TGender[] = ['male', 'female', 'other'];

export type TBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';
export const BloodGroup: TBloodGroup[] = [
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
];
