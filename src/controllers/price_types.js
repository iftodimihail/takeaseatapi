import { Router } from 'express';
import response from '../concerns/response';
import repository from '../repositories/price_types';
import transformer from '../transformers/filter_types.js';

export default (db) => {

  const api = new Router();

  /**
   * List all resources
   * @swagger
   * /api/price-types:
   *   get:
   *     tags:
   *       - Filter type
   *     name: List priceTypes
   *     summary: Lists all the priceTypes
   *     security:
   *       - bearerAuth: []
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of priceTypes objects
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   */
  api.get('/', async (req, res) => {
    try {
      const priceTypess = await repository(db).index();
      return response(res).collection(priceTypess, transformer);
    } catch (err) {
      return response(res).error(err);
    }
  });

  /**
   * Show an existing resource
   * @swagger
   * /api/price-types/{id}:
   *   get:
   *     tags:
   *       - Filter type
   *     name: Show priceTypes
   *     summary: Shows an existing priceTypes
   *     security:
   *       - bearerAuth: []
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         schema:
   *           type: string
   *         required:
   *           - id
   *     responses:
   *       200:
   *         description: A priceTypes object
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   */
  api.get('/:id', async (req, res) => {
    try {
      const priceTypes = await repository(db).show(req.params.id);
      return response(res).item(priceTypes, transformer);
    } catch (err) {
      return response(res).error(err);
    }

  });

  return api;
}
