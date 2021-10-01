import { Response } from 'express';
import morgan from 'morgan';
import chalk from 'chalk';

morgan.token('errorMessage', (_req, res: Response) => res.locals.errorMessage || '');
morgan.token('method', (req) => {
  const { method } = req;
  const c = chalk.bold.underline;
  switch (method?.toUpperCase()) {
    case 'GET':
      return c.blue(method);
    case 'POST':
      return c.green(method);
    case 'PATCH':
      return c.cyan(method);
    case 'DELETE':
      return c.red(method);
    default:
      return c.blue(method);
  }
});
morgan.token('status', (_req, res) => {
  const { statusCode } = res;
  if (statusCode < 300) {
    return chalk.green(statusCode);
  } else if (statusCode < 400) {
    return chalk.blue(statusCode);
  }

  return chalk.red(statusCode);
});

const getIpFormat = () => (process.env.NODE_ENV === 'production' ? ':remote-addr - ' : '');

const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :errorMessage`;

export const logSuccessHandler = morgan(successResponseFormat, {
  skip: (req, res) => res.statusCode >= 400,
  stream: {
    write: (message) => console.log(message.trim()),
  },
});

export const logErrorHandler = morgan(errorResponseFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: {
    write: (message) => console.log(message.trim()),
  },
});
