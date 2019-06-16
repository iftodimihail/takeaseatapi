import { Router } from 'express';
import response from '../concerns/response';
import repository from '../repositories/reservations';
import localRepository from '../repositories/localuri';
import validate from 'express-validation';
import validationRules from '../validation/reservations';
import transformer from '../transformers/reservations';
import nodemailer from 'nodemailer';
import { emailTemplate } from '../utils';
import QRCode from 'qrcode';
import cors from 'cors';
import schedule from 'node-schedule';
import moment from 'moment/moment';
import authenticate from '../concerns/authenticate';

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
  api.post('/', cors(), validate(validationRules.store), async (req, res) => {
    try {
      const reservation = (await repository(db).store(req.body)).ops;

      const resObj =  reservation[0];
      const place = (await localRepository(db).showById(resObj.local_id));

      QRCode.toDataURL(`${process.env.APP_URL}/reservations/${resObj._id}`, async function (err, url) {
       await transporter.sendMail({
          from: '"Take-A-Seat" <reservations@takeaseat.com>', // sender address
          to: resObj.email, // list of receivers
          subject: `TakeASeat Rezervare ${place.name}`, // Subject line
          text: `${resObj.last_name} hai in coace pe data de ${resObj.date}`, // plain text body
          html: emailTemplate(resObj, place, url) // html body
        });
      });
      return response(res).item(resObj, transformer);
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
  api.get('/:localId', async (req, res) => {
    try {
      const reservation = await repository(db).showByLocalId(req.params.localId);
      return response(res).item(reservation, transformer);
    } catch (err) {
      return response(res).error(err);
    }
  });

  /**
   * Update an existing resource
   * @swagger
   * /api/reservations/confirm-arrival/{id}:
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
  api.put('/confirm-arrival/:id', validate(validationRules.update), async (req, res) => {
    try {
      const reservation = await repository(db).update(req.params.id, req.body);
      const reservationData = reservation.value;
      const place = (await localRepository(db).showById(reservationData.local_id));
      const date = moment().add(5, 's').toDate();

      schedule.scheduleJob(date, function(){
        console.log('The world is going to end today.');
        transporter.sendMail({
          from: '"Take-A-Seat" <reservations@takeaseat.com>', // sender address
          to: reservationData.email, // list of receivers
          subject: `TakeASeat Recenzie ${place.name}`, // Subject line
          text: `${reservationData.last_name} hai in coace pe data de ${reservationData.date}`, // plain text body
          html: `<p>Fa o recenzie <a href='${process.env.APP_URL}/reviews/${reservationData._id}'>aici</a></p>` // html body
        });
      });
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
