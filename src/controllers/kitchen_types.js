import { Router } from 'express';
import response from '../concerns/response';
import repository from '../repositories/kitchen_types';
import transformer from '../transformers/filter_types.js';

export default (db) => {

  const api = new Router();

  /**
   * List all resources
   * @swagger
   * /api/kitchenTypes:
   *   get:
   *     tags:
   *       - Users
   *     name: List kitchenTypess
   *     summary: Lists all the kitchenTypess
   *     security:
   *       - bearerAuth: []
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of kitchenTypes objects
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   */
  api.get('/', async (req, res) => {
    try {
      const kitchenTypess = await repository(db).index();
      return response(res).collection(kitchenTypess, transformer);
    } catch (err) {
      return response(res).error(err);
    }
  });

  /**
   * Show an existing resource
   * @swagger
   * /api/kitchenTypess/{id}:
   *   get:
   *     tags:
   *       - Users
   *     name: Show kitchenTypes
   *     summary: Shows an existing kitchenTypes
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
   *         description: A kitchenTypes object
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   */
  api.get('/:id', async (req, res) => {
    try {
      const kitchenTypes = await repository(db).show(req.params.id);
      return response(res).item(kitchenTypes, transformer);
    } catch (err) {
      return response(res).error(err);
    }

  });

  return api;
}
