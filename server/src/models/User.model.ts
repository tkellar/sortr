import mongoose, { Query, Document, Model, Schema } from 'mongoose';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type QueryHelperReturn = Query<any, Document<IUser>> & IUserQueryHelpers;

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IUserQueryHelpers {
  byId(id: number): QueryHelperReturn;
}

const userSchema = new Schema<IUser>({
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
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.query.byId = function (id: number): QueryHelperReturn {
  return this.find({ id });
};

const User = mongoose.model<IUser, Model<IUser, IUserQueryHelpers>>('User', userSchema);

export default User;
