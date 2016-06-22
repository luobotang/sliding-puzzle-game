const CELL_SIZE = 100 // px
const CELL_NUM = 3 // pre row and per col
const POSITION_PLACEHOLDER = 9
const POSITION_PLACEHOLDER_ROW = 3
const POSITION_PLACEHOLDER_COL = 2
const MOVE_ANIMATION_TIME_MS = 500

function Game() {
  this.el = document.querySelector('.view')
  this.picturePositions = [0,1,2,3,4,5,6,7,8,null]
  this.image = 'example.jpg'
  this.initialize()
}

Game.prototype.initialize = function () {
  this.setPicturePositions()
  this.setImage(this.image)
}

Game.prototype.setImage = function (img) {
  // set sample picture
  var elPictureSample = this.el.querySelector('.pic-sample')
  elPictureSample.style.backgroundImage = 'url(' + img + ')';

  // set each picture
  [].forEach.call(
    document.querySelectorAll('.pic'),
    (el) => el.style.backgroundImage = 'url(' + img + ')'
  )
}

Game.prototype.setPicturePositions = function () {
  this.picturePositions.forEach((id, position) => {
    if (typeof id === 'number') {
      this.setPicturePosition(this.getPicture(id), position)
    }
  })
}

Game.prototype.getPicture = function getPicture(id) {
  return this.el.querySelector('.pic[data-num="' + id + '"]')
}

Game.prototype.movePictureTo = function (id, targetPosition) {
  var picture = this.getPicture(id)

  // move picture with animation
  picture.classList.add('moving')
  this.setPicturePosition(picture, targetPosition)
  setTimeout(() => picture.classList.remove('moving'), MOVE_ANIMATION_TIME_MS)

  // update picture positions
  var currentPosition = this.picturePositions.indexOf(id)
  this.picturePositions[currentPosition] = null
  this.picturePositions[targetPosition] = id
}

Game.prototype.setPicturePosition = function (picture, position) {
  var row, col
  if (position === POSITION_PLACEHOLDER) {
    row = POSITION_PLACEHOLDER_ROW
    col = POSITION_PLACEHOLDER_COL
  } else {
    row = Math.floor(position / CELL_NUM)
    col = position % CELL_NUM
  }

  var top = (row * CELL_SIZE) + 'px'
  var left = (col * CELL_SIZE) + 'px'

  picture.style.top  = top
  picture.style.left = left
}

export default Game