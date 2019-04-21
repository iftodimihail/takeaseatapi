import { Router } from 'express';
import response from '../concerns/response';
import repository from '../repositories/restaurant_types';
import transformer from '../transformers/filter_types';

export default (db) => {

  const api = new Router();

  /**
   * List all resources
   * @swagger
   * /api/restaurant-types:
   *   get:
   *     tags:
   *       - Users
   *     name: List restaurant_types
   *     summary: Lists all the restaurant_types
   *     security:
   *       - bearerAuth: []
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of restaurant_types objects
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   */
  api.get('/', async (req, res) => {
    try {
      const restaurant_types = await repository(db).index();
      return response(res).collection(restaurant_types, transformer);
    } catch (err) {
      return response(res).error(err);
    }
  });

  /**
   * Show an existing resource
   * @swagger
   * /api/restaurant_types/{id}:
   *   get:
   *     tags:
   *       - Users
   *     name: Show restaurant_types
   *     summary: Shows an existing restaurant_types
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
   *         description: A restaurant_types object
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   */
  api.get('/:id', async (req, res) => {
    try {
      const restaurant_types = await repository(db).show(req.params.id);
      return response(res).item(restaurant_types, transformer);
    } catch (err) {
      return response(res).error(err);
    }

  });

  return api;
}
