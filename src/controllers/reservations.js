import { Router } from 'express';
import response from '../concerns/response';
import repository from '../repositories/reservations';
import validate from 'express-validation';
import validationRules from '../validation/reservations';
import transformer from '../transformers/reservations';
import nodemailer from 'nodemailer';
import QRCode from 'qrcode';
import schedule from 'node-schedule';

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "9ac93167c76550",
    pass: "fddc5c5f4567c4"
  }
});

export default (db) => {

  const api = new Router();

  /**
   * List all resources
   * @swagger
   * /api/reservations:
   *   get:
   *     tags:
   *       - Reservations
   *     name: List reservations
   *     summary: Lists all the reservations
   *     security:
   *       - bearerAuth: []
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of reservation objects
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   */
  api.get('/', async (req, res) => {
    try {
      const reservations = await repository(db).index();
      return response(res).collection(reservations, transformer);
    } catch (err) {
      return response(res).error(err);
    }
  });

  /**
   * Create a new resource
   * @swagger
   * /api/reservations:
   *   post:
   *     tags:
   *       - Reservations
   *     name: Create reservation
   *     summary: Creates a new reservation
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
   *             local_id:
   *               type: integer
   *         required:
   *           - local_id
   *     responses:
   *       200:
   *         description: A reservation object
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   */
  api.post('/', validate(validationRules.store), async (req, res) => {
    try {
      const reservation = (await repository(db).store(req.body)).ops;
      const date = new Date(2019, 4, 5, 17, 43, 0);

      const j = schedule.scheduleJob(date, function(){
        console.log('The world is going to end today.');
      });
      QRCode.toDataURL('I am a pony!', async function (err, url) {
        let info = await transporter.sendMail({
          from: '"Take-A-Seat" <reservations@takeaseat.com>', // sender address
          to: reservation[0].email, // list of receivers
          subject: "Hello ✔", // Subject line
          text: "Hello world?", // plain text body
          html: `<b>Hello world?</b><br /><img src=${url} />` // html body
        });
      });
      return response(res).item(reservation[0], transformer);
    } catch (err) {
      return response(res).error(err);
    }
  });

  /**
   * Show an existing resource
   * @swagger
   * /api/reservations/{id}:
   *   get:
   *     tags:
   *       - Reservations
   *     name: Show reservation
   *     summary: Shows an existing reservation
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
   *         description: A reservation object
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   */
  api.get('/:id', async (req, res) => {
    try {
      const reservation = await repository(db).show(req.params.id);
      return response(res).item(reservation, transformer);
    } catch (err) {
      return response(res).error(err);
    }

  });

  /**
   * Update an existing resource
   * @swagger
   * /api/reservations/{id}:
   *   put:
   *     tags:
   *       - Reservations
   *     name: Update reservation
   *     summary: Updates an existing reservation
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
   *         description: A reservation object
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   */
  api.put('/:id', validate(validationRules.update), async (req, res) => {
    try {
      const reservation = await repository(db).update(req.params.id, req.body);
      return response(res).item(reservation, transformer);
    } catch (err) {
      return response(res).error(err);
    }
  });

  /**
   * Destroy an existing resource
   * @swagger
   * /api/reservations/{id}:
   *   delete:
   *     tags:
   *       - Reservations
   *     name: Delete reservation
   *     summary: Deletes an existing reservation
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
   *         description: A reservation object
   *       401:
   *         description: Not authorized to access this resource
   */
  api.delete('/:id', async (req, res) => {
    try {
      const reservation = await repository(db).destroy(req.params.id);
      return response(res).item(reservation, transformer);
    } catch (err) {
      return response(res).error(err);
    }
  });

  return api;
}
