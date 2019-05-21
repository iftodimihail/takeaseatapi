import { Router } from 'express';
import response from '../concerns/response';
import repository from '../repositories/localuri';
import transformer from '../transformers/localuri.js';
import cors from 'cors';

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
  api.get('/', cors(), async (req, res) => {
    try {
      if (req.query.id) {
        const local = await repository(db).showById(req.query.id);
        return response(res).item(local, transformer);
      } else {
        const localuri = await repository(db).index();
        return response(res).collection(localuri, transformer);
      }
    } catch (err) {
      return response(res).error(err);
    }
  });

  /**
   * Show an existing resource
   * @swagger
   * /api/localuri/{uniqueLink}:
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
   *       - name: uniqueLink
   *         in: path
   *         schema:
   *           type: string
   *         required:
   *           - uniqueLink
   *     responses:
   *       200:
   *         description: A localuri object
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   */
  api.get('/:uniqueLink', cors(), async (req, res) => {
    try {
      const localuri = await repository(db).show(req.params.uniqueLink);
      return response(res).item(localuri, transformer);
    } catch (err) {
      return response(res).error(err);
    }
  });

  return api;
}
