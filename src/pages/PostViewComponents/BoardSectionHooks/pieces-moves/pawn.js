import { isInBoard, getColorOfPiece, getPiece } from '../utils'

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
  let { selected_piece, pieces_colocation, legal_moves, ap_square } = state
  const color_piece = getColorOfPiece(selected_piece, pieces_colocation)
  let direction = 1
  let initial_position = 1
  if (color_piece === 'W') {
    direction = -1
    initial_position = 6
  }
  if (isInBoard(selected_piece, 1 * direction, 1)) {
    const square_color_piece = getColorOfPiece(selected_piece, pieces_colocation, 1 * direction, 1)
    if ((square_color_piece !== color_piece && square_color_piece !== undefined) || (ap_square !== null &&
      ((ap_square[0] === selected_piece[0] + 1 * direction && ap_square[1] === selected_piece[1] + 1)))) {
      legal_moves[selected_piece[0] + 1 * direction][selected_piece[1] + 1] = true
    }
  }
  if (isInBoard(selected_piece, 1 * direction, -1)) {
    const square_color_piece = getColorOfPiece(selected_piece, pieces_colocation, 1 * direction, -1)
    if ((square_color_piece !== color_piece && square_color_piece !== undefined) || (ap_square !== null &&
      (ap_square[0] === selected_piece[0] + 1 * direction && ap_square[1] === selected_piece[1] - 1))) {
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

export const validateAPCapture = (state, posX) => {
  const { turn, selected_piece, pieces_colocation } = state
  const direction = (turn === 1 ? -1 : 1)
  const file = (turn === 1 ? 6 : 1)
  if (getPiece(pieces_colocation, selected_piece).toUpperCase() === 'P' && posX === file + 2 * direction) {
    return [file + 1 * direction, selected_piece[1]]
  }

  return null
}

export const doAPCapture = (state, posX, posY) => {
  const { selected_piece, pieces_colocation, ap_square } = state
  const color_piece = getColorOfPiece(selected_piece, pieces_colocation)
  const direction = color_piece === 'W' ? 1 : -1
  const piece = getPiece(pieces_colocation, selected_piece)

  if (piece.toUpperCase() !== 'P' || ap_square === null || ap_square[0] !== posX || ap_square[1] !== posY) {
    return false
  }
  if (selected_piece[1] !== posY) {
    if (getPiece(pieces_colocation, [posX, posY]) === '') {
      pieces_colocation[posX][posY] = pieces_colocation[selected_piece[0]][selected_piece[1]]
      pieces_colocation[selected_piece[0]][selected_piece[1]] = ''
      pieces_colocation[posX + 1 * direction][posY] = ''
      return true
    }
  }
  return false
}

export const coronate = (state) => {
  const { pieces_colocation, selected_piece } = state
  const piece = getPiece(pieces_colocation, selected_piece)
  const color_piece = getColorOfPiece(selected_piece, pieces_colocation)
  const coronation_square = color_piece === 'W' ? 0 : 7
  const direction = color_piece === 'W' ? -1 : 1

  if (piece.toUpperCase() === 'P' && coronation_square === selected_piece[0] + 1 * direction) {
    pieces_colocation[selected_piece[0]][selected_piece[1]] = color_piece === 'W' ? 'S' : 's'
  }
}

export default pawnMoves