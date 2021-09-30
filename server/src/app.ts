import express from 'express';
import ApiError from './utils/ApiError';
import httpStatus from 'http-status';
import { errorConverter, errorHandler } from './middleware/error';
import router from './routes/v1';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use API routes
app.use('/api/v1', router);

if (process.env.NODE_ENV === 'production') {
  // Serve static React assets from 'public' folder
  app.use('/', express.static('public'));
}

// Fallback to 404 error
app.use((_req, _res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not Found'));
});

// Send formatted errors back to the client
app.use(errorConverter);
app.use(errorHandler);

export default app;
