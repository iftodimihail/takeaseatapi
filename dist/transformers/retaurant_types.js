'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (data) {
  return {
    id: data._id,
    name: data.name,
    created_at: data.created_at ? data.created_at : '-',
    updated_at: data.updated_at ? data.updated_at : '-'
  };
};
//# sourceMappingURL=filter_types.js.map
