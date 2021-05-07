import { isInBoard, getColorOfPiece } from '../utils'

/**
 * @author {Kosmo}
 * 
 * @description return the legal moves of a knight in the board
 * 
 * @param {Object} state board state
 * 
 * @returns {Array} Array with legal moves
 */
const knightMoves = (state) => {
  let { selected_piece, pieces_colocation, legal_moves } = state
  const color_piece = getColorOfPiece(selected_piece, pieces_colocation)

  for (let i = -2; i < 3; i++) {
    for (let j = -2; j < 3; j++) {
      if (Math.abs(i) === Math.abs(j) || i === 0 || j === 0) {
        continue;
      }
      if (!isInBoard(selected_piece, i, j) || color_piece === getColorOfPiece(selected_piece, pieces_colocation, i, j)) {
        continue;
      }
      legal_moves[selected_piece[0] + i][selected_piece[1] + j] = true
    }
  }
  return legal_moves
}

export default knightMoves
