"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const NULL = (1 << 16) - 1;
const MAX = (1 << 16) - 1;
const NVarChar = {
  id: 0xE7,
  type: 'NVARCHAR',
  name: 'NVarChar',
  maximumLength: 4000,
  declaration: function declaration(parameter) {
    const value = parameter.value; // Temporary solution. Remove 'any' later.

    let length;

    if (parameter.length) {
      length = parameter.length;
    } else if (value != null) {
      length = value.toString().length || 1;
    } else if (value === null && !parameter.output) {
      length = 1;
    } else {
      length = this.maximumLength;
    }

    if (length <= this.maximumLength) {
      return 'nvarchar(' + length + ')';
    } else {
      return 'nvarchar(max)';
    }
  },
  resolveLength: function resolveLength(parameter) {
    const value = parameter.value; // Temporary solution. Remove 'any' later.

    if (parameter.length != null) {
      return parameter.length;
    } else if (value != null) {
      if (Buffer.isBuffer(value)) {
        return value.length / 2 || 1;
      } else {
        return value.toString().length || 1;
      }
    } else {
      return this.maximumLength;
    }
  },
  writeTypeInfo: function writeTypeInfo(buffer, parameter) {
    buffer.writeUInt8(this.id);

    if (parameter.length <= this.maximumLength) {
      buffer.writeUInt16LE(parameter.length * 2);
    } else {
      buffer.writeUInt16LE(MAX);
    }

    buffer.writeBuffer(Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00]));
  },
  writeParameterData: function writeParameterData(buffer, parameter, options, cb) {
    if (parameter.value != null) {
      if (parameter.length <= this.maximumLength) {
        buffer.writeUsVarbyte(parameter.value, 'ucs2');
      } else {
        buffer.writePLPBody(parameter.value, 'ucs2');
      }
    } else if (parameter.length <= this.maximumLength) {
      buffer.writeUInt16LE(NULL);
    } else {
      buffer.writeUInt32LE(0xFFFFFFFF);
      buffer.writeUInt32LE(0xFFFFFFFF);
    }

    cb();
  },
  validate: function validate(value) {
    if (value == null) {
      return null;
    }

    if (typeof value !== 'string') {
      if (typeof value.toString !== 'function') {
        return TypeError('Invalid string.');
      }

      value = value.toString();
    }

    return value;
  }
};
var _default = NVarChar;
exports.default = _default;
module.exports = NVarChar;