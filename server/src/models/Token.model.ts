import mongoose, { Document, PopulatedDoc } from 'mongoose';
import { TokenType } from '../utils/TokenType.enum';
import { IUser } from './User.model';

export interface IToken {
  token: string;
  user: PopulatedDoc<IUser & Document>;
  type: TokenType;
  expires: Date;
  blacklisted: boolean;
}

const tokenSchema = new mongoose.Schema<IToken>({
  token: {
    type: String,
    required: true,
    index: true,
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: [TokenType.REFRESH, TokenType.ACCESS],
    required: true,
  },
  expires: {
    type: Date,
    required: true,
  },
  blacklisted: {
    type: Boolean,
    default: false,
  },
});

const TokenModel = mongoose.model<IToken>('Token', tokenSchema);

export default TokenModel;
