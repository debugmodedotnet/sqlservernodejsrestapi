"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const NULL = (1 << 16) - 1;
const NChar = {
  id: 0xEF,
  type: 'NCHAR',
  name: 'NChar',
  maximumLength: 4000,
  declaration: function declaration(parameter) {
    // const value = parameter.value as null | string | { toString(): string };
    const value = parameter.value; // Temporary solution. Remove 'any' later.

    let length;

    if (parameter.length) {
      length = parameter.length;
    } else if (parameter.value != null) {
      length = value.toString().length || 1;
    } else if (parameter.value === null && !parameter.output) {
      length = 1;
    } else {
      length = this.maximumLength;
    }

    if (length < this.maximumLength) {
      return 'nchar(' + length + ')';
    } else {
      return 'nchar(' + this.maximumLength + ')';
    }
  },
  resolveLength: function resolveLength(parameter) {
    // const value = parameter.value as null | string | { toString(): string };
    const value = parameter.value; // Temporary solution. Remove 'any' later.

    if (parameter.length != null) {
      return parameter.length;
    } else if (parameter.value != null) {
      if (Buffer.isBuffer(parameter.value)) {
        return parameter.value.length / 2 || 1;
      } else {
        return value.toString().length || 1;
      }
    } else {
      return this.maximumLength;
    }
  },
  writeTypeInfo: function writeTypeInfo(buffer, parameter) {
    buffer.writeUInt8(this.id);
    buffer.writeUInt16LE(parameter.length * 2);
    buffer.writeBuffer(Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00]));
  },
  writeParameterData: function writeParameterData(buffer, parameter, options, cb) {
    if (parameter.value != null) {
      buffer.writeUsVarbyte(parameter.value, 'ucs2');
    } else {
      buffer.writeUInt16LE(NULL);
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
var _default = NChar;
exports.default = _default;
module.exports = NChar;