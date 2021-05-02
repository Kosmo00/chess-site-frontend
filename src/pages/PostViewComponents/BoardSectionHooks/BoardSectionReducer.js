import React, { useReducer } from 'react'

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
  turn: 1
}

const boardReducer = (state, action) => {
  switch (action.type) {
    case 'press square':
      return { ...state, ...selectAPiece(state, action.value.posX, action.value.posY) }
    default:
      return
  }
}

const useBoardSectionReducer = () => {
  const [boardState, boardDispatch] = useReducer(boardReducer, boardInitialState)
  return { boardState, boardDispatch }
}


const selectAPiece = (state, posX, posY) => {
  let { selected_piece, turn, pieces_colocation } = state
  if (selected_piece === null && pieces_colocation[posX][posY] !== '') {
    if ((/[A-Z]/.test(pieces_colocation[posX][posY]) && turn === 1) || (/[a-z]/.test(pieces_colocation[posX][posY]) && turn === -1)) {
      selected_piece = []
      selected_piece[0] = posX
      selected_piece[1] = posY
    }
  }
  else if (selected_piece !== null) {
    if ((/[A-Z]/.test(pieces_colocation[posX][posY]) && turn === 1) || (/[a-z]/.test(pieces_colocation[posX][posY]) && turn === -1)) {
      selected_piece[0] = posX
      selected_piece[1] = posY
    }
    else {
      pieces_colocation[posX][posY] = state.pieces_colocation[selected_piece[0]][selected_piece[1]]
      pieces_colocation[selected_piece[0]][selected_piece[1]] = ''
      turn *= -1
      selected_piece = null
    }
  }
  console.log(selected_piece, turn)
  return { selected_piece, turn, pieces_colocation }
}

export default useBoardSectionReducer