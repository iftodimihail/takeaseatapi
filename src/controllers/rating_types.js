import { Router } from 'express';
import response from '../concerns/response';
import repository from '../repositories/rating_types';
import transformer from '../transformers/filter_types.js';

export default (db) => {

  const api = new Router();

  /**
   * List all resources
   * @swagger
   * /api/rating-types:
   *   get:
   *     tags:
   *       - Price types
   *     name: List ratingTypes
   *     summary: Lists all the ratingTypes
   *     security:
   *       - bearerAuth: []
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of ratingTypes objects
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   */
  api.get('/', async (req, res) => {
    try {
      const ratingTypess = await repository(db).index();
      return response(res).collection(ratingTypess, transformer);
    } catch (err) {
      return response(res).error(err);
    }
  });

  /**
   * Show an existing resource
   * @swagger
   * /api/rating-types/{id}:
   *   get:
   *     tags:
   *       - Price types
   *     name: Show ratingTypes
   *     summary: Shows an existing ratingTypes
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
   *         description: A ratingTypes object
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   */
  api.get('/:id', async (req, res) => {
    try {
      const ratingTypes = await repository(db).show(req.params.id);
      return response(res).item(ratingTypes, transformer);
    } catch (err) {
      return response(res).error(err);
    }

  });

  return api;
}
