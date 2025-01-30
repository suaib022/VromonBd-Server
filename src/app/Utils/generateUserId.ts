import { TUser } from '../Modules/User/User.Interface';
import { User } from '../Modules/User/User.Model';

export const generateUserId = async (): Promise<string> => {
  const randomPart = Math.random().toString(36).substring(2, 10);
  const timestampPart = Date.now().toString(36);

  const mixedPart = (randomPart + timestampPart)
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');

  const existingUser: TUser | null = await User.findOne({ userId: mixedPart });

  return existingUser ? generateUserId() : mixedPart;
};
