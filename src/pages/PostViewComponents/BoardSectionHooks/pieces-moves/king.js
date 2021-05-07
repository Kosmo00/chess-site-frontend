import { getColorOfPiece, isInBoard } from '../utils'

const kingMoves = (state) => {
  let { selected_piece, pieces_colocation, legal_moves } = state
  const color_piece = getColorOfPiece(selected_piece, pieces_colocation)

  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      if (i === 0 && j === 0) {
        continue
      }
      if (!isInBoard(selected_piece, i, j)) {
        continue;
      }
      if (color_piece !== getColorOfPiece(selected_piece, pieces_colocation, i, j)) {
        legal_moves[selected_piece[0] + i][selected_piece[1] + j] = true
      }
    }
  }
  return legal_moves
}

export default kingMoves