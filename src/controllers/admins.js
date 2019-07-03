import { Router } from 'express';
import response from '../concerns/response';
import repository from '../repositories/admin';
import validate from 'express-validation';
import validationRules from '../validation/admin';
import transformer from '../transformers/admin';

export default (db) => {

  const api = new Router();

  /**
   * List all resources
   * @swagger
   * /api/admins:
   *   get:
   *     tags:
   *       - Admins
   *     name: List admins
   *     summary: Lists all the admins
   *     security:
   *       - bearerAuth: []
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of admin objects
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   */
  api.get('/', async (req, res) => {
    try {
      const admins = await repository(db).index();
      return response(res).collection(admins, transformer);
    } catch (err) {
      return response(res).error(err);
    }
  });

  /**
   * Create a new resource
   * @swagger
   * /api/admins:
   *   post:
   *     tags:
   *       - Admins
   *     name: Create admin
   *     summary: Creates a new admin
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
   *             local_id:
   *               type: integer
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
   *         description: A admin object
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   */
  api.post('/', validate(validationRules.store), async (req, res) => {
    try {
      const admin = (await repository(db).store(req.body)).ops;
      return response(res).item(admin, transformer);
    } catch (err) {
      return response(res).error(err);
    }
  });

  /**
   * Show an existing resource
   * @swagger
   * /api/admins/{id}:
   *   get:
   *     tags:
   *       - Admins
   *     name: Show admin
   *     summary: Shows an existing admin
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
   *         description: A admin object
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   */
  api.get('/:id', async (req, res) => {
    try {
      const admin = await repository(db).show(req.params.id);
      return response(res).item(admin, transformer);
    } catch (err) {
      return response(res).error(err);
    }

  });

  /**
   * Update an existing resource
   * @swagger
   * /api/admins/{id}:
   *   put:
   *     tags:
   *       - Admins
   *     name: Update admin
   *     summary: Updates an existing admin
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
   *         description: A admin object
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   */
  api.put('/:id', validate(validationRules.update), async (req, res) => {
    try {
      const admin = await repository(db).update(req.params.id, req.body);
      return response(res).item(admin, transformer);
    } catch (err) {
      return response(res).error(err);
    }
  });

  /**
   * Destroy an existing resource
   * @swagger
   * /api/admins/{id}:
   *   delete:
   *     tags:
   *       - Admins
   *     name: Delete admin
   *     summary: Deletes an existing admin
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
   *         description: A admin object
   *       401:
   *         description: Not authorized to access this resource
   */
  api.delete('/:id', async (req, res) => {
    try {
      const admin = await repository(db).destroy(req.params.id);
      return response(res).item(admin, transformer);
    } catch (err) {
      return response(res).error(err);
    }
  });

  return api;
}
