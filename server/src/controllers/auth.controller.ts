import httpStatus from 'http-status';
import authService from '../services/auth.service';
import tokenService from '../services/token.service';
import userService from '../services/user.service';
import catchAsync from '../utils/catchAsync';

const register = catchAsync(async (req, res) => {
  const user = await userService.create(req.body);
  const tokens = await tokenService.generateAuthTokens(user);

  res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const user = await authService.loginWithUsernameAndPassword(username, password);
  const tokens = await tokenService.generateAuthTokens(user);

  res.status(httpStatus.OK).send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);

  res.send({ ...tokens });
});

export default {
  register,
  login,
  logout,
  refreshTokens,
};
