"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const Text = {
  id: 0x23,
  type: 'TEXT',
  name: 'Text',
  hasTableName: true,
  declaration: function declaration() {
    return 'text';
  },
  resolveLength: function resolveLength(parameter) {
    const value = parameter.value; // Temporary solution. Remove 'any' later.

    if (value != null) {
      return value.length;
    } else {
      return -1;
    }
  },
  writeTypeInfo: function writeTypeInfo(buffer, parameter) {
    buffer.writeUInt8(this.id);
    buffer.writeInt32LE(parameter.length);
  },
  writeParameterData: function writeParameterData(buffer, parameter, options, cb) {
    buffer.writeBuffer(Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00]));

    if (parameter.value != null) {
      buffer.writeInt32LE(parameter.length);
      buffer.writeString(parameter.value.toString(), 'ascii');
    } else {
      buffer.writeInt32LE(parameter.length);
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
var _default = Text;
exports.default = _default;
module.exports = Text;