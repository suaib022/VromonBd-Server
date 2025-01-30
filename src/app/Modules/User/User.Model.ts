import { model, Schema, Types } from 'mongoose';
import { TUser, TUserName, UserModel } from './User.Interface';
import { BloodGroup, Gender, Role } from './User.Constant';

const UsersFullNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required!'],
    trim: true,
  },
  middleName: {
    type: String,
    trim: true,
    required: false,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required!'],
  },
});

const UserSchema = new Schema<TUser>(
  {
    userId: {
      type: String,
      required: [true, 'User ID is required'],
      unique: true,
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: [true, 'This username is already taken!'],
    },
    name: {
      type: UsersFullNameSchema,
      required: [true, 'Name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: Gender,
        message: `Gender must be one of ${Gender}`,
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: {
      type: String,
      required: [true, 'Date of Birth is required'],
    },
    email: {
      type: String,
      unique: false,
      default: null,
    },
    contactNo: {
      type: String,
      // unique: [true, 'Contact number already in use!'],
      // unique: false,
      // sparse: true,
      // default: null,
      unique: false,
      default: null,
    },
    bloodGroup: {
      type: String,
      enum: {
        values: BloodGroup,
        message: `BloodGroup must be one of ${BloodGroup}`,
      },
    },
    address: {
      type: String,
    },
    coverPhoto: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    followers: {
      type: [Types.ObjectId],
      ref: 'User',
      default: [],
    },
    following: {
      type: [Types.ObjectId],
      ref: 'User',
      default: [],
    },
    blockedUsers: {
      type: [Types.ObjectId],
      ref: 'User',
      default: [],
    },
    blockedFrom: {
      type: [Types.ObjectId],
      ref: 'User',
      default: [],
    },
    password: {
      type: String,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: {
        values: Role,
        message: `Role must be one of ${Role}`,
      },
      default: 'user',
    },
    isRestricted: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isDeactivated: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

UserSchema.virtual('fullname').get(function () {
  return (
    this?.name?.firstName +
    '' +
    this?.name?.middleName +
    '' +
    this?.name?.lastName
  );
});

//checking if user is already exist!
UserSchema.statics.doesUserExist = async function (id: string) {
  const existingUser = await User.findOne({ id });
  return existingUser;
};

export const User = model<TUser, UserModel>('User', UserSchema);
