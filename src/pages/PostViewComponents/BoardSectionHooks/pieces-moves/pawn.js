import { isInBoard, getColorOfPiece } from '../utils'

/**
 * @author {Kosmo}
 *
 * @description return the legal moves of a pawn in the board
 *
 * @param {Object} state board state
 *
 * @returns {Array} Array with legal moves
 */
const pawnMoves = (state) => {
  let { selected_piece, pieces_colocation, legal_moves } = state
  const color_piece = getColorOfPiece(selected_piece, pieces_colocation)
  let direction = 1
  let initial_position = 1
  if (color_piece === 'W') {
    direction = -1
    initial_position = 6
  }
  if (isInBoard(selected_piece, 1 * direction, 1)) {
    const square_color_piece = getColorOfPiece(selected_piece, pieces_colocation, 1 * direction, 1)
    if (square_color_piece !== color_piece && square_color_piece !== undefined) {
      legal_moves[selected_piece[0] + 1 * direction][selected_piece[1] + 1] = true
    }
  }
  if (isInBoard(selected_piece, 1 * direction, -1)) {
    const square_color_piece = getColorOfPiece(selected_piece, pieces_colocation, 1 * direction, -1)
    if (square_color_piece !== color_piece && square_color_piece !== undefined) {
      legal_moves[selected_piece[0] + 1 * direction][selected_piece[1] - 1] = true
    }
  }
  let square_color_piece = getColorOfPiece(selected_piece, pieces_colocation, 1 * direction, 0)
  if (square_color_piece === undefined) {
    legal_moves[selected_piece[0] + 1 * direction][selected_piece[1]] = true
    square_color_piece = getColorOfPiece(selected_piece, pieces_colocation, 2 * direction, 0)
    if (square_color_piece === undefined && initial_position === selected_piece[0]) {
      legal_moves[selected_piece[0] + 2 * direction][selected_piece[1]] = true
    }
  }
  return legal_moves
}

export default pawnMoves