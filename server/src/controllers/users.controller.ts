import catchAsync from '../utils/catchAsync';
import httpStatus from 'http-status';
import userService from '../services/user.service';
import ApiError from '../utils/ApiError';

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getByUserId(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Unable to find user');
  }

  res.send(user);
});

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);

  res.status(httpStatus.CREATED).send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUser(req.params.userId, req.body);
  res.status(httpStatus.OK).send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUser(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
