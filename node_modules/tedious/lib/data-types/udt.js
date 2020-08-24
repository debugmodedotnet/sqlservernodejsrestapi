"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const UDT = {
  id: 0xF0,
  type: 'UDTTYPE',
  name: 'UDT',

  declaration() {
    throw new Error('not implemented');
  },

  writeTypeInfo() {
    throw new Error('not implemented');
  },

  writeParameterData() {
    throw new Error('not implemented');
  },

  validate() {
    throw new Error('not implemented');
  }

};
var _default = UDT;
exports.default = _default;
module.exports = UDT;