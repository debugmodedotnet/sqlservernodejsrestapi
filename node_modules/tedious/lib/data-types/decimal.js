"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _decimaln = _interopRequireDefault(require("./decimaln"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Decimal = {
  id: 0x37,
  type: 'DECIMAL',
  name: 'Decimal',
  declaration: function declaration(parameter) {
    return 'decimal(' + this.resolvePrecision(parameter) + ', ' + this.resolveScale(parameter) + ')';
  },
  resolvePrecision: function resolvePrecision(parameter) {
    if (parameter.precision != null) {
      return parameter.precision;
    } else if (parameter.value === null) {
      return 1;
    } else {
      return 18;
    }
  },
  resolveScale: function resolveScale(parameter) {
    if (parameter.scale != null) {
      return parameter.scale;
    } else {
      return 0;
    }
  },
  writeTypeInfo: function writeTypeInfo(buffer, parameter) {
    buffer.writeUInt8(_decimaln.default.id);

    if (parameter.precision <= 9) {
      buffer.writeUInt8(5);
    } else if (parameter.precision <= 19) {
      buffer.writeUInt8(9);
    } else if (parameter.precision <= 28) {
      buffer.writeUInt8(13);
    } else {
      buffer.writeUInt8(17);
    }

    buffer.writeUInt8(parameter.precision);
    buffer.writeUInt8(parameter.scale);
  },
  writeParameterData: function writeParameterData(buffer, parameter, options, cb) {
    if (parameter.value != null) {
      const sign = parameter.value < 0 ? 0 : 1;
      const value = Math.round(Math.abs(parameter.value * Math.pow(10, parameter.scale)));

      if (parameter.precision <= 9) {
        buffer.writeUInt8(5);
        buffer.writeUInt8(sign);
        buffer.writeUInt32LE(value);
      } else if (parameter.precision <= 19) {
        buffer.writeUInt8(9);
        buffer.writeUInt8(sign);
        buffer.writeUInt64LE(value);
      } else if (parameter.precision <= 28) {
        buffer.writeUInt8(13);
        buffer.writeUInt8(sign);
        buffer.writeUInt64LE(value);
        buffer.writeUInt32LE(0x00000000);
      } else {
        buffer.writeUInt8(17);
        buffer.writeUInt8(sign);
        buffer.writeUInt64LE(value);
        buffer.writeUInt32LE(0x00000000);
        buffer.writeUInt32LE(0x00000000);
      }
    } else {
      buffer.writeUInt8(0);
    }

    cb();
  },
  validate: function validate(value) {
    if (value == null) {
      return null;
    }

    value = parseFloat(value);

    if (isNaN(value)) {
      return new TypeError('Invalid number.');
    }

    return value;
  }
};
var _default = Decimal;
exports.default = _default;
module.exports = Decimal;