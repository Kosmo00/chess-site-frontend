import { getColorOfPiece, isInBoard, isSquareEmpty } from '../utils'

/**
 * @author {Kosmo}
 *
 * @description return the legal moves of a bishop in the board
 *
 * @param {Object} state board state
 *
 * @returns {Array} Array with legal moves
 */
const bishopMoves = (state) => {
  let { selected_piece, pieces_colocation, legal_moves } = state
  const color_piece = getColorOfPiece(selected_piece, pieces_colocation)
  for (let j = -1; j < 2; j += 2) {
    for (let k = -1; k < 2; k += 2) {
      for (let i = 1; i < 8; i++) {
        const in_board = isInBoard(selected_piece, i * j, i * k)

        if (!in_board) {
          break;
        }
        const square_empty = isSquareEmpty(selected_piece, pieces_colocation, i * j, i * k)
        const square_color_piece = getColorOfPiece(selected_piece, pieces_colocation, i * j, i * k)
        if (square_color_piece !== color_piece) {
          legal_moves[selected_piece[0] + i * j][selected_piece[1] + i * k] = true
        }
        if (!square_empty) {
          break
        }
      }
    }
  }
  return legal_moves
}

export default bishopMoves