"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moneyn = _interopRequireDefault(require("./moneyn"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Money = {
  id: 0x3C,
  type: 'MONEY',
  name: 'Money',
  declaration: function declaration() {
    return 'money';
  },
  writeTypeInfo: function writeTypeInfo(buffer) {
    buffer.writeUInt8(_moneyn.default.id);
    buffer.writeUInt8(8);
  },
  writeParameterData: function writeParameterData(buffer, parameter, options, cb) {
    if (parameter.value != null) {
      buffer.writeUInt8(8);
      buffer.writeMoney(parameter.value * 10000);
    } else {
      buffer.writeUInt8(0);
    }

    cb();
  },
  validate: function validate(value) {
    if (value == null) {
      return null;
    }

    value = parseFloat(value);

    if (isNaN(value)) {
      return new TypeError('Invalid number.');
    }

    return value;
  }
};
var _default = Money;
exports.default = _default;
module.exports = Money;