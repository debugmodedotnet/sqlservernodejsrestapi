"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const NULL = (1 << 16) - 1;
const Char = {
  id: 0xAF,
  type: 'BIGCHAR',
  name: 'Char',
  maximumLength: 8000,
  declaration: function declaration(parameter) {
    // const value = parameter.value as null | string | { toString(): string };
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

    if (length < this.maximumLength) {
      return 'char(' + length + ')';
    } else {
      return 'char(' + this.maximumLength + ')';
    }
  },
  // ParameterData<any> is temporary solution. TODO: need to understand what type ParameterData<...> can be.
  resolveLength: function resolveLength(parameter) {
    const value = parameter.value; // Temporary solution. Remove 'any' later.

    if (parameter.length != null) {
      return parameter.length;
    } else if (value != null) {
      if (Buffer.isBuffer(value)) {
        return value.length || 1;
      } else {
        return value.toString().length || 1;
      }
    } else {
      return this.maximumLength;
    }
  },
  writeTypeInfo: function writeTypeInfo(buffer, parameter) {
    buffer.writeUInt8(this.id);
    buffer.writeUInt16LE(parameter.length);
    buffer.writeBuffer(Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00]));
  },
  writeParameterData: function writeParameterData(buffer, parameter, options, cb) {
    const value = parameter.value; // Temporary solution. Remove 'any' later.

    if (value != null) {
      buffer.writeUsVarbyte(value, 'ascii');
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
var _default = Char;
exports.default = _default;
module.exports = Char;