import express from 'express';
import PageItemsController from '../../controllers/pageItems.controller';

/**
 * @swagger
 * tags:
 *  name: Page Items
 *  description: CRUD operations for Page Items
 */
const pageItemsRouter = express.Router();

/**
 * @swagger
 * /pageItems/{pageItemId}:
 *  get:
 *    summary: Get a page item by its id
 *    tags: [Page Items]
 *    operationId: getPageItemById
 */
pageItemsRouter.get('/:pageItemId', PageItemsController.getPageItemById);

/**
 * @swagger
 * /pageItems:
 *  get:
 *    summary: Get page items by parent page item id
 *    tags: [Page Items]
 *    operationId: getPageItemsByParentId
 */
pageItemsRouter.get('/', PageItemsController.getPageItemByParentId);

/**
 * @swagger
 * /pageItems:
 *  post:
 *    summary: Create a new Page Item
 *    tags: [Page Items]
 *    operationId: createPageItem
 */
pageItemsRouter.post('/', PageItemsController.createPageItem);

/**
 * @swagger
 * /pageItems/{pageItemId}:
 *  patch:
 *    summary: Update a page item
 *    tags: [Page Items]
 *    operationId: updatePageItem
 */
pageItemsRouter.patch(':pageItemId', PageItemsController.updatePageItem);

/**
 * @swagger
 * /pageItems/{pageItemId}:
 *  delete:
 *    summary: Delete a page item
 *    tags: [Page Items]
 *    operationId: deletePageItem
 */
pageItemsRouter.delete('/:pageItemId', PageItemsController.deletePageItem);

export default pageItemsRouter;
