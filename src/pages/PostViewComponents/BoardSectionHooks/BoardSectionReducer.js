import { useReducer } from 'react'

import legal_movements from './PiecesLegalMoves'

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
  notation: '',
  selected_piece: null,
  turn: 1,
  event: ''
}

const boardReducer = (state, action) => {
  switch (action.type) {
    case 'press square':
      return { ...state, ...selectAPiece(state, action.value.posX, action.value.posY) }
    case 'event':
      return {...state, event: action.value}
    default:
      return
  }
}

const useBoardSectionReducer = () => {
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
    }
  }
  else if (state.selected_piece !== null) {
    if ((/[A-Z]/.test(state.pieces_colocation[posX][posY]) && state.turn === 1 && state.event !== 'mouse up') ||
      (/[a-z]/.test(state.pieces_colocation[posX][posY]) && state.turn === -1 && state.event !== 'mouse up')) {
      state.legal_moves = restartLegalMoves(state.legal_moves)
      state.selected_piece[0] = posX
      state.selected_piece[1] = posY
      state.legal_moves = prepareLegalMoves(state)
    }
    else {
      if (state.legal_moves[posX][posY]) {
        state.pieces_colocation[posX][posY] = state.pieces_colocation[state.selected_piece[0]][state.selected_piece[1]]
        state.pieces_colocation[state.selected_piece[0]][state.selected_piece[1]] = ''
        state.turn *= -1
      }
      state.selected_piece = null
      state.legal_moves = restartLegalMoves(state.legal_moves)
    }
  }

  return state
}

const prepareLegalMoves = (state) => {
  let { selected_piece, pieces_colocation, legal_moves } = state
  const { standart_chess } = legal_movements
  const { pawnMoves, knigthMoves, bishopMoves, rookMoves, queenMoves, kingMoves } = standart_chess

  switch (pieces_colocation[selected_piece[0]][selected_piece[1]]) {
    case 'p':
    case 'P': return pawnMoves(state)
    case 'r':
    case 'R': return rookMoves(state)
    case 'n':
    case 'N': return knigthMoves(state)
    case 'b':
    case 'B': return bishopMoves(state)
    case 'q':
    case 'Q': return queenMoves(state)
    case 'k':
    case 'K': return kingMoves(state)
    default: return legal_moves
  }
}

const restartLegalMoves = (legal_moves) => {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      legal_moves[i][j] = false
    }
  }
  return legal_moves
}

export default useBoardSectionReducer