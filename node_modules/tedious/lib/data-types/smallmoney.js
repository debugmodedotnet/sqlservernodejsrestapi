"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moneyn = _interopRequireDefault(require("./moneyn"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SmallMoney = {
  id: 0x7A,
  type: 'MONEY4',
  name: 'SmallMoney',
  declaration: function declaration() {
    return 'smallmoney';
  },
  writeTypeInfo: function writeTypeInfo(buffer) {
    buffer.writeUInt8(_moneyn.default.id);
    buffer.writeUInt8(4);
  },
  writeParameterData: function writeParameterData(buffer, parameter, options, cb) {
    if (parameter.value != null) {
      buffer.writeUInt8(4);
      buffer.writeInt32LE(parameter.value * 10000);
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

    if (value < -214748.3648 || value > 214748.3647) {
      return new TypeError('Value must be between -214748.3648 and 214748.3647.');
    }

    return value;
  }
};
var _default = SmallMoney;
exports.default = _default;
module.exports = SmallMoney;