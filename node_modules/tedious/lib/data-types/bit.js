"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bitn = _interopRequireDefault(require("./bitn"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Bit = {
  id: 0x32,
  type: 'BIT',
  name: 'Bit',
  declaration: function declaration() {
    return 'bit';
  },
  writeTypeInfo: function writeTypeInfo(buffer) {
    buffer.writeUInt8(_bitn.default.id);
    buffer.writeUInt8(1);
  },
  writeParameterData: function writeParameterData(buffer, parameter, options, cb) {
    if (typeof parameter.value === 'undefined' || parameter.value === null) {
      buffer.writeUInt8(0);
    } else {
      buffer.writeUInt8(1);
      buffer.writeUInt8(parameter.value ? 1 : 0);
    }

    cb();
  },
  validate: function validate(value) {
    if (value == null) {
      return null;
    }

    if (value) {
      return true;
    } else {
      return false;
    }
  }
};
var _default = Bit;
exports.default = _default;
module.exports = Bit;