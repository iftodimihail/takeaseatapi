import { Router } from 'express';
import response from '../concerns/response';
import repository from '../repositories/place_types';
import transformer from '../transformers/filter_types';

export default (db) => {

  const api = new Router();

  /**
   * List all resources
   * @swagger
   * /api/place-types:
   *   get:
   *     tags:
   *       - Filter type
   *     name: List place_types
   *     summary: Lists all the place_types
   *     security:
   *       - bearerAuth: []
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of place_types objects
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   */
  api.get('/', async (req, res) => {
    try {
      const place_types = await repository(db).index();
      return response(res).collection(place_types, transformer);
    } catch (err) {
      return response(res).error(err);
    }
  });

  /**
   * Show an existing resource
   * @swagger
   * /api/place_types/{id}:
   *   get:
   *     tags:
   *       - Filter type
   *     name: Show place_types
   *     summary: Shows an existing place_types
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
   *         description: A place_types object
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   */
  api.get('/:id', async (req, res) => {
    try {
      const place_types = await repository(db).show(req.params.id);
      return response(res).item(place_types, transformer);
    } catch (err) {
      return response(res).error(err);
    }

  });

  return api;
}
