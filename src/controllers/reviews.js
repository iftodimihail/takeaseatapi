import { Router } from 'express';
import response from '../concerns/response';
import repository from '../repositories/reviews';
import localRepository from '../repositories/localuri';
import validate from 'express-validation';
import validationRules from '../validation/reviews';
import transformer from '../transformers/reviews';

export default (db) => {

  const api = new Router();

  /**
   * List all resources
   * @swagger
   * /api/reviews:
   *   get:
   *     tags:
   *       - Users
   *     name: List reviews
   *     summary: Lists all the reviews
   *     security:
   *       - bearerAuth: []
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of reviews objects
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   */
  api.get('/', async (req, res) => {
    try {
      const reviews = await repository(db).index(req.query);
      return response(res).collection(reviews, transformer);
    } catch (err) {
      return response(res).error(err);
    }
  });

  /**
   * Create a new resource
   * @swagger
   * /api/reviews:
   *   post:
   *     tags:
   *       - Users
   *     name: Create reviews
   *     summary: Creates a new reviews
   *     security:
   *       - bearerAuth: []
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         in: body
   *         schema:
   *           type: object
   *           properties:
   *             name:
   *               type: string
   *             email:
   *               type: string
   *             password:
   *               type: string
   *               format: password
   *         required:
   *           - name
   *           - email
   *           - password
   *     responses:
   *       200:
   *         description: A reviews object
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   */
  api.post('/', validate(validationRules.store), async (req, res) => {
    try {
      const { body } = req;
      const reviews = (await repository(db).store(body)).ops;
      const local = await localRepository(db).updateOnReview(body.local_id, body);
      return response(res).item(reviews, transformer);
    } catch (err) {
      return response(res).error(err);
    }
  });

  /**
   * Show an existing resource
   * @swagger
   * /api/reviews/{id}:
   *   get:
   *     tags:
   *       - Users
   *     name: Show reviews
   *     summary: Shows an existing reviews
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
   *         description: A reviews object
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   */
  api.get('/:id', async (req, res) => {
    try {
      const reviews = await repository(db).show(req.params.id);
      return response(res).item(reviews, transformer);
    } catch (err) {
      return response(res).error(err);
    }

  });

  /**
   * Update an existing resource
   * @swagger
   * /api/reviews/{id}:
   *   put:
   *     tags:
   *       - Users
   *     name: Update reviews
   *     summary: Updates an existing reviews
   *     security:
   *       - bearerAuth: []
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         in: body
   *         schema:
   *           type: object
   *           properties:
   *             name:
   *               type: string
   *             email:
   *               type: string
   *         required:
   *           - name
   *           - email
   *       - name: id
   *         in: path
   *         schema:
   *           type: string
   *         required:
   *           - id
   *     responses:
   *       200:
   *         description: A reviews object
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   */
  api.put('/:id', validate(validationRules.update), async (req, res) => {
    try {
      const reviews = await repository(db).update(req.params.id, req.body);
      return response(res).item(reviews, transformer);
    } catch (err) {
      return response(res).error(err);
    }
  });

  /**
   * Destroy an existing resource
   * @swagger
   * /api/reviews/{id}:
   *   delete:
   *     tags:
   *       - Users
   *     name: Delete reviews
   *     summary: Deletes an existing reviews
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
   *         description: A reviews object
   *       401:
   *         description: Not authorized to access this resource
   */
  api.delete('/:id', async (req, res) => {
    try {
      const reviews = await repository(db).destroy(req.params.id);
      return response(res).item(reviews, transformer);
    } catch (err) {
      return response(res).error(err);
    }
  });

  return api;
}
