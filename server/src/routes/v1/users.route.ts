import express from 'express';
import UsersController from '../../controllers/users.controller';

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: CRUD operations for Users
 */
const usersRouter = express.Router();

/**
 * @swagger
 * /users/{userId}:
 *  get:
 *    summary: Get a user by UserId
 *    operationId: getUserById
 *    tags: [Users]
 *    parameters:
 *    - name: userId
 *      in: path
 *      description: Id of the User to fetch
 *      required: true
 *    responses:
 *      "200":
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      "401":
 *        $ref: '#/components/responses/Unauthorized'
 *      "403":
 *        $ref: '#/components/responses/Forbidden'
 *      "404":
 *        $ref: '#/components/responses/NotFound'
 */
usersRouter.get('/:userId', UsersController.getUser);

/**
 * @swagger
 * /users:
 *  post:
 *    summary: Create a new user
 *    operationId: createUser
 *    tags: [Users]
 *    parameters:
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - firstName
 *              - lastName
 *              - email
 *              - password
 *            properties:
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *              email:
 *                type: string
 *                format: email
 *                description: Must be unique
 *              password:
 *                type: string
 *            example:
 *              firstName: John
 *              lastName: Doe
 *              email: john.doe@example.com
 *              password: sRongPa55word!!
 *    responses:
 *      "201":
 *        description: Created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      "400":
 *        $ref: '#/components/responses/DuplicateEmail'
 *      "401":
 *        $ref: '#/components/responses/Unauthorized'
 *      "403":
 *        $ref: '#/components/responses/Forbidden'
 */
usersRouter.post('/', UsersController.createUser);

/**
 * @swagger
 * /users/{userId}:
 *  patch:
 *    summary: Update a user by userId
 *    tags: [Users]
 *    operationId: updateUserByUserId
 *    parameters:
 *    - in: path
 *      name: userId
 *      required: true
 *      description: The id of the user to update
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *    responses:
 *      "200":
 *        description: Updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      "401":
 *        $ref: '#/components/responses/Unauthorized'
 *      "403":
 *        $ref: '#/components/responses/Forbidden'
 *      "404":
 *        $ref: '#/components/responses/NotFound'
 */
usersRouter.patch('/:userId', UsersController.updateUser);

/**
 * @swagger
 * /users/{userId}:
 *  delete:
 *    summary: Delete a user by userId
 *    tags: [Users]
 *    operationId: deleteUserByUserId
 *    parameters:
 *    - in: path
 *      name: userId
 *      required: true
 *      description: The id of the user to delete
 *    responses:
 *      "204":
 *        description: Deleted
 *      "401":
 *        $ref: '#/components/responses/Unauthorized'
 *      "403":
 *        $ref: '#/components/responses/Forbidden'
 *      "404":
 *        $ref: '#/components/responses/NotFound'
 */
usersRouter.delete('/:userId', UsersController.deleteUser);

export default usersRouter;
