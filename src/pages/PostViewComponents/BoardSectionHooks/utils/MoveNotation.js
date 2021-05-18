import { v4 } from 'uuid'
import { createEmptyBoard } from './index'

class MoveNotation {
  constructor(fen, move, easy_coordinates, parent) {
    this.id = v4()

    this.setFenData(fen)

    // Initializes the move data
    this.easy_coordinates = easy_coordinates
    this.move = move

    // Initializes the datastructure
    this.parent = parent
    this.children_set = new Set()
    this.children_array = []
  }

  /**
   * @author Kosmo
   * 
   * @returns {Array<Array<string>>}
   */
  setBoardToArray = () => {
    let pieces_colocation = createEmptyBoard()
    let iterator = 0
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (/[1-9]/.test(this.fen[iterator])) {
          j += parseInt(this.fen[iterator]) - 1
        }
        else {
          pieces_colocation[i][j] = this.fen[iterator]
        }

        iterator++
      }
      iterator++
    }
    return pieces_colocation
  }

  getTurn = () => {
    return this.turn === 'w' ? 1 : -1
  }

  getTurnToAnnotate = () => {
    return this.turn === 'w' ? -1 : 1
  }

  getAPCapture = () => {
    let ap_square = null
    const column = 'abcdefgh'
    if (this.apCapture !== '-') {
      return ap_square = [8 - parseInt(this.apCapture[1]), column.indexOf(this.apCapture[0])]
    }
    return ap_square
  }
  setFenData = fen => {
    const fen_data = fen.split(' ')
    // Initializes the fen data
    this.fen = fen
    this.board = fen_data[0]
    this.turn = fen_data[1]
    this.castles = fen_data[2]
    this.apCapture = fen_data[3]
    this.n_move = parseInt(fen_data[5])
  }

  findChildrenByMove = move => {
    for (let i = 0; i < this.children_array.length; i++) {
      if (this.children_array[i].move === move) {
        return this.children_array[i]
      }
      return null
    }
  }
}

export default MoveNotation