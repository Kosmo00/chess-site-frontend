import {
  getColorOfPiece,
  isInBoard,
  getAllColorLegalMoves,
  buildEmptyArrayOfLegalMoves,
  prepareLegalMoves,
  validateLegalMovements,
  comprobateExistenceOfLegalMove,
  getPiece,
  isSquareEmpty
} from '../utils'

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

/**
 * @author Kosmo
 * 
 * @param {object} state state of the board 
 * 
 * @returns {Array | null}
 */
export const comprobateCheck = (state) => {
  const { selected_piece, pieces_colocation } = state
  const color_piece = getColorOfPiece(selected_piece, pieces_colocation)

  let legal_moves = getAllColorLegalMoves(state)

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const color_square_piece = getColorOfPiece([i, j], pieces_colocation)
      if (legal_moves[i][j] && /[k, K]/.test(pieces_colocation[i][j]) && color_square_piece !== color_piece) {
        return [i, j]
      }
    }
  }
  return null
}

/**
 * @author Kosmo
 * 
 * @param {Array<Array<string>>} pieces_colocation 
 * @param {'W'||'B'} color_piece 
 * 
 * @returns {[number, number]}
 */
export const findKingPosition = (pieces_colocation, color_piece) => {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const color_square_piece = getColorOfPiece([i, j], pieces_colocation)
      if (/[k, K]/.test(pieces_colocation[i][j]) && color_square_piece === color_piece) {
        return [i, j]
      }
    }
  }
}

/**
 * @author Kosmo
 * 
 * @param {object} state board state
 * 
 * @returns {boolean}
 */
export const comprobateCheckMate = (state) => {
  const { pieces_colocation, check_square } = state
  const color_piece = getColorOfPiece(check_square, pieces_colocation)

  let moves = buildEmptyArrayOfLegalMoves()

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const color_square_piece = getColorOfPiece([i, j], pieces_colocation)
      if (color_square_piece === color_piece) {
        moves = prepareLegalMoves({ ...state, selected_piece: [i, j], legal_moves: moves })
        moves = validateLegalMovements({ ...state, legal_moves: moves, selected_piece: [i, j] })
        if (comprobateExistenceOfLegalMove(moves)) {
          return false
        }
      }
    }
  }
  return true
}

/**
 * @author Kosmo
 * 
 * @param {object} state
 */
export const validateCastle = state => {
  const { check_square, castle, turn } = state
  if (check_square) {
    return
  }
  if (castle[1 + (turn === 1 ? 0 : 2)] !== '') {
    castles(state, 'QS')
  }
  if (castle[0 + (turn === 1 ? 0 : 2)] !== '') {
    castles(state, 'KS')
  }
}

/**
 * @author Kosmo
 * 
 * @param {object} state board state
 * @param {string} side Side to castle
 */
const castles = (state, side) => {
  const { selected_piece, pieces_colocation, legal_moves, turn } = state
  const file_piece = turn === 1 ? 7 : 0
  const piece = getPiece(pieces_colocation, selected_piece)
  const faciliter = (side === 'KS' ? 1 : -1)

  if (side === 'KS' ? validMovesCastlesKingSide(state, file_piece) :
    validMovesCastlesQueenSide(state, file_piece)) {
    pieces_colocation[file_piece][4 + 1 * faciliter] = piece
    pieces_colocation[file_piece][4] = ''
    if (comprobateCheck({ ...state })) {
      pieces_colocation[file_piece][4] = piece
      pieces_colocation[file_piece][4 + 1 * faciliter] = ''
      return
    }
    pieces_colocation[file_piece][4 + 1 * faciliter] = ''
    pieces_colocation[file_piece][4 + 2 * faciliter] = piece
    if (!comprobateCheck(state)) {
      legal_moves[file_piece][4 + 2 * faciliter] = true
    }
    pieces_colocation[file_piece][4 + 2 * faciliter] = ''
    pieces_colocation[file_piece][4 + 1 * faciliter] = ''
    pieces_colocation[file_piece][4] = piece
  }
}

/**
 * @author Kosmo
 * 
 * @param {object} state board state
 * @param {number} file number of file of that piece
 * 
 * @returns {boolean}
 */
const validMovesCastlesKingSide = (state, file) => {
  const { pieces_colocation } = state
  return isSquareEmpty([file, 5], pieces_colocation) &&
    isSquareEmpty([file, 6], pieces_colocation)
}

/**
 * @author Kosmo
 *
 * @param {object} state board state
 * @param {number} file number of file of that piece
 *
 * @returns {boolean}
 */
const validMovesCastlesQueenSide = (state, file) => {
  const { pieces_colocation } = state
  return isSquareEmpty([file, 1], pieces_colocation) &&
    isSquareEmpty([file, 2], pieces_colocation) &&
    isSquareEmpty([file, 3], pieces_colocation)
}

/**
 * @author Kosmo
 * 
 * @param {object} state board state
 * @param {number} posX x axis of new square of moved piece
 * @param {number} posY y axis of new square of moved piece
 * 
 * @returns {boolean} return if move realized is a castle
 */
export const doCastle = (state, posX, posY) => {
  const { selected_piece, pieces_colocation } = state
  const rookKS = pieces_colocation[selected_piece[0]][7]
  const rookQS = pieces_colocation[selected_piece[0]][0]

  if (getPiece(pieces_colocation, selected_piece).toUpperCase() === 'K') {
    if (posX > selected_piece[1] + 1) {
      state.pieces_colocation[posX][posY] = getPiece(state.pieces_colocation, state.selected_piece)
      state.pieces_colocation[state.selected_piece[0]][state.selected_piece[1]] = ''
      pieces_colocation[selected_piece[0]][7] = ''
      pieces_colocation[selected_piece[0]][5] = rookKS
      return true
    }
    if (posX < selected_piece[1] - 1) {
      state.pieces_colocation[posX][posY] = getPiece(state.pieces_colocation, state.selected_piece)
      state.pieces_colocation[state.selected_piece[0]][state.selected_piece[1]] = ''
      pieces_colocation[selected_piece[0]][0] = ''
      pieces_colocation[selected_piece[0]][3] = rookQS
      return true
    }
  }
  return false
}

export default kingMoves