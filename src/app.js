/*
 * https://en.wikipedia.org/wiki/Sliding_puzzle
 */

import __css__ from './app.css'
import Game from './game'
import Controller from './controller'

window.addEventListener('DOMContentLoaded', function () {
  var game = new Game()
  new Controller(game)
})