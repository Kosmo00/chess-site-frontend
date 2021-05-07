import legal_movements from '../movements'

/**
 * @author Kosmo
 * 
 * @param {object} state state of the board 
 * 
 * @returns {Array<Array<boolean>>}
 */
export const prepareLegalMoves = (state) => {
  let { selected_piece, pieces_colocation, legal_moves } = state
  const { pawnMoves, knightMoves, bishopMoves, rookMoves, queenMoves, kingMoves } = legal_movements

  switch (pieces_colocation[selected_piece[0]][selected_piece[1]]) {
    case 'p':
    case 'P': return pawnMoves(state)
    case 'r':
    case 'R': return rookMoves(state)
    case 'n':
    case 'N': return knightMoves(state)
    case 'b':
    case 'B': return bishopMoves(state)
    case 'q':
    case 'Q': return queenMoves(state)
    case 'k':
    case 'K': return kingMoves(state)
    default: return legal_moves
  }
}

/**
 * @author Kosmo
 * 
 * @param {object} state state of the board 
 * 
 * @returns {array | null}
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
 * @param {object} state state of board
 */
export const validateLegalMovements = (state) => {
  let { selected_piece, pieces_colocation } = state

  const color_piece = getColorOfPiece(selected_piece, pieces_colocation)
  let king_position = null
  if (/[k, K]/.test(pieces_colocation[selected_piece[0][selected_piece[1]]])) {
    king_position = selected_piece
  }
  else {
    king_position = findKingPosition(pieces_colocation, color_piece)
  }
  let simulated_legal_movements = null

  return exploreAllPosibleMoves(state, king_position, simulated_legal_movements)
}

/**
 * @author Kosmo
 * 
 * @param {Array<Array<string>>} pieces_colocation 
 * @param {'W'||'B'} color_piece 
 * 
 * @returns {[number, number]}
 */
const findKingPosition = (pieces_colocation, color_piece) => {
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
 * @param {object} state 
 * @param {[number, number]} king_position 
 * 
 * @returns {Array<Array<boolean>>}
 */
const exploreAllPosibleMoves = (state, king_position) => {
  let { selected_piece, pieces_colocation, legal_moves } = state
  let simulated_legal_movements = null
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (legal_moves[i][j]) {
        const last_position = pieces_colocation[i][j]
        pieces_colocation[i][j] = pieces_colocation[selected_piece[0]][selected_piece[1]]
        pieces_colocation[selected_piece[0]][selected_piece[1]] = ''
        if (king_position[0] === selected_piece[0] && king_position[1] === selected_piece[1]) {
          king_position = [i, j]
        }
        simulated_legal_movements = getAllColorLegalMoves({ ...state, selected_piece: [i, j] })

        if (simulated_legal_movements[king_position[0]][king_position[1]]) {
          legal_moves[i][j] = false
        }
        pieces_colocation[selected_piece[0]][selected_piece[1]] = pieces_colocation[i][j]
        pieces_colocation[i][j] = last_position

        if (king_position[0] === i && king_position[1] === j) {
          king_position = [selected_piece[0], selected_piece[1]]
        }
      }
    }
  }
  return legal_moves
}

/**
 * @author Kosmo
 *  
 * @description Returns a color of a piece in a specific square
 * 
 * @param {[number, number]} piece piece coordinates
 * @param {Array<Array<string>>} board pieces colocation in board
 * @param {number} plusXAxis number desplacement in x axis
 * @param {number} plusYAxis number desplacement in y axis
 * 
 * @returns {string || undefined}
 */
export const getColorOfPiece = (piece, board, plusXAxis = 0, plusYAxis = 0) => {
  if (/[A-Z]/.test(board[piece[0] + plusXAxis][piece[1] + plusYAxis])) {
    return 'W'
  }
  else if (/[a-z]/.test(board[piece[0] + plusXAxis][piece[1] + plusYAxis])) {
    return 'B'
  }
}

/**
 * @author Kosmo
 * 
 * @param {[number, number]} piece piece coordinates
 * @param {Array<Array<string>>} board pieces colocation in board
 * @param {number} plusXAxis number desplacement in x axis
 * @param {number} plusYAxis number desplacement in y axis
 * 
 * @returns {boolean}
 * 
 */
export const isSquareEmpty = (piece, board, plusXAxis, plusYAxis) => {
  return board[piece[0] + plusXAxis][piece[1] + plusYAxis] === ''
}

/**
 * @author Kosmo
 * 
 * @param {[number, number]} piece piece coordinates 
 * @param {number} plusXAxis addition to x axis in the piece's coordinates
 * @param {number} plusYAxis addition to y axis in the piece's coordinates
 * 
 * @returns {boolean}
 */
export const isInBoard = (piece, plusXAxis, plusYAxis) => {
  return piece[0] + plusXAxis < 8 && piece[0] + plusXAxis >= 0 &&
    piece[1] + plusYAxis < 8 && piece[1] + plusYAxis >= 0
}

/**
 * @author Kosmo
 * 
 * @returns {Array<Array<boolean>>}
 */
export const buildEmptyArrayOfLegalMoves = () => {
  let legal_moves = []

  for (let i = 0; i < 8; i++) {
    legal_moves[i] = []
    for (let j = 0; j < 8; j++) {
      legal_moves[i][j] = false
    }
  }

  return legal_moves
}

/**
 * @author Kosmo
 * 
 * @param {object} state object with the board data
 * 
 * @returns {Array<Array<boolean>>} array of booleans with the legal movements of all pieces of an color
 */
export const getAllColorLegalMoves = (state) => {
  const { selected_piece, pieces_colocation } = state
  const color_piece = getColorOfPiece(selected_piece, pieces_colocation)
  let legal_moves = buildEmptyArrayOfLegalMoves()
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const color_square_piece = getColorOfPiece([i, j], pieces_colocation)
      if (color_square_piece !== color_piece && color_square_piece !== undefined) {
        legal_moves = prepareLegalMoves({ ...state, legal_moves, selected_piece: [i, j] })
      }
    }
  }
  return legal_moves
}

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


const comprobateExistenceOfLegalMove = (legal_moves) => {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (legal_moves[i][j] === true) {
        return true
      }
    }
  }
  return false
}
