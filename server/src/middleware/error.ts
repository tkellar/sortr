import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';

export function errorConverter(
  err: Error & { statusCode?: number },
  _req: Request,
  _res: Response,
  next: NextFunction,
): void {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode ||
      (error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR);
    const message = error.message || (httpStatus[statusCode] as string);
    error = new ApiError(statusCode, message, false, err.stack);
  }

  next(error);
}

export function errorHandler(
  err: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction, // eslint-disable-line @typescript-eslint/no-unused-vars
): void {
  const { statusCode, message } = err;
  res.locals.errorMessage = message;

  const response = {
    code: statusCode,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  };

  res.status(statusCode).send(response);
}
