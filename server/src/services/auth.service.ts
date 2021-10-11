import httpStatus from 'http-status';
import TokenModel from '../models/Token.model';
import ApiError from '../utils/ApiError';
import { TokenType } from '../utils/TokenType.enum';
import tokenService from './token.service';
import userService from './user.service';

class AuthService {
  async loginWithUsernameAndPassword(username: string, password: string) {
    const user = await userService.getUserByUsername(username);
    if (!user || !(await user.isPasswordMatch(password))) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid username or password');
    }

    return user;
  }

  async logout(refreshToken: string) {
    const refreshTokenDoc = await TokenModel.findOne({
      token: refreshToken,
      type: TokenType.REFRESH,
      blacklisted: false,
    });

    if (!refreshTokenDoc) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Not Found');
    }

    await refreshTokenDoc.remove();
  }

  async refreshAuth(refreshToken: string) {
    try {
      const refreshTokenDoc = await tokenService.verifyToken(refreshToken, TokenType.REFRESH);
      const user = await userService.getById(refreshTokenDoc.user);
      if (!user) {
        throw new Error();
      }

      await refreshTokenDoc.remove();
      return tokenService.generateAuthTokens(user);
    } catch (err) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
    }
  }
}

const authService = new AuthService();

export default authService;
