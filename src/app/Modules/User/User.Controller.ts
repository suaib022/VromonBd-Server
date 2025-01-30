import catchAsync from '../../Utils/catchAsync';
import { sendResponse } from '../../Utils/sendResponse';
import { UserServices } from './User.Service';
import httpStatus from 'http-status';

const createUser = catchAsync(async (req, res) => {
  const userData = req.body;

  const result = await UserServices.createUserIntoDB(userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

export const UserController = {
  createUser,
};
