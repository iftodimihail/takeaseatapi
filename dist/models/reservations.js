'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Gets the right collection for the reservations
 * @param db
 */
exports.default = function (db) {
  return db.collection('reservations');
};
//# sourceMappingURL=reservations.js.map