import { isSquareEmpty, prepareLegalMoves, buildEmptyArrayOfLegalMoves, getPiece } from './utils'
import { comprobateCheckMate } from './pieces-moves/king'
import MoveNotation from './utils/MoveNotation'

export const annotateMove = (state, new_square, special_move) => {
  let move
  switch (special_move) {
    case 'KS':
      move = '0-0'
      break
    case 'QS':
      move = '0-0-0'
      break
    default:
      move = annotate(state, new_square)
  }
  if (!state.cursor.children_set.has(move)) {
    state.cursor.children_set.add(move)
    const new_move = new MoveNotation(generateFen(state), move,
      createEasyCoordinates(state.selected_piece, new_square), state.cursor)
    state.cursor.children_array.push(new_move)
    state.cursor = new_move
  }
  else {
    state.cursor = findVariant(state.cursor.children_array, move)
  }
}

export const overwriteMove = (state, new_square) => {

}

export const insertVariant = (state, new_square) => {

}

export const deleteVariant = (state, new_square) => {

}

/**
 * @author Kosmo
 * 
 * @param {object} state board state
 * 
 * @returns {string} position FEN notation
 */
const generateFen = (state) => {
  const { ap_square, turn, pieces_colocation, n_move } = state
  const column = 'abcdefgh'
  let fen = []
  fen.push(generateFenBoard(pieces_colocation))
  fen.push(turn === 1 ? 'w' : 'b')
  fen.push('KQkq')
  fen.push(ap_square === null ? '-' : column[ap_square[1]] + (8 - ap_square[0]))
  fen.push('1')
  fen.push(n_move)
  return fen.join(' ')
}

/**
 * @author Kosmo
 * 
 * @param {Array<Array<string>>} board 
 * 
 * @returns {string} FEN board generated
 */
export const generateFenBoard = board => {
  let fen_board = ''
  for (let i = 0; i < 8; i++) {
    let count_free_squares = 0;
    for (let j = 0; j < 8; j++) {
      if (isSquareEmpty([i, j], board)) {
        count_free_squares++
      }
      else {
        if (count_free_squares > 0) {
          fen_board += count_free_squares
          count_free_squares = 0
        }
        fen_board += board[i][j]
      }
    }
    if (count_free_squares > 0) {
      fen_board += count_free_squares
    }
    if (i < 7) {
      fen_board += '/'
    }
  }
  return fen_board
}

/**
 * @author Kosmo
 * 
 * @param {object} state board state
 * @param {Array<number>} new_square new square coordinates
 * 
 * @returns {string} move notation
 */
const annotate = (state, new_square) => {
  const { pieces_colocation, check_square } = state
  const column = 'abcdefgh'
  let move_notation = ''
  const piece = getPiece(pieces_colocation, new_square)
  if (piece.toUpperCase() !== 'P' && piece.toUpperCase() !== 'S') {
    move_notation += piece.toUpperCase()
    move_notation += addNecesaryLocation(state, new_square)
    move_notation += addCaptureNotation(state, new_square)
  }
  else {
    move_notation += addCaptureNotation(state, new_square)
  }
  move_notation += column[new_square[1]] + (8 - new_square[0])

  if (check_square !== null) {
    if (comprobateCheckMate(state)) {
      move_notation += '#'
    }
    else {
      move_notation += '+'
    }
  }
  return move_notation
}

/**
 * @author Kosmo
 * 
 * @param {Array<MoveNotation>} variants 
 * @param {string} move 
 * 
 * @returns {MoveNotation | undefined}
 */
const findVariant = (variants, move) => {
  for (let i = 0; i < variants.length; i++) {
    if (variants[i].move === move) {
      return variants[i]
    }
  }
}

/**
 * @author Kosmo
 * 
 * @description comprobate a piece capture movement and return the capture notation
 * 
 * @param {object} state board state
 * @param {[number, number]} new_square square of the moved piece
 * 
 * @returns {string} capture notation
 */
const addCaptureNotation = (state, new_square) => {
  const { selected_piece, cursor, pieces_colocation } = state
  const previousBoard = cursor.setBoardToArray()
  const ap = cursor.getAPCapture()

  const column = 'abcdefgh'
  let captureNotation = ''

  if ((previousBoard[new_square[0]][new_square[1]] !== '' ||
    (getPiece(previousBoard, selected_piece).toUpperCase() === 'P' && ap !== null &&
      ap[0] === new_square[0] && ap[1] === new_square[1])) || (
      getPiece(previousBoard, selected_piece).toUpperCase() === 'S')) {

    if ((getPiece(pieces_colocation, new_square).toUpperCase() === 'P') ||
      (getPiece(pieces_colocation, new_square).toUpperCase() === 'S')) {
      captureNotation += column[selected_piece[1]]
    }
    captureNotation += 'x'
  }
  return captureNotation
}

/**
 * @author Kosmo
 * 
 * @param {object} state board state
 * @param {[number, number]} new_square square of the moved piece
 * 
 * @returns {string} location necesary for the moved piece
 */
const addNecesaryLocation = (state, new_square) => {
  const posibilities = getCandidatePiecesToAnSquare(state, new_square)
  let column = 'abcdefgh'
  let location = ''
  if (posibilities[0]) {
    location += column[state.selected_piece[1]]
  } if (posibilities[1]) {
    location += (8 - state.selected_piece[0])
  }
  return location
}

/**
 * @author Kosmo
 * 
 * @param {object} state board state
 * @param {[number, number]} new_square square of the moved piece
 * 
 * @returns {[boolean, boolean]} locate data which need to show
 */
const getCandidatePiecesToAnSquare = (state, new_square) => {
  const { pieces_colocation, selected_piece } = state
  changeColor(state, new_square)
  const posible_locations = prepareLegalMoves({ ...state, selected_piece: new_square, legal_moves: buildEmptyArrayOfLegalMoves() })
  changeColor(state, new_square)
  const piece_moved = pieces_colocation[new_square[0]][new_square[1]]

  let posibilities = [false, false]
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (i === selected_piece[0] && j === selected_piece[1]) {
        continue
      }
      if (i === new_square[0] && j === new_square[1]) {
        continue
      }
      if (posible_locations[i][j] === true && pieces_colocation[i][j] === piece_moved) {
        if (i === selected_piece[0]) {
          posibilities[0] = true
        }
        else if (j === selected_piece[1]) {
          posibilities[1] = true
        }
        else if (posibilities[1] === false) {
          posibilities[0] = true
        }
      }
    }
  }
  return posibilities
}

/**
 * @author Kosmo
 * 
 * @description Changes the square piece color
 * 
 * @param {object} state board state, should be passed by reference
 * @param {[number, number]} square Square of a piece
 */
const changeColor = (state, square) => {
  const { pieces_colocation } = state
  if (/[A-Z]/.test(state.pieces_colocation[square[0]][square[1]])) {
    pieces_colocation[square[0]][square[1]] = pieces_colocation[square[0]][square[1]].toLowerCase()
  }
  else {
    pieces_colocation[square[0]][square[1]] = pieces_colocation[square[0]][square[1]].toUpperCase()
  }
}

/**
 * @author Kosmo
 * 
 * @param {[number, number]} last_square 
 * @param {[number, number]} new_square 
 * 
 * @returns {string}
 */
const createEasyCoordinates = (last_square, new_square) => {
  const column = 'abcdefgh'
  let easy_moves = ''

  easy_moves += column[last_square[1]] + (8 - last_square[0])
  easy_moves += column[new_square[1]] + (8 - new_square[0])

  return easy_moves
}
