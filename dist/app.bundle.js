/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	var _game = __webpack_require__(5);

	var _game2 = _interopRequireDefault(_game);

	var _controller = __webpack_require__(6);

	var _controller2 = _interopRequireDefault(_controller);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.addEventListener('DOMContentLoaded', function () {
	  var game = new _game2.default();
	  new _controller2.default(game);
	}); /*
	     * https://en.wikipedia.org/wiki/Sliding_puzzle
	     */

/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var CELL_SIZE = 100; // px
	var CELL_NUM = 3; // pre row and per col
	var POSITION_PLACEHOLDER = 9;
	var POSITION_PLACEHOLDER_ROW = 3;
	var POSITION_PLACEHOLDER_COL = 2;
	var MOVE_ANIMATION_TIME_MS = 500;

	var Game = function () {
	  function Game() {
	    _classCallCheck(this, Game);

	    this.el = document.querySelector('.view');
	    this.picturePositions = ['0', '1', '2', '3', '4', '5', '6', '7', '8', null];
	    /*
	     * from position 0 to positon 9
	     * each position's surrounding positions(up,right,down,left)
	     */
	    this.__allSurroundingPositions = [[null, 1, 3, null], // position 0
	    [null, 2, 4, 0], [null, null, 5, 1], [0, 4, 6, null], [1, 5, 7, 3], [2, null, 8, 4], [3, 7, null, null], [4, 8, null, 6], [5, null, 9, 7], [8, null, null, null]];
	    this.image = 'example.jpg';
	    this.initialize();
	  }

	  _createClass(Game, [{
	    key: 'initialize',
	    value: function initialize() {
	      this.initPicturePositions();
	      this.initImage();
	      this.initEvents();
	    }
	  }, {
	    key: 'initImage',
	    value: function initImage() {
	      var img = this.image;

	      // set sample picture
	      var elPictureSample = this.el.querySelector('.pic-sample');
	      elPictureSample.style.backgroundImage = 'url(' + img + ')';

	      // set each picture
	      [].forEach.call(document.querySelectorAll('.pic'), function (el) {
	        return el.style.backgroundImage = 'url(' + img + ')';
	      });
	    }
	  }, {
	    key: 'initPicturePositions',
	    value: function initPicturePositions() {
	      var _this = this;

	      this.picturePositions.forEach(function (id, position) {
	        if (typeof id === 'string') {
	          _this.setPicturePosition(_this.getPicture(id), position);
	        }
	      });
	    }
	  }, {
	    key: 'initEvents',
	    value: function initEvents() {
	      var _this2 = this;

	      // click picture then move it to the empty position if possible
	      this.el.addEventListener('click', function (e) {
	        var target = e.target;
	        if (target.classList.contains('pic')) {
	          var id = _this2.getPictureId(target);
	          var currentPosition = _this2.getPicturePositionById(id);
	          var emptyPosition = _this2.getEmptyPosition();
	          if (_this2.isPositionNearBy(currentPosition, emptyPosition)) {
	            _this2.movePictureTo(id, emptyPosition);
	          }
	        }
	      }, false);
	    }
	  }, {
	    key: 'getPicture',
	    value: function getPicture(id) {
	      return this.el.querySelector('.pic[data-num="' + id + '"]');
	    }

	    /*
	     * @param {string} id - picture id
	     * @param {number} targetPosition
	     */

	  }, {
	    key: 'movePictureTo',
	    value: function movePictureTo(id, targetPosition) {
	      var picture = this.getPicture(id);

	      // move picture with animation
	      picture.classList.add('moving');
	      this.setPicturePosition(picture, targetPosition);
	      setTimeout(function () {
	        return picture.classList.remove('moving');
	      }, MOVE_ANIMATION_TIME_MS);

	      // update picture positions
	      var currentPosition = this.picturePositions.indexOf(id);
	      this.picturePositions[currentPosition] = null;
	      this.picturePositions[targetPosition] = id;
	    }
	  }, {
	    key: 'getPictureId',
	    value: function getPictureId(picture) {
	      return picture.dataset['num'];
	    }
	  }, {
	    key: 'getPictureIdByPosition',
	    value: function getPictureIdByPosition(position) {
	      return this.picturePositions[position];
	    }
	  }, {
	    key: 'getPicturePositionById',
	    value: function getPicturePositionById(id) {
	      return this.picturePositions.indexOf(id);
	    }
	  }, {
	    key: 'getEmptyPosition',
	    value: function getEmptyPosition() {
	      return this.picturePositions.indexOf(null);
	    }
	  }, {
	    key: 'setPicturePosition',
	    value: function setPicturePosition(picture, position) {
	      var row, col;
	      if (position === POSITION_PLACEHOLDER) {
	        row = POSITION_PLACEHOLDER_ROW;
	        col = POSITION_PLACEHOLDER_COL;
	      } else {
	        row = Math.floor(position / CELL_NUM);
	        col = position % CELL_NUM;
	      }

	      var top = row * CELL_SIZE + 'px';
	      var left = col * CELL_SIZE + 'px';

	      picture.style.top = top;
	      picture.style.left = left;
	    }
	  }, {
	    key: 'getSurroundingPositionsOf',
	    value: function getSurroundingPositionsOf(position) {
	      return this.__allSurroundingPositions[position];
	    }
	  }, {
	    key: 'isPositionNearBy',
	    value: function isPositionNearBy(position1, position2) {
	      var surroundingPositions1 = this.__allSurroundingPositions[position1];
	      return surroundingPositions1 && surroundingPositions1.indexOf(position2) > -1;
	    }
	  }]);

	  return Game;
	}();

	exports.default = Game;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Arrow_MoveFromDirection_Map = {
	  ArrowDown: 0,
	  ArrowUp: 2,
	  ArrowLeft: 1,
	  ArrowRight: 3
	};

	/*
	 * @param {Game} game
	 */

	var Controller = function () {
	  function Controller(game) {
	    _classCallCheck(this, Controller);

	    this.game = game;
	    this.initialize();
	  }

	  _createClass(Controller, [{
	    key: 'initialize',
	    value: function initialize() {
	      var _this = this;

	      document.addEventListener('keydown', function (e) {
	        if (e.key in Arrow_MoveFromDirection_Map) {
	          e.preventDefault();
	          _this.moveFrom(Arrow_MoveFromDirection_Map[e.key]);
	        }
	      });
	    }

	    /*
	     * @param {number} direction - from direction, [0,1,2,3] <=> [up,right,down,left]
	     */

	  }, {
	    key: 'moveFrom',
	    value: function moveFrom(direction) {
	      var toPosition = this.game.getEmptyPosition();
	      if (toPosition > -1) {
	        var surroundingPositions = this.game.getSurroundingPositionsOf(toPosition);
	        var fromPosition = surroundingPositions[direction];
	        if (fromPosition !== null) {
	          var pictureId = this.game.getPictureIdByPosition(fromPosition);
	          this.game.movePictureTo(pictureId, toPosition);
	        }
	      } else {
	        console.error('get empty position failed.');
	      }
	    }
	  }]);

	  return Controller;
	}();

	exports.default = Controller;

/***/ }
/******/ ]);