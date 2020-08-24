"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const NULL = (1 << 16) - 1;
const Binary = {
  id: 0xAD,
  type: 'BIGBinary',
  name: 'Binary',
  maximumLength: 8000,
  declaration: function declaration(parameter) {
    const value = parameter.value;
    var length;

    if (parameter.length) {
      length = parameter.length;
    } else if (value != null) {
      length = value.length || 1;
    } else if (value === null && !parameter.output) {
      length = 1;
    } else {
      length = this.maximumLength;
    }

    return 'binary(' + length + ')';
  },
  resolveLength: function resolveLength(parameter) {
    const value = parameter.value;

    if (value != null) {
      return value.length;
    } else {
      return this.maximumLength;
    }
  },
  writeTypeInfo: function writeTypeInfo(buffer, parameter) {
    buffer.writeUInt8(this.id);
    buffer.writeUInt16LE(parameter.length);
  },
  writeParameterData: function writeParameterData(buffer, parameter, _options, cb) {
    if (parameter.value != null) {
      buffer.writeUInt16LE(parameter.length);
      buffer.writeBuffer(parameter.value.slice(0, parameter.length !== undefined ? Math.min(parameter.length, this.maximumLength) : this.maximumLength));
    } else {
      buffer.writeUInt16LE(NULL);
    }

    cb();
  },
  validate: function validate(value) {
    if (value == null) {
      return null;
    }

    if (!Buffer.isBuffer(value)) {
      return new TypeError('Invalid buffer.');
    }

    return value;
  }
};
var _default = Binary;
exports.default = _default;
module.exports = Binary;