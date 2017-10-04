'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MATCH_ROUTE_NAME = exports.IS_BUNDLED_PAGE = undefined;
exports.getAvailableChunks = getAvailableChunks;

var _path = require('path');

var _fs = require('fs');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dir = process.cwd(); /* eslint-disable no-useless-escape */

var config = (0, _config2.default)(dir);

var extensions = config.pagesExtensions.join('|');

var IS_BUNDLED_PAGE = exports.IS_BUNDLED_PAGE = new RegExp('^bundles[/\\\\]pages.*.(' + extensions + ')$');
var MATCH_ROUTE_NAME = exports.MATCH_ROUTE_NAME = new RegExp('^bundles[/\\\\]pages[/\\\\](.*).(' + extensions + ')$');

function getAvailableChunks(dir, dist) {
  var chunksDir = (0, _path.join)(dir, dist, 'chunks');
  if (!(0, _fs.existsSync)(chunksDir)) return {};

  var chunksMap = {};
  var chunkFiles = (0, _fs.readdirSync)(chunksDir);

  chunkFiles.forEach(function (filename) {
    if (/\.js$/.test(filename)) {
      chunksMap[filename] = true;
    }
  });

  return chunksMap;
}