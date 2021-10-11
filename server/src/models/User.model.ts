import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  createdDate: Date;
  updatedDate?: Date;
  isPasswordMatch: (password: string) => Promise<boolean>;
}

export interface UserModel extends mongoose.Model<IUser> {
  isValidEmailAndUsername: (username: string, email: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser, UserModel>({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: new Date(),
  },
  updatedDate: Date,
});

userSchema.statics.isValidEmailAndUsername = async function (username: string, email: string) {
  const userWithSameUsername = await this.findOne({ email });
  const userWithSameEmail = await this.findOne({ username });

  return !userWithSameUsername && !userWithSameEmail;
};

userSchema.methods.isPasswordMatch = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }

  next();
});

const User = mongoose.model<IUser, UserModel>('User', userSchema);

export default User;
