import { RequestHandler } from 'express';

function catchAsync(fn: RequestHandler): RequestHandler {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
}

export default catchAsync;
