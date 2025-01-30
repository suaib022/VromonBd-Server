import AppError from '../../errors/AppError';
import { generateUserId } from '../../Utils/generateUserId';
import { TUser } from './User.Interface';
import { User } from './User.Model';
import httpStatus from 'http-status';

const createUserIntoDB = async (userData: TUser) => {
  const doesUserExistByEmailOrContact = async (userData: {
    email?: string;
    contactNo?: string;
  }) => {
    const query: any = {};

    if (userData.email) query.email = userData.email;
    if (userData.contactNo) query.contactNo = userData.contactNo;

    if (Object.keys(query).length === 0) {
      return null; // No valid search criteria provided
    }

    return await User.findOne({
      $or: Object.entries(query).map(([key, value]) => ({ [key]: value })),
    });
  };

  // Checking for user existence with specific error messages
  const existingUser = await doesUserExistByEmailOrContact({
    email: userData.email,
    contactNo: userData.contactNo,
  });

  //   console.log({ userData });

  if (existingUser) {
    let errorMessage = 'Email or Contact No already in use';

    if (
      existingUser.email === userData.email &&
      existingUser.contactNo === userData.contactNo
    ) {
      errorMessage = 'Both Email and Contact No are already in use';
    } else if (existingUser.email === userData.email) {
      errorMessage = 'Email is already in use';
    } else if (existingUser.contactNo === userData.contactNo) {
      errorMessage = 'Contact No is already in use';
    }

    throw new AppError(httpStatus.NOT_ACCEPTABLE, errorMessage);
  }

  const generatedUserId: string = await generateUserId();
  const newUserData = { ...userData, userId: generatedUserId };

  //   console.log({ generateUserId });
  const result = await User.create(newUserData);

  return result;
};

export const UserServices = {
  createUserIntoDB,
};
