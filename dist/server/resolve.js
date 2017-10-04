'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var isFile = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(p) {
    var stat, realpath;
    return _regenerator2.default.wrap(function _callee2$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            stat = void 0;
            _context3.prev = 1;
            _context3.next = 4;
            return _fs2.default.stat(p);

          case 4:
            stat = _context3.sent;
            _context3.next = 12;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3['catch'](1);

            if (!(_context3.t0.code === 'ENOENT')) {
              _context3.next = 11;
              break;
            }

            return _context3.abrupt('return', false);

          case 11:
            throw _context3.t0;

          case 12:
            _context3.next = 14;
            return getTrueFilePath(p);

          case 14:
            realpath = _context3.sent;

            if (!(p !== realpath)) {
              _context3.next = 17;
              break;
            }

            return _context3.abrupt('return', false);

          case 17:
            return _context3.abrupt('return', stat.isFile() || stat.isFIFO());

          case 18:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee2, this, [[1, 7]]);
  }));

  return function isFile(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

// This is based on the stackoverflow answer: http://stackoverflow.com/a/33139702/457224
// We assume we'll get properly normalized path names as p


var getTrueFilePath = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(p) {
    var fsPathNormalized, pathRoot, noDrivePath, result;
    return _regenerator2.default.wrap(function _callee3$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            fsPathNormalized = p;
            // OSX: HFS+ stores filenames in NFD (decomposed normal form) Unicode format,
            // so we must ensure that the input path is in that format first.

            if (process.platform === 'darwin') fsPathNormalized = fsPathNormalized.normalize('NFD');

            // !! Windows: Curiously, the drive component mustn't be part of a glob,
            // !! otherwise glob.sync() will invariably match nothing.
            // !! Thus, we remove the drive component and instead pass it in as the 'cwd'
            // !! (working dir.) property below.
            pathRoot = (0, _path.parse)(fsPathNormalized).root;
            noDrivePath = fsPathNormalized.slice(Math.max(pathRoot.length - 1, 0));

            // Perform case-insensitive globbing (on Windows, relative to the drive /
            // network share) and return the 1st match, if any.
            // Fortunately, glob() with nocase case-corrects the input even if it is
            // a *literal* path.

            _context4.next = 6;
            return (0, _globPromise2.default)(noDrivePath, { nocase: true, cwd: pathRoot });

          case 6:
            result = _context4.sent;
            return _context4.abrupt('return', result[0]);

          case 8:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getTrueFilePath(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.resolveFromList = resolveFromList;

var _path = require('path');

var _fs = require('mz/fs');

var _fs2 = _interopRequireDefault(_fs);

var _globPromise = require('glob-promise');

var _globPromise2 = _interopRequireDefault(_globPromise);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dir = process.cwd();
var config = (0, _config2.default)(dir);

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(id) {
    var paths, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, p, err;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            paths = getPaths(id);
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 4;
            _iterator = (0, _getIterator3.default)(paths);

          case 6:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 15;
              break;
            }

            p = _step.value;
            _context.next = 10;
            return isFile(p);

          case 10:
            if (!_context.sent) {
              _context.next = 12;
              break;
            }

            return _context.abrupt('return', p);

          case 12:
            _iteratorNormalCompletion = true;
            _context.next = 6;
            break;

          case 15:
            _context.next = 21;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context['catch'](4);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 21:
            _context.prev = 21;
            _context.prev = 22;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 24:
            _context.prev = 24;

            if (!_didIteratorError) {
              _context.next = 27;
              break;
            }

            throw _iteratorError;

          case 27:
            return _context.finish(24);

          case 28:
            return _context.finish(21);

          case 29:
            err = new Error('Cannot find module ' + id);

            err.code = 'ENOENT';
            throw err;

          case 32:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[4, 17, 21, 29], [22,, 24, 28]]);
  }));

  function resolve(_x) {
    return _ref.apply(this, arguments);
  }

  return resolve;
}();

function resolveFromList(id, files) {
  var paths = getPaths(id);
  var set = new _set2.default(files);
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = (0, _getIterator3.default)(paths), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var p = _step2.value;

      if (set.has(p)) return p;
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
}

function getPaths(id) {
  var _marked = /*#__PURE__*/_regenerator2.default.mark(getPagesPaths);

  var i = _path.sep === '/' ? id : id.replace(/\//g, _path.sep);

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = (0, _getIterator3.default)(config.pagesExtensions.map(function (ext) {
      return '.' + ext;
    })), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var ext = _step3.value;

      if (i.slice(-ext.length) === ext) return [i];
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  if (i[i.length - 1] === _path.sep) {
    return [].concat((0, _toConsumableArray3.default)(config.pagesExtensions.map(function (ext) {
      return i + ('index.' + ext);
    })));
  }

  function getPagesPaths(extensions) {
    var _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, _ext;

    return _regenerator2.default.wrap(function getPagesPaths$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _iteratorNormalCompletion4 = true;
            _didIteratorError4 = false;
            _iteratorError4 = undefined;
            _context2.prev = 3;
            _iterator4 = (0, _getIterator3.default)(config.pagesExtensions);

          case 5:
            if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
              _context2.next = 14;
              break;
            }

            _ext = _step4.value;
            _context2.next = 9;
            return i + ('.' + _ext);

          case 9:
            _context2.next = 11;
            return (0, _path.join)(i, 'index.' + _ext);

          case 11:
            _iteratorNormalCompletion4 = true;
            _context2.next = 5;
            break;

          case 14:
            _context2.next = 20;
            break;

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2['catch'](3);
            _didIteratorError4 = true;
            _iteratorError4 = _context2.t0;

          case 20:
            _context2.prev = 20;
            _context2.prev = 21;

            if (!_iteratorNormalCompletion4 && _iterator4.return) {
              _iterator4.return();
            }

          case 23:
            _context2.prev = 23;

            if (!_didIteratorError4) {
              _context2.next = 26;
              break;
            }

            throw _iteratorError4;

          case 26:
            return _context2.finish(23);

          case 27:
            return _context2.finish(20);

          case 28:
          case 'end':
            return _context2.stop();
        }
      }
    }, _marked, this, [[3, 16, 20, 28], [21,, 23, 27]]);
  }

  return [].concat((0, _toConsumableArray3.default)(getPagesPaths(config.pagesExtensions)));
}