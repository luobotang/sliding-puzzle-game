const CELL_SIZE = 100 // px
const CELL_NUM = 3 // pre row and per col
const POSITION_PLACEHOLDER = 9
const POSITION_PLACEHOLDER_ROW = 3
const POSITION_PLACEHOLDER_COL = 2
const MOVE_ANIMATION_TIME_MS = 500

class Game {
  constructor()  {
    this.el = document.querySelector('.view')
    this.picturePositions = ['0','1','2','3','4','5','6','7','8',null]
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
    this.image = 'example.jpg'
    this.initialize()
  }

  initialize() {
    this.initPicturePositions()
    this.initImage()
    this.initEvents()
  }

  initImage() {
    var img = this.image

    // set sample picture
    var elPictureSample = this.el.querySelector('.pic-sample')
    elPictureSample.style.backgroundImage = `url(${img})`;

    // set each picture
    [].forEach.call(
      document.querySelectorAll('.pic'),
      (el) => el.style.backgroundImage = `url(${img})`
    )
  }

  initPicturePositions() {
    this.picturePositions.forEach((id, position) => {
      if (typeof id === 'string') {
        this.setPicturePosition(this.getPicture(id), position)
      }
    })
  }

  initEvents() {

    // click picture then move it to the empty position if possible
    this.el.addEventListener('click', (e) => {
      var target = e.target
      if (target.classList.contains('pic')) {
        var id = this.getPictureId(target)
        var currentPosition = this.getPicturePositionById(id)
        var emptyPosition = this.getEmptyPosition()
        if (this.isPositionNearBy(currentPosition, emptyPosition)) {
          this.movePictureTo(id, emptyPosition)
        }
      }
    }, false)
  }

  getPicture(id) {
    return this.el.querySelector(`.pic[data-num="${id}"]`)
  }

  /*
   * @param {string} id - picture id
   * @param {number} targetPosition
   */
  movePictureTo(id, targetPosition) {
    var picture = this.getPicture(id)

    // move picture with animation
    picture.classList.add('moving')
    this.setPicturePosition(picture, targetPosition)
    setTimeout(
      () => picture.classList.remove('moving'),
      MOVE_ANIMATION_TIME_MS
    )

    // update picture positions
    var currentPosition = this.picturePositions.indexOf(id)
    this.picturePositions[currentPosition] = null
    this.picturePositions[targetPosition] = id
  }

  getPictureId(picture) {
    return picture.dataset['num']
  }

  getPictureIdByPosition(position) {
    return this.picturePositions[position]
  }

  getPicturePositionById(id) {
    return this.picturePositions.indexOf(id)
  }

  getEmptyPosition() {
    return this.picturePositions.indexOf(null)
  }

  setPicturePosition(picture, position) {
    var row, col
    if (position === POSITION_PLACEHOLDER) {
      row = POSITION_PLACEHOLDER_ROW
      col = POSITION_PLACEHOLDER_COL
    } else {
      row = Math.floor(position / CELL_NUM)
      col = position % CELL_NUM
    }

    var top = `${row * CELL_SIZE}px`
    var left = `${col * CELL_SIZE}px`

    picture.style.top  = top
    picture.style.left = left
  }

  getSurroundingPositionsOf(position) {
    return this.__allSurroundingPositions[position]
  }

  isPositionNearBy(position1, position2) {
    var surroundingPositions1 = this.__allSurroundingPositions[position1]
    return surroundingPositions1 && surroundingPositions1.indexOf(position2) > -1
  }
}

export default Game