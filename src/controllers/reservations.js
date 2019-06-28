import { Router } from 'express';
import response from '../concerns/response';
import repository from '../repositories/reservations';
import localRepository from '../repositories/localuri';
import validate from 'express-validation';
import validationRules from '../validation/reservations';
import transformer from '../transformers/reservations';
import { emailTemplate } from '../utils';
import QRCode from 'qrcode';
import cors from 'cors';
import schedule from 'node-schedule';
import moment from 'moment/moment';
import mailgunjs from 'mailgun-js';
import authenticate from '../concerns/authenticate';
import fs from 'fs';
import path from 'path';

const API_KEY = '9239dc1777c48e7e9f840aaa9303c951-7bce17e5-cffafc89';
const DOMAIN = 'sandbox446b2ebf666f450498e55c9bedcc3235.mailgun.org';
const mailgun = mailgunjs({apiKey: API_KEY, domain: DOMAIN});

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
  api.get('/', authenticate, async (req, res) => {
    try {
      if (req.query.localId) {
        if(req.query.noPending) {
          const placeReservations = await repository(db).showNotPendingReservations(req.query.localId);
          return response(res).collection(placeReservations, transformer);
        } else {
          const placeReservations = await repository(db).showPendingReservations(req.query.localId);
          return response(res).collection(placeReservations, transformer);
        }
      }

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
      const reservation = await repository(db).showPendingReservations(req.params.localId);
      return response(res).item(reservation, transformer);
    } catch (err) {
      return response(res).error(err);
    }
  });

  api.put('/change-reservation-status/:id', authenticate, validate(validationRules.update), async (req, res) => {
    try {
      const reservation = await repository(db).update(req.params.id, req.body);
      const reservationData = reservation.value;
      const place = (await localRepository(db).showById(reservationData.local_id));
      const date = moment().add(2, 's').toDate();

      const reservationStatus = req.body.status === 'confirmed' ? 'confirmată' : 'respinsă';

      await QRCode.toDataURL(`${process.env.APP_URL}/reservations/${reservationData._id}`, async (err, url) => {
        let base64Image = url.split(';base64,').pop();
          fs.writeFile(`./src/storage/${reservationData._id}.png`, base64Image, {encoding: 'base64'}, function (error) {
          console.log(error || 'File created');
        });
      });

      let filepath = path.join(__dirname, '..', 'storage' , `${reservationData._id}.png`);
      schedule.scheduleJob(date, function() {
        mailgun.messages().send({
          from: '"Take-A-Seat" <reservations@takeaseat.com>', // sender address
          to: reservationData.email, // list of receivers
          subject: `TakeASeat Rezervare ${place.name}`, // Subject line
          text: `${reservationData.last_name} hai in coace pe data de ${reservationData.date}`, // plain text body
          html: emailTemplate(reservationData, place, `cid:${reservationData._id}.png`, reservationStatus, req.body.message), // html body
          inline: filepath
        }, (error, body) => {
          if(error){
            console.log(error);
          } else {
            console.log(body);
          }
        });
      });
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
  api.put('/confirm-arrival/:id', authenticate, validate(validationRules.update), async (req, res) => {
    try {
      const reservation = await repository(db).update(req.params.id, req.body);
      const reservationData = reservation.value;
      const place = (await localRepository(db).showById(reservationData.local_id));
      const date = moment().add(5, 's').toDate();

      schedule.scheduleJob(date, function(){
        mailgun.messages().send({
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
