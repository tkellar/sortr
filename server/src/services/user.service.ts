import UserModel, { IUser } from '../models/User.model';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';

class UserService {
  async getByUserId(id: string) {
    return await UserModel.findById(id);
  }

  async createUser(user: IUser) {
    return await UserModel.create(user);
  }

  async updateUser(id: string, update: Partial<IUser>) {
    const user = await this.getByUserId(id);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Unable to find user');
    }

    Object.assign(user, update);
    await user.save();

    return user;
  }

  async deleteUser(id: string) {
    const user = await this.getByUserId(id);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Unable to find user');
    }

    await user.remove();
  }
}

const userService = new UserService();

export default userService;
