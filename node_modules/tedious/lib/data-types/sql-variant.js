"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const Variant = {
  id: 0x62,
  type: 'SSVARIANTTYPE',
  name: 'Variant',
  declaration: function declaration() {
    return 'sql_variant';
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
var _default = Variant;
exports.default = _default;
module.exports = Variant;