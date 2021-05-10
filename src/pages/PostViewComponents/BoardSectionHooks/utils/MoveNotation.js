import { v4 } from 'uuid'

class MoveNotation {
  constructor(move, n_move, easy_coordinates, parent, fen, piece_to_move) {
    this.id = v4()
    this.move = move
    this.n_move = n_move
    this.parent = parent
    this.easy_coordinates = easy_coordinates
    this.fen = fen
    this.piece_to_move = piece_to_move
    this.children_set = new Set()
    this.children_array = []
  }
}

export default MoveNotation