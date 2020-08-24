"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _events = require("events");

var _dataType = require("./data-type");

var _errors = require("./errors");

class Request extends _events.EventEmitter {
  constructor(sqlTextOrProcedure, callback) {
    super();
    this.sqlTextOrProcedure = void 0;
    this.parameters = void 0;
    this.parametersByName = void 0;
    this.originalParameters = void 0;
    this.preparing = void 0;
    this.canceled = void 0;
    this.paused = void 0;
    this.userCallback = void 0;
    this.handle = void 0;
    this.error = void 0;
    this.connection = void 0;
    this.timeout = void 0;
    this.rows = void 0;
    this.rst = void 0;
    this.rowCount = void 0;
    this.callback = void 0;
    this.sqlTextOrProcedure = sqlTextOrProcedure;
    this.parameters = [];
    this.parametersByName = {};
    this.originalParameters = [];
    this.preparing = false;
    this.handle = undefined;
    this.canceled = false;
    this.paused = false;
    this.error = undefined;
    this.connection = undefined;
    this.timeout = undefined;
    this.userCallback = callback;

    this.callback = function (err, rowCount, rows) {
      if (this.preparing) {
        this.preparing = false;

        if (err) {
          this.emit('error', err);
        } else {
          this.emit('prepared');
        }
      } else {
        this.userCallback(err, rowCount, rows);
        this.emit('requestCompleted');
      }
    };
  } // TODO: `type` must be a valid TDS value type


  addParameter(name, type, value, options) {
    if (options == null) {
      options = {};
    }

    const _options = options,
          _options$output = _options.output,
          output = _options$output === void 0 ? false : _options$output,
          length = _options.length,
          precision = _options.precision,
          scale = _options.scale;
    const parameter = {
      type: type,
      name: name,
      value: value,
      output: output,
      length: length,
      precision: precision,
      scale: scale
    };
    this.parameters.push(parameter);
    this.parametersByName[name] = parameter;
  } // TODO: `type` must be a valid TDS value type


  addOutputParameter(name, type, value, options) {
    if (options == null) {
      options = {};
    }

    options.output = true;
    this.addParameter(name, type, value, options);
  }

  makeParamsParameter(parameters) {
    let paramsParameter = '';

    for (let i = 0, len = parameters.length; i < len; i++) {
      const parameter = parameters[i];

      if (paramsParameter.length > 0) {
        paramsParameter += ', ';
      }

      paramsParameter += '@' + parameter.name + ' ';
      paramsParameter += parameter.type.declaration(parameter);

      if (parameter.output) {
        paramsParameter += ' OUTPUT';
      }
    }

    return paramsParameter;
  }

  transformIntoExecuteSqlRpc() {
    if (this.validateParameters()) {
      return;
    }

    this.originalParameters = this.parameters;
    this.parameters = [];
    this.addParameter('statement', _dataType.typeByName.NVarChar, this.sqlTextOrProcedure);

    if (this.originalParameters.length) {
      this.addParameter('params', _dataType.typeByName.NVarChar, this.makeParamsParameter(this.originalParameters));
    }

    for (let i = 0, len = this.originalParameters.length; i < len; i++) {
      const parameter = this.originalParameters[i];
      this.parameters.push(parameter);
    }

    this.sqlTextOrProcedure = 'sp_executesql';
  }

  transformIntoPrepareRpc() {
    this.originalParameters = this.parameters;
    this.parameters = [];
    this.addOutputParameter('handle', _dataType.typeByName.Int, undefined);
    this.addParameter('params', _dataType.typeByName.NVarChar, this.makeParamsParameter(this.originalParameters));
    this.addParameter('stmt', _dataType.typeByName.NVarChar, this.sqlTextOrProcedure);
    this.sqlTextOrProcedure = 'sp_prepare';
    this.preparing = true;
    this.on('returnValue', (name, value) => {
      if (name === 'handle') {
        this.handle = value;
      } else {
        this.error = (0, _errors.RequestError)(`Tedious > Unexpected output parameter ${name} from sp_prepare`);
      }
    });
  }

  transformIntoUnprepareRpc() {
    this.parameters = [];
    this.addParameter('handle', _dataType.typeByName.Int, this.handle);
    this.sqlTextOrProcedure = 'sp_unprepare';
  }

  transformIntoExecuteRpc(parameters) {
    this.parameters = [];
    this.addParameter('handle', _dataType.typeByName.Int, this.handle);

    for (let i = 0, len = this.originalParameters.length; i < len; i++) {
      const parameter = this.originalParameters[i];
      parameter.value = parameters[parameter.name];
      this.parameters.push(parameter);
    }

    if (this.validateParameters()) {
      return;
    }

    this.sqlTextOrProcedure = 'sp_execute';
  }

  validateParameters() {
    for (let i = 0, len = this.parameters.length; i < len; i++) {
      const parameter = this.parameters[i];
      const value = parameter.type.validate(parameter.value);

      if (value instanceof TypeError) {
        return this.error = new _errors.RequestError('Validation failed for parameter \'' + parameter.name + '\'. ' + value.message, 'EPARAM');
      }

      parameter.value = value;
    }

    return null;
  } // Temporarily suspends the flow of data from the database.
  // No more 'row' events will be emitted until resume() is called.


  pause() {
    if (this.paused) {
      return;
    }

    this.paused = true;

    if (this.connection) {
      this.connection.pauseRequest(this);
    }
  } // Resumes the flow of data from the database.


  resume() {
    if (!this.paused) {
      return;
    }

    this.paused = false;

    if (this.connection) {
      this.connection.resumeRequest(this);
    }
  }

  cancel() {
    if (this.canceled) {
      return;
    }

    this.canceled = true;
    this.emit('cancel');
  }

  setTimeout(timeout) {
    this.timeout = timeout;
  }

}

var _default = Request;
exports.default = _default;
module.exports = Request;