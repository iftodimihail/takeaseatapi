'use strict';

require('babel-polyfill');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongodb = require('mongodb');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _response = require('./concerns/response');

var _response2 = _interopRequireDefault(_response);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _errors = require('./concerns/errors');

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passport3 = require('./passport');

var _passport4 = _interopRequireDefault(_passport3);

var _swaggerJsdoc = require('swagger-jsdoc');

var _swaggerJsdoc2 = _interopRequireDefault(_swaggerJsdoc);

var _swaggerUiExpress = require('swagger-ui-express');

var _swaggerUiExpress2 = _interopRequireDefault(_swaggerUiExpress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require('dotenv').config();

var app = (0, _express2.default)();

app.use((0, _cors2.default)({
  exposedHeaders: _config2.default.corsHeaders
}));

app.use(_bodyParser2.default.json({
  limit: _config2.default.bodyLimit
}));

app.use(_bodyParser2.default.urlencoded({
  extended: false
}));

app.use(_passport2.default.initialize());

/**
 * If a connection to the MongoDB is successfull, the API will continue loading
 */
var dbClient = new _mongodb.MongoClient(process.env.MONGO_URI, { useNewUrlParser: true });
dbClient.connect(function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(err) {
    var db, swaggerOptions, swaggerSpec;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:

            /**
             * Initializes the database
             */
            db = dbClient.db(process.env.MONGO_DB);


            if (err) {
              console.error(err);
              process.exit(0);
            }

            /**
             * Configure & initialize swagger documentation
             */
            swaggerOptions = {
              swaggerDefinition: _config2.default.swaggerDefinition,
              apis: ['./src/controllers/*.js']
            };
            swaggerSpec = (0, _swaggerJsdoc2.default)(swaggerOptions);

            app.get('/swagger.json', function (req, res) {
              res.setHeader('Content-Type', 'application/json');
              res.send(swaggerSpec);
            });
            app.use('/api-docs', _swaggerUiExpress2.default.serve, _swaggerUiExpress2.default.setup(swaggerSpec));

            /**
             * Configure the passport logic
             */
            (0, _passport4.default)(db, _passport2.default);

            /**
             * API router
             */
            app.use('/api', (0, _routes2.default)(db));

            /**
             * If any request url does not start with /api, the response will be 404
             */
            app.use(function (req, res, next) {
              (0, _response2.default)(res).notFound('Not found');
            });

            /**
             * All the errors will be caught here
             */
            app.use(function (err, req, res, next) {
              if (err instanceof _expressValidation2.default.ValidationError) {
                return (0, _response2.default)(res).error((0, _errors.formatValidationErrors)(err.errors));
              }
              (0, _response2.default)(res).internalError('Internal server error');
            });

            /**
             * Starts server on the specified port
             */
            app.listen(process.env.PORT, function () {
              console.log('Started on port ' + process.env.PORT);
            });

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
//# sourceMappingURL=index.js.map