import express from 'express';
import AuthController from '../../controllers/auth.controller';

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Authentication
 */
const authRouter = express.Router();

/**
 * @swagger
 * /auth/register:
 *  post:
 *    summary: Register a new user
 *    tags: [Auth]
 *    operationId: registerUser
 */
authRouter.post('/register', AuthController.register);

/**
 * @swagger
 * /auth/login:
 *  post:
 *    summary: Log in using existing credentials
 *    tags: [Auth]
 *    operationId: logInUser
 */
authRouter.post('/login', AuthController.login);

/**
 * @swagger
 * /auth/logout:
 *  post:
 *    summary: Log out of the current session
 *    tags: [Auth]
 *    operationId: logOutUser
 */
authRouter.post('/logout', AuthController.logout);

/**
 * @swagger
 * /auth/refreshTokens:
 *  post:
 *    summary: Refresh a JWT access token
 *    tags: [Auth]
 *    operationId: refreshTokens
 */
authRouter.post('/refreshTokens', AuthController.refreshTokens);

export default authRouter;
