import express from 'express';
import validateRequest from '../../Middlewares/validateRequest';
import { UserValidations } from './User.Validation';
import { UserController } from './User.Controller';

const router = express.Router();

router.post(
  '/create-user',
  // auth('admin'),
  // upload.single('file'),
  // (req: Request, res: Response, next: NextFunction) => {
  //   req.body = JSON.parse(req.body.data);
  //   next();
  // },
  validateRequest(UserValidations.CreateUserValidationSchema),
  UserController.createUser,
);

export const UserRoute = router;
