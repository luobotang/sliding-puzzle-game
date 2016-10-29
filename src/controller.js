var Arrow_MoveFromDirection_Map = {
  ArrowDown: 0,
  ArrowUp: 2,
  ArrowLeft: 1,
  ArrowRight: 3
}

/*
 * @param {Game} game
 */
class Controller {

  constructor(game) {
    this.game = game
    this.initialize()
  }

  initialize() {
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
  moveFrom(direction) {
    var toPosition = this.game.getEmptyPosition()
    if (toPosition > -1) {
      var surroundingPositions = this.game.getSurroundingPositionsOf(toPosition)
      var fromPosition = surroundingPositions[direction]
      if (fromPosition !== null) {
        var pictureId = this.game.getPictureIdByPosition(fromPosition)
        this.game.movePictureTo(pictureId, toPosition)
      }
    } else {
      console.error('get empty position failed.')
    }
  }
}

export default Controller