/*
 *　https://en.wikipedia.org/wiki/Sliding_puzzle
 */

var app = app || {};

app.CELL_SIZE = 100 // px
app.CELL_NUM = 3 // pre row and per col
app.POSITION_PLACEHOLDER = 9
app.POSITION_PLACEHOLDER_ROW = 3
app.POSITION_PLACEHOLDER_COL = 2
app.MOVE_ANIMATION_TIME_MS = 500

app.picturePositions = [0,1,2,3,4,5,6,7,8,null]

app.init = function () {
	this.setPicturePositions()
	this.setImage('example.jpg')
}

app.setImage = function (img) {
	document.querySelector('.pic-sample').style.backgroundImage = 'url(' + img + ')';
	[].forEach.call(document.querySelectorAll('.pic'), function (picture) {
		picture.style.backgroundImage = 'url(' + img + ')'
	})
}

app.setPicturePositions = function () {
	app.picturePositions.forEach(function (id, position) {
		if (typeof id === 'number') {
			app.setPicturePosition(app.getPicture(id), position)
		}
	})
}

app.getPicture = function getPicture(id) {
	return document.querySelector('.pic[data-num="' + id + '"]')
}

app.movePictureTo = function (id, targetPosition) {
	var picture = this.getPicture(id)
	picture.classList.add('moving')
	app.setPicturePosition(picture, targetPosition)
	setTimeout(function () {
		picture.classList.remove('moving')
	}, app.MOVE_ANIMATION_TIME_MS)

	// update picture positions
	var currentPosition = app.picturePositions.indexOf(id)
	app.picturePositions[currentPosition] = null
	app.picturePositions[targetPosition] = id
}

app.setPicturePosition = function (picture, position) {
	var row, col
	if (position === app.POSITION_PLACEHOLDER) {
		row = app.POSITION_PLACEHOLDER_ROW
		col = app.POSITION_PLACEHOLDER_COL
	} else {
		row = Math.floor(position / app.CELL_NUM)
		col = position % app.CELL_NUM
	}

	var top = (row * app.CELL_SIZE) + 'px'
	var left = (col * app.CELL_SIZE) + 'px'

	picture.style.top  = top
	picture.style.left = left
}

app.control = (function () {
	var control = {}

	var __PicturePositions = app.picturePositions
	// up right down left
	var __allSurroundingPositions = [
			[null,1,3,null], // 0
			[null,2,4,0],
			[null,null,5,1],
			[0,4,6,null],
			[1,5,7,3],
			[2,null,8,4],
			[3,7,null,null],
			[4,8,null,6],
			[5,null,9,7],
			[8,null,null,null]
		]
	var DIRECTION_UP = 0
	var DIRECTION_RIGHT = 1
	var DIRECTION_DOWN = 2
	var DIRECTION_LEFT = 3

	var Arrow_MoveFromDirection_Map = {
		ArrowDown: 0,
		ArrowUp: 2,
		ArrowLeft: 1,
		ArrowRight: 3
	}

	control.init = function () {
		document.addEventListener('keydown', function (e) {
			if (e.key in Arrow_MoveFromDirection_Map) {
				e.preventDefault()
				control.moveFrom(Arrow_MoveFromDirection_Map[e.key])
			}
		})
	}

	control.moveFrom = function (direction) {
		var toPosition = getEmptyPosition()
		if (toPosition > -1) {
			var surroundingPositions = getSurroundingPositionsOf(toPosition)
			var fromPosition = surroundingPositions[direction]
			if (fromPosition !== null) {
				var pictureId = __PicturePositions[fromPosition]
				app.movePictureTo(pictureId, toPosition)
				console.debug('move pic ' + pictureId + ' from ' + fromPosition + ' to ' + toPosition)
			}
		} else (
			console.error('get empty position failed.')
		)
	}

	function getEmptyPosition() {
		return __PicturePositions.indexOf(null)
	}

	function getSurroundingPositionsOf(position) {
		return __allSurroundingPositions[position]
	}

	return control
})()

window.addEventListener('DOMContentLoaded', function () {
	app.init()
	app.control.init()
})