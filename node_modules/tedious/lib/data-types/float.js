"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _floatn = _interopRequireDefault(require("./floatn"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Float = {
  id: 0x3E,
  type: 'FLT8',
  name: 'Float',
  declaration: function declaration() {
    return 'float';
  },
  writeTypeInfo: function writeTypeInfo(buffer) {
    buffer.writeUInt8(_floatn.default.id);
    buffer.writeUInt8(8);
  },
  writeParameterData: function writeParameterData(buffer, parameter, options, cb) {
    if (parameter.value != null) {
      buffer.writeUInt8(8);
      buffer.writeDoubleLE(parseFloat(parameter.value));
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
var _default = Float;
exports.default = _default;
module.exports = Float;