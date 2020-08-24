"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeByName = exports.TYPE = void 0;

var _null = _interopRequireDefault(require("./data-types/null"));

var _tinyint = _interopRequireDefault(require("./data-types/tinyint"));

var _bit = _interopRequireDefault(require("./data-types/bit"));

var _smallint = _interopRequireDefault(require("./data-types/smallint"));

var _int = _interopRequireDefault(require("./data-types/int"));

var _smalldatetime = _interopRequireDefault(require("./data-types/smalldatetime"));

var _real = _interopRequireDefault(require("./data-types/real"));

var _money = _interopRequireDefault(require("./data-types/money"));

var _datetime = _interopRequireDefault(require("./data-types/datetime"));

var _float = _interopRequireDefault(require("./data-types/float"));

var _decimal = _interopRequireDefault(require("./data-types/decimal"));

var _numeric = _interopRequireDefault(require("./data-types/numeric"));

var _smallmoney = _interopRequireDefault(require("./data-types/smallmoney"));

var _bigint = _interopRequireDefault(require("./data-types/bigint"));

var _image = _interopRequireDefault(require("./data-types/image"));

var _text = _interopRequireDefault(require("./data-types/text"));

var _uniqueidentifier = _interopRequireDefault(require("./data-types/uniqueidentifier"));

var _intn = _interopRequireDefault(require("./data-types/intn"));

var _ntext = _interopRequireDefault(require("./data-types/ntext"));

var _bitn = _interopRequireDefault(require("./data-types/bitn"));

var _decimaln = _interopRequireDefault(require("./data-types/decimaln"));

var _numericn = _interopRequireDefault(require("./data-types/numericn"));

var _floatn = _interopRequireDefault(require("./data-types/floatn"));

var _moneyn = _interopRequireDefault(require("./data-types/moneyn"));

var _datetimen = _interopRequireDefault(require("./data-types/datetimen"));

var _varbinary = _interopRequireDefault(require("./data-types/varbinary"));

var _varchar = _interopRequireDefault(require("./data-types/varchar"));

var _binary = _interopRequireDefault(require("./data-types/binary"));

var _char = _interopRequireDefault(require("./data-types/char"));

var _nvarchar = _interopRequireDefault(require("./data-types/nvarchar"));

var _nchar = _interopRequireDefault(require("./data-types/nchar"));

var _xml = _interopRequireDefault(require("./data-types/xml"));

var _time = _interopRequireDefault(require("./data-types/time"));

var _date = _interopRequireDefault(require("./data-types/date"));

var _datetime2 = _interopRequireDefault(require("./data-types/datetime2"));

var _datetimeoffset = _interopRequireDefault(require("./data-types/datetimeoffset"));

var _udt = _interopRequireDefault(require("./data-types/udt"));

var _tvp = _interopRequireDefault(require("./data-types/tvp"));

var _sqlVariant = _interopRequireDefault(require("./data-types/sql-variant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TYPE = {
  [_null.default.id]: _null.default,
  [_tinyint.default.id]: _tinyint.default,
  [_bit.default.id]: _bit.default,
  [_smallint.default.id]: _smallint.default,
  [_int.default.id]: _int.default,
  [_smalldatetime.default.id]: _smalldatetime.default,
  [_real.default.id]: _real.default,
  [_money.default.id]: _money.default,
  [_datetime.default.id]: _datetime.default,
  [_float.default.id]: _float.default,
  [_decimal.default.id]: _decimal.default,
  [_numeric.default.id]: _numeric.default,
  [_smallmoney.default.id]: _smallmoney.default,
  [_bigint.default.id]: _bigint.default,
  [_image.default.id]: _image.default,
  [_text.default.id]: _text.default,
  [_uniqueidentifier.default.id]: _uniqueidentifier.default,
  [_intn.default.id]: _intn.default,
  [_ntext.default.id]: _ntext.default,
  [_bitn.default.id]: _bitn.default,
  [_decimaln.default.id]: _decimaln.default,
  [_numericn.default.id]: _numericn.default,
  [_floatn.default.id]: _floatn.default,
  [_moneyn.default.id]: _moneyn.default,
  [_datetimen.default.id]: _datetimen.default,
  [_varbinary.default.id]: _varbinary.default,
  [_varchar.default.id]: _varchar.default,
  [_binary.default.id]: _binary.default,
  [_char.default.id]: _char.default,
  [_nvarchar.default.id]: _nvarchar.default,
  [_nchar.default.id]: _nchar.default,
  [_xml.default.id]: _xml.default,
  [_time.default.id]: _time.default,
  [_date.default.id]: _date.default,
  [_datetime2.default.id]: _datetime2.default,
  [_datetimeoffset.default.id]: _datetimeoffset.default,
  [_udt.default.id]: _udt.default,
  [_tvp.default.id]: _tvp.default,
  [_sqlVariant.default.id]: _sqlVariant.default
};
exports.TYPE = TYPE;
const typeByName = {
  TinyInt: _tinyint.default,
  Bit: _bit.default,
  SmallInt: _smallint.default,
  Int: _int.default,
  SmallDateTime: _smalldatetime.default,
  Real: _real.default,
  Money: _money.default,
  DateTime: _datetime.default,
  Float: _float.default,
  Decimal: _decimal.default,
  Numeric: _numeric.default,
  SmallMoney: _smallmoney.default,
  BigInt: _bigint.default,
  Image: _image.default,
  Text: _text.default,
  UniqueIdentifier: _uniqueidentifier.default,
  NText: _ntext.default,
  VarBinary: _varbinary.default,
  VarChar: _varchar.default,
  Binary: _binary.default,
  Char: _char.default,
  NVarChar: _nvarchar.default,
  NChar: _nchar.default,
  Xml: _xml.default,
  Time: _time.default,
  Date: _date.default,
  DateTime2: _datetime2.default,
  DateTimeOffset: _datetimeoffset.default,
  UDT: _udt.default,
  TVP: _tvp.default,
  Variant: _sqlVariant.default
};
exports.typeByName = typeByName;