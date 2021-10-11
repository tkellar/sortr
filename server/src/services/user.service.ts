import mongoose from 'mongoose';
import UserModel, { IUser } from '../models/User.model';
import BaseCRUDService from './baseCRUD.service';

class UserService extends BaseCRUDService<IUser> {
  constructor(model: mongoose.Model<IUser>) {
    super(model);
  }

  async getUserByUsername(username: string) {
    return this.model.findOne({ username });
  }
}

const userService = new UserService(UserModel);

export default userService;
