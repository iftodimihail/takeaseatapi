"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (data) {
  return {
    id: data._id,
    local_id: data.local_id,
    first_name: data.first_name,
    last_name: data.last_name,
    phone: data.phone,
    email: data.email,
    date: data.date,
    hour: data.hour,
    nr_persons: data.nr_persons
  };
};
//# sourceMappingURL=reservations.js.map