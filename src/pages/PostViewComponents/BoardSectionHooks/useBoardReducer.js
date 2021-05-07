import { useReducer } from 'react'

import {
  prepareLegalMoves,
  validateLegalMovements,
  comprobateCheck,
  buildEmptyArrayOfLegalMoves,
  comprobateCheckMate
} from './utils'

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
  notation: new Map(),
  cursor: 0,
  selected_piece: null,
  check_square: null,
  turn: 1,
  event: ''
}

const boardReducer = (state, action) => {
  switch (action.type) {
    case 'press square':
      return { ...state, ...selectAPiece(state, action.value.posX, action.value.posY) }
    case 'event':
      return { ...state, event: action.value }
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

const selectAPiece = (state, posX, posY) => {
  if (state.selected_piece === null && state.pieces_colocation[posX][posY] !== '') {
    if ((/[A-Z]/.test(state.pieces_colocation[posX][posY]) && state.turn === 1) ||
      (/[a-z]/.test(state.pieces_colocation[posX][posY]) && state.turn === -1)) {
      state.selected_piece = []
      state.selected_piece[0] = posX
      state.selected_piece[1] = posY
      state.legal_moves = prepareLegalMoves(state)
      state.legal_moves = validateLegalMovements(state)
    }
  }
  else if (state.selected_piece !== null) {
    if (((/[A-Z]/.test(state.pieces_colocation[posX][posY]) && state.turn === 1) ||
      (/[a-z]/.test(state.pieces_colocation[posX][posY]) && state.turn === -1)) && state.event !== 'mouse up') {
      if (state.selected_piece[0] === posX && state.selected_piece[1] === posY) {
        state.selected_piece = null
        state.legal_moves = buildEmptyArrayOfLegalMoves()
      }
      else {
        state.legal_moves = buildEmptyArrayOfLegalMoves()
        state.selected_piece[0] = posX
        state.selected_piece[1] = posY
        state.legal_moves = prepareLegalMoves(state)
        state.legal_moves = validateLegalMovements(state)
      }

    }
    else if (state.event) {
      if (state.legal_moves[posX][posY]) {
        state.pieces_colocation[posX][posY] = state.pieces_colocation[state.selected_piece[0]][state.selected_piece[1]]
        state.pieces_colocation[state.selected_piece[0]][state.selected_piece[1]] = ''
        state.turn *= -1
        state.check_square = comprobateCheck(state)
        if (state.check_square !== null) {
          if (comprobateCheckMate(state)) {
            //alert('jaque mate')
          }
        }
      }
      state.selected_piece = null
      state.legal_moves = buildEmptyArrayOfLegalMoves()
    }
  }

  return state
}

export default useBoardReducer