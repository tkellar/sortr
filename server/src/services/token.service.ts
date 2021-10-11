import moment, { Moment } from 'moment';
import jwt from 'jsonwebtoken';
import { TokenType } from '../utils/TokenType.enum';
import TokenModel from '../models/Token.model';
import { IUser } from '../models/User.model';
import { Document } from 'mongoose';

class TokenService {
  readonly jwtSecretKey: string;
  readonly jwtAccessExpiresMinutes: number;
  readonly jwtRefreshExpiresDays: number;

  constructor() {
    this.jwtSecretKey = process.env.JWT_SECRET ?? '';

    this.jwtAccessExpiresMinutes = process.env.JWT_ACCESS_EXPIRES_MINUTES
      ? +process.env.JWT_ACCESS_EXPIRES_MINUTES
      : 0;

    this.jwtRefreshExpiresDays = process.env.JWT_REFRESH_EXPIRES_DAYS
      ? +process.env.JWT_REFRESH_EXPIRES_DAYS
      : 0;
  }

  async generateAuthTokens(user: Document<IUser> & IUser) {
    const accessTokenExpires = moment().add(this.jwtAccessExpiresMinutes, 'minutes');
    const accessToken = this.generateToken(user.id, accessTokenExpires, TokenType.ACCESS);

    const refreshTokenExpires = moment().add(this.jwtRefreshExpiresDays, 'days');
    const refreshToken = this.generateToken(user.id, refreshTokenExpires, TokenType.REFRESH);
    await this.saveToken(refreshToken, user.id, refreshTokenExpires, TokenType.REFRESH);

    return {
      access: {
        token: accessToken,
        expires: accessTokenExpires.toDate(),
      },
      refresh: {
        token: refreshToken,
        expires: refreshTokenExpires.toDate(),
      },
    };
  }

  async verifyToken(token: string, type: TokenType) {
    const payload = jwt.verify(token, this.jwtSecretKey);
    const tokenDoc = await TokenModel.findOne({
      token,
      type,
      user: payload.sub,
      blacklisted: false,
    });

    if (!tokenDoc) {
      throw new Error('Token not found');
    }

    return tokenDoc;
  }

  private async saveToken(
    token: string,
    userId: string,
    expires: Moment,
    type: TokenType,
    blacklisted = false,
  ) {
    const tokenDoc = await TokenModel.create({
      token,
      user: userId,
      expires: expires.toDate(),
      type,
      blacklisted,
    });

    return tokenDoc;
  }

  private generateToken(userId: string, expires: Moment, type: TokenType) {
    const payload = {
      sub: userId,
      iat: moment().unix(),
      exp: expires.unix(),
      type,
    };

    return jwt.sign(payload, this.jwtSecretKey);
  }
}

const tokenService = new TokenService();

export default tokenService;
