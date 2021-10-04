import ApiError from './ApiError';
import httpStatus from 'http-status';

class NotImplementedError extends ApiError {
  constructor() {
    super(httpStatus.NOT_IMPLEMENTED, 'Not implemented');
  }
}

export default NotImplementedError;
