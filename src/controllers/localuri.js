import { Router } from 'express';
import response from '../concerns/response';
import repository from '../repositories/localuri';
import transformer from '../transformers/localuri.js';

export default (db) => {

  const api = new Router();

  /**
   * List all resources
   * @swagger
   * /api/localuri:
   *   get:
   *     tags:
   *       - Localuri
   *     name: List localuri
   *     summary: Lists all the localuri
   *     security:
   *       - bearerAuth: []
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of localuri objects
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   */
  api.get('/', async (req, res) => {
    try {
      const localuri = await repository(db).index();
      return response(res).collection(localuri, transformer);
    } catch (err) {
      return response(res).error(err);
    }
  });

  /**
   * Show an existing resource
   * @swagger
   * /api/localuri/{id}:
   *   get:
   *     tags:
   *       - Localuri
   *     name: Show localuri
   *     summary: Shows an existing localuri
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
   *         description: A localuri object
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   */
  api.get('/:id', async (req, res) => {
    try {
      const localuri = await repository(db).show(req.params.id);
      return response(res).item(localuri, transformer);
    } catch (err) {
      return response(res).error(err);
    }

  });

  return api;
}
