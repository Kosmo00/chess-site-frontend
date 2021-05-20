import { useReducer } from 'react'

import {
  prepareLegalMoves,
  validateLegalMovements,
  buildEmptyArrayOfLegalMoves,
  getPiece
} from './utils'

import { comprobateCheck, validateCastle, doCastle } from './pieces-moves/king'

import { annotateMove } from './notation'
import MoveNotation from './utils/MoveNotation'
import { validateAPCapture, doAPCapture, coronate } from './pieces-moves/pawn';

const tree_notation = new MoveNotation(
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  '',
  '',
  null,
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
  castle: ['K', 'Q', 'k', 'q'],
  ap_square: null,
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
    case 'coronate':
      return { ...state, ...doCoronation(state, action.value.posX, action.value.posY, action.value.piece) }
    case 'put a piece':
    default:
      return state
  }
}

/**
 * Hook for boardReducer
 */
const useBoardReducer = () => {
  const [boardState, boardDispatch] = useReducer(boardReducer, boardInitialState)
  return { boardState, boardDispatch }
}


const doCoronation = (state, posX, posY, piece) => {
  let { pieces_colocation } = state
  pieces_colocation[posX][posY] = piece
  state.cursor.setFenBoard(state.pieces_colocation)
  state.cursor.parent.children_set.delete(state.cursor.move)
  let new_move = state.cursor.move
  new_move += `=${piece.toUpperCase()}`
  state.cursor.move = new_move
  if (state.cursor.parent.children_set.has(new_move)) {
    state = changeCursor({ ...state }, state.cursor.parent.findChildrenByMove(new_move))
    state.cursor.parent.children_array.pop()
  }
  else {
    state.cursor.parent.children_set.add(new_move)
  }
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
  state.turn = cursor.getTurn()
  state.pieces_colocation = cursor.setBoardToArray()
  state.castle = cursor.castles.split()
  state.n_move = cursor.getNumMoveToAnnote()
  state.ap_square = cursor.getAPCapture()
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
    coronate(state)
    const is_AP_capture_realized = doAPCapture(state, posX, posY)
    specialMovesValues(state, posX, posY)
    let special_move
    if (is_AP_capture_realized) { }
    else if (doCastle(state, posX, posY)) {
      special_move = (posY === 6 ? 'KS' : 'QS')
    }
    else {
      state.pieces_colocation[posX][posY] = getPiece(state.pieces_colocation, state.selected_piece)
      state.pieces_colocation[state.selected_piece[0]][state.selected_piece[1]] = ''
      state.check_square = comprobateCheck(state)
    }
    manageTurn(state)
    annotateMove(state, [posX, posY], special_move)
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
  if (getPiece(state.pieces_colocation, state.selected_piece).toUpperCase() === 'K') {
    validateCastle(state)
  }
}

/**
 * @author Kosmo
 * 
 * @param {object} state board state 
 */
const manageTurn = state => {
  if (state.turn === -1) {
    state.n_move++
  }
  state.turn *= -1
}

/**
 * @author Kosmo
 * 
 * @param {object} state board state
 * @param {number} posX pos x axis of a moved piece square
 * @param {number} posY pos y axis of a moved piece square
 */
const specialMovesValues = (state, posX, posY) => {
  const piece_moved = getPiece(state.pieces_colocation, state.selected_piece)
  const color_piece = /[A-Z]/.test(piece_moved) ? 'w' : 'b'
  state.ap_square = null
  removeCastle(state, piece_moved, color_piece)
  state.ap_square = validateAPCapture(state, posX)
}

/**
 * @author Kosmo
 * 
 * @param {object} state board state
 * @param {string} piece_moved 
 * @param {string} color_piece color of moved piece
 */
const removeCastle = (state, piece_moved, color_piece) => {
  if (piece_moved.toUpperCase() === 'K') {
    if (color_piece === 'w') {
      state.castle[0] = ''
      state.castle[1] = ''
    }
    else {
      state.castle[2] = ''
      state.castle[3] = ''
    }
  }
  if (getPiece(state.pieces_colocation, [0, 0]) !== 'r') {
    state.castle[3] = ''
  }
  if (getPiece(state.pieces_colocation, [0, 7]) !== 'r') {
    state.castle[2] = ''
  }
  if (getPiece(state.pieces_colocation, [7, 0]) !== 'R') {
    state.castle[1] = ''
  }
  if (getPiece(state.pieces_colocation, [7, 7]) !== 'R') {
    state.castle[0] = ''
  }
}

export default useBoardReducer