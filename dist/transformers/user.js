'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (data) {
  return {
    id: data._id,
    name: data.name ? data.name : '-',
    email: data.email,
    created_at: data.created_at ? data.created_at : '-',
    updated_at: data.updated_at ? data.updated_at : '-'
  };
};
//# sourceMappingURL=user.js.map