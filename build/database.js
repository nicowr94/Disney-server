"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var URI = process.env.MONGODB_URI ? process.env.MONGODB_URI : "mongodb://localhost/database_barracks";

_mongoose["default"].connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var connection = _mongoose["default"].connection;
connection.once("open", function () {
  console.log("DB is connected");
});