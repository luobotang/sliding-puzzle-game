var Arrow_MoveFromDirection_Map = {
  ArrowDown: 0,
  ArrowUp: 2,
  ArrowLeft: 1,
  ArrowRight: 3
}

function Controller(app) {
  this.app = app
  this.__PicturePositions = app.picturePositions
  /*
   * from position 0 to positon 9
   * each position's surrounding positions(up,right,down,left)
   */
  this.__allSurroundingPositions = [
    [null,1,3,null], // position 0
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

  this.initialize()
}

Controller.prototype.initialize = function () {
  document.addEventListener('keydown', (e) => {
    if (e.key in Arrow_MoveFromDirection_Map) {
      e.preventDefault()
      this.moveFrom(Arrow_MoveFromDirection_Map[e.key])
    }
  })
}

/*
 * @param {number} direction - from direction, [0,1,2,3] <=> [up,right,down,left]
 */
Controller.prototype.moveFrom = function (direction) {
  var toPosition = this.getEmptyPosition()
  if (toPosition > -1) {
    var surroundingPositions = this.getSurroundingPositionsOf(toPosition)
    var fromPosition = surroundingPositions[direction]
    if (fromPosition !== null) {
      var pictureId = this.__PicturePositions[fromPosition]
      this.app.movePictureTo(pictureId, toPosition)
      console.debug('move [' + pictureId + '] ' + fromPosition + ' => ' + toPosition)
    }
  } else (
    console.error('get empty position failed.')
  )
}

Controller.prototype.getEmptyPosition = function () {
  return this.__PicturePositions.indexOf(null)
}

Controller.prototype.getSurroundingPositionsOf = function (position) {
  return this.__allSurroundingPositions[position]
}

export default Controller