import { useReducer } from 'react'

import {
  prepareLegalMoves,
  validateLegalMovements,
  comprobateCheck,
  buildEmptyArrayOfLegalMoves,
  interpreteFen
} from './utils'

import { annotateMove } from './notation'
import MoveNotation from './utils/MoveNotation'

const tree_notation = new MoveNotation(
  'initial position',
  1,
  '',
  null,
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  'w'
)

const boardInitialState = {
  pieces_colocation: [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
  ],
  legal_moves: [
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false]
  ],
  notation: tree_notation,
  selected_piece: null,
  check_square: null,
  turn: 1,
  n_move: 1,
  cursor: tree_notation,
  event: ''
}

const boardReducer = (state, action) => {
  switch (action.type) {
    case 'press square':
      return { ...state, ...fullMovement(state, action.value.posX, action.value.posY) }
    case 'event':
      return { ...state, event: action.value }
    case 'change cursor':
      return { ...state, ...changeCursor(state, action.value) }
    default:
      return
  }
}

/**
 * Hook for boardReducer
 */
const useBoardReducer = () => {
  const [boardState, boardDispatch] = useReducer(boardReducer, boardInitialState)
  return { boardState, boardDispatch }
}

/**
 * @author Kosmo
 * 
 * @param {object} state state of the board
 * @param {MovementNotation} cursor cursor of the current position
 * 
 * @returns {object} new state for the board
 */
const changeCursor = (state, cursor) => {
  state.cursor = cursor
  interpreteFen(state, cursor.fen)
  state.selected_piece = null
  state.legal_moves = buildEmptyArrayOfLegalMoves()

  return state
}

/**
 * @author Kosmo
 * 
 * @description Manage the movements in the board
 * 
 * @param {object} state state of the board
 * @param {number} posX position x of the square who runs the movements event
 * @param {number} posY position y of the square who runs the movements event
 * 
 * @returns {object} new state for the board
 * 
 * @todo 
 * - Divide in subfunctions
 * - Add notation functionallity
 */
const fullMovement = (state, posX, posY) => {
  if (state.selected_piece === null && state.pieces_colocation[posX][posY] !== '') {
    if (validatePieceSelected(state, posX, posY)) {
      selectAPiece(state, posX, posY)
    }
  }
  else if (state.selected_piece !== null) {
    if (validatePieceSelected(state, posX, posY) && state.event !== 'mouse up') {
      if (state.selected_piece[0] === posX && state.selected_piece[1] === posY) {
        state.selected_piece = null
        state.legal_moves = buildEmptyArrayOfLegalMoves()
      }
      else {
        state.legal_moves = buildEmptyArrayOfLegalMoves()
        selectAPiece(state, posX, posY)
      }
    }
    else if (state.event) {
      move(state, posX, posY)
    }
  }

  return state
}

/**
 * @author Kosmo
 *
 * @description return true if the selected piece corresponds to the move turn, otherwise return false
 *
 * @param {object} state state of the board
 * @param {number} posX position x of the square who runs the movements event
 * @param {number} posY position y of the square who runs the movements event
 *
 */
const validatePieceSelected = (state, posX, posY) => {
  return (/[A-Z]/.test(state.pieces_colocation[posX][posY]) && state.turn === 1) ||
    (/[a-z]/.test(state.pieces_colocation[posX][posY]) && state.turn === -1)
}

/**
 * @author Kosmo
 *
 * @description Do a move
 *
 * @param {object} state state of the board
 * @param {number} posX position x of the square who runs the movements event
 * @param {number} posY position y of the square who runs the movements event
 *
 */
const move = (state, posX, posY) => {
  if (state.legal_moves[posX][posY]) {
    state.pieces_colocation[posX][posY] = state.pieces_colocation[state.selected_piece[0]][state.selected_piece[1]]
    state.pieces_colocation[state.selected_piece[0]][state.selected_piece[1]] = ''
    state.check_square = comprobateCheck(state)
    annotateMove(state, [posX, posY])
    state.turn *= -1
  }
  state.selected_piece = null
  state.legal_moves = buildEmptyArrayOfLegalMoves()
}

/**
 * @author Kosmo
 *
 * @param {object} state state of the board
 * @param {number} posX position x of the square who runs the movements event
 * @param {number} posY position y of the square who runs the movements event
 *
 */
const selectAPiece = (state, posX, posY) => {
  state.selected_piece = []
  state.selected_piece[0] = posX
  state.selected_piece[1] = posY
  state.legal_moves = prepareLegalMoves(state)
  state.legal_moves = validateLegalMovements(state)
}

export default useBoardReducer