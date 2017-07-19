'use strict';

module.exports = function CustomError(title, message, example) {
  Error.captureStackTrace(this, this.constructor);
  this.name = title;
  this.message = message;
  this.extra = example;
};

require('util').inherits(module.exports, Error);
