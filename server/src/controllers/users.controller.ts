import catchAsync from '../utils/catchAsync';
import httpStatus from 'http-status';
import userService from '../services/user.service';
import ApiError from '../utils/ApiError';

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Unable to find user');
  }

  res.send(user);
});

const createUser = catchAsync(async (req, res) => {
  const user = await userService.create(req.body);

  res.status(httpStatus.CREATED).send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.update(req.params.userId, req.body);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Unable to update user -- User does not exist');
  }

  res.status(httpStatus.OK).send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.delete(req.params.userId);

  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
