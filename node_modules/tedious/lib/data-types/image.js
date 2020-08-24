"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const Image = {
  id: 0x22,
  type: 'IMAGE',
  name: 'Image',
  hasTableName: true,
  declaration: function declaration() {
    return 'image';
  },
  resolveLength: function resolveLength(parameter) {
    if (parameter.value != null) {
      const value = parameter.value; // TODO: Temporary solution. Replace 'any' more with specific type;

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
    if (parameter.value != null) {
      buffer.writeInt32LE(parameter.length);
      buffer.writeBuffer(parameter.value);
    } else {
      buffer.writeInt32LE(parameter.length);
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
var _default = Image;
exports.default = _default;
module.exports = Image;