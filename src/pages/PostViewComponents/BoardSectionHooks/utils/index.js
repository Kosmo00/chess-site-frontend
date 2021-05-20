import legal_movements from '../movements'
import { findKingPosition } from '../pieces-moves/king'

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

  return exploreAllPosibleMoves(state, king_position)
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
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (legal_moves[i][j]) {
        const last_position = pieces_colocation[i][j]
        pieces_colocation[i][j] = pieces_colocation[selected_piece[0]][selected_piece[1]]
        pieces_colocation[selected_piece[0]][selected_piece[1]] = ''
        if (king_position[0] === selected_piece[0] && king_position[1] === selected_piece[1]) {
          king_position = [i, j]
        }
        const simulated_legal_movements = getAllColorLegalMoves({ ...state, selected_piece: [i, j] })

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
  const posX = piece[0] + plusXAxis
  const posY = piece[1] + plusYAxis
  if (posX < 8 && posY < 8 && posX>=0 && posY >= 0) {
    if (/[A-Z]/.test(board[posX][posY])) {
      return 'W'
    }
    else if (/[a-z]/.test(board[piece[0] + plusXAxis][piece[1] + plusYAxis])) {
      return 'B'
    }
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
export const isSquareEmpty = (piece, board, plusXAxis = 0, plusYAxis = 0) => {
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

/**
 * @author Kosmo
 * 
 * @param {Array<Array<boolean>>} legal_moves 
 * @returns {boolean}
 */
export const comprobateExistenceOfLegalMove = (legal_moves) => {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (legal_moves[i][j] === true) {
        return true
      }
    }
  }
  return false
}

/**
 * Iterate all the squares and check if more than one piece of same type can ocupate the new square
 * 
 * @param {object} state state of the board
 * 
 * @returns {array<string>} array of pieces 
 */
export const comprobateAccesibility = (state) => {
  const { pieces_colocation, selected_piece } = state
  let pieces_with_accessibility = []
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (selected_piece[0] === i && selected_piece[1] === j) {
        continue;
      }
      if (pieces_colocation[i][j] === pieces_colocation[selected_piece[0]][selected_piece[1]]) {
        let legal_movements = buildEmptyArrayOfLegalMoves()
        legal_movements = prepareLegalMoves({ ...state, legal_moves: legal_movements, selected_piece: [i, j] })
        legal_movements = validateLegalMovements({ ...state, legal_movements: legal_movements, selected_piece: [i, j] })
        if (legal_movements[i][j])
          pieces_with_accessibility.push([i, j])
      }
    }
  }
  return pieces_with_accessibility
}

/**
 * @author Kosmo
 * 
 * @returns {Array<Array<boolean>>} board without pieces
 */
export const createEmptyBoard = () => {
  let empty_board = []
  for (let i = 0; i < 8; i++) {
    empty_board[i] = []
    for (let j = 0; j < 8; j++) {
      empty_board[i][j] = ''
    }
  }
  return empty_board
}

/**
 * @author Kosmo
 * 
 * @param {Array<Array<string>>} board board
 * @param {[number, number]} square 
 * 
 * @returns {string}
 */
export const getPiece = (board, square) => {
  return board[square[0]][square[1]]
}
