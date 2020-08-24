"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const Null = {
  id: 0x1F,
  type: 'NULL',
  name: 'Null',

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
var _default = Null;
exports.default = _default;
module.exports = Null;