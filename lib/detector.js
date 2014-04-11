'use strict';

var typeMap = {};
var types = require('./types');

// load all available handlers
types.forEach(function (type) {
  typeMap[type] = require('./types/' + type).detect;
});

module.exports = function (buffer, filepath, callback) {

  var type;
  buffer = buffer.slice(0, 16);

  for (type in typeMap) {
    typeMap[type](buffer, filepath, function(err, result){
      if (err) {
        return callback(err);
      }
      if (result) {
        return result;
      }
    });
  }
};
