import express from 'express';
import WorkspacesController from '../../controllers/workspaces.controller';

/**
 * @swagger
 * tags:
 *  name: Workspaces
 *  description: CRUD operations for Workspaces
 */
const workspacesRouter = express.Router();

/**
 * @swagger
 * /workspaces/{workspaceId}:
 *  get:
 *    summary: Get a workspace by Id
 *    operationId: getWorkspaceById
 *    tags: [Workspaces]
 *    parameters:
 *    - name: workspaceId
 *      in: path
 *      description: The Id of the Workspace to fetch
 *      required: true
 *    responses:
 *      "200":
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Workspace'
 *      "401":
 *        $ref: '#/components/responses/Unauthorized'
 *      "403":
 *        $ref: '#/components/responses/Forbidden'
 *      "404":
 *        $ref: '#/components/responses/NotFound'
 */
workspacesRouter.get('/:workspaceId', WorkspacesController.getWorkspaceById);

/**
 * @swagger
 *  /workspaces:
 *    get:
 *      summary: Get the workspaces belonging to a user
 *      operationId: getWorkspacesByUserId
 *      tags: [Workspaces]
 *      parameters:
 *      - name: userId
 *        in: query
 *        description: If userId is not provided, will fetch all workspaces for the currently authorized user
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Workspace'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 */
workspacesRouter.get('/', WorkspacesController.getWorkspaceByUserId);

/**
 * @swagger
 * /workspaces:
 *  post:
 *    summary: Create a new workspace
 *    operationId: createNewWorkspace
 *    tags: [Workspaces]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - userId
 *            properties:
 *              name:
 *                type: string
 *              userId:
 *                type: string
 *    responses:
 *      "200":
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Workspace'
 *      "401":
 *        $ref: '#/components/responses/Unauthorized'
 *      "403":
 *        $ref: '#/components/responses/Forbidden'
 */
workspacesRouter.post('/', WorkspacesController.createWorkspace);

/**
 * @swagger
 * /workspaces/{workspaceId}:
 *  patch:
 *    summary: Update a workspace by workspaceId
 *    tags: [Workspaces]
 *    operationId: updateWorkspaceByWorkspaceId
 *    parameters:
 *    - in: path
 *      name: workspaceId
 *      required: true
 *      description: The id of the workspace to update
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *    responses:
 *      "200":
 *        description: Updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Workspace'
 *      "401":
 *        $ref: '#/components/responses/Unauthorized'
 *      "403":
 *        $ref: '#/components/responses/Forbidden'
 */
workspacesRouter.patch('/:workspaceId', WorkspacesController.updateWorkspace);

/**
 * @swagger
 * /workspaces/{workspaceId}:
 *  delete:
 *    summary: Delete a workspace by workspaceId
 *    tags: [Workspaces]
 *    operationId: deleteWorkspaceByWorkspaceId
 *    parameters:
 *    - in: path
 *      name: workspaceId
 *      required: true
 *      description: The id of the workspace to delete
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
workspacesRouter.delete('', WorkspacesController.deleteWorkspace);

export default workspacesRouter;
