import express from 'express';

const pageItemsRouter = express.Router();

export default pageItemsRouter;

/**
 * @swagger
 * tags:
 *  name: Page Items
 *  description: CRUD operations for Page Items
 */

/**
 * @swagger
 * paths:
 *  /pageItems:
 *    post:
 *      summary: Create a new Page Item
 *      tags:
 *        - Page Items
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/BoardViewModel'
 *                - $ref: '#/components/schemas/FileViewModel'
 *              discriminator:
 *                propertyName: pageItemType
 *                mapping:
 *                  1: '#/components/schemas/BoardViewModel'
 *                  2: '#/components/schemas/FileViewModel'
 */
