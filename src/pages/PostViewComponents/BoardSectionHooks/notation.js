import { comprobateCheckMate, isSquareEmpty } from './utils'
import MoveNotation from './utils/MoveNotation'

export const annotateMove = (state, new_square) => {
  const move = annotate(state, new_square)
  if (!state.cursor.children_set.has(move)) {
    state.cursor.children_set.add(move)
    const new_move = new MoveNotation(move, state.n_move, 'e2e4', state.cursor, generateFen(state), state.turn === 1 ? 'b' : 'w')
    state.cursor.children_array.push(new_move)
    state.cursor = new_move
  }
  else {
    state.cursor = findVariant(state.cursor.children_array, move)
  }
  //console.log('actual move', state.cursor)
  //console.log('notation', state.notation)

  if (state.turn === -1) {
    state.n_move++
  }
}

export const overwriteMove = (state, new_square) => {

}

export const insertVariant = (state, new_square) => {

}

export const deleteVariant = (state, new_square) => {

}

export const realizeMovement = (state, new_square) => {

}

export const goBackMovement = (state) => {

}

export const goToMovement = (state) => {

}

/**
 * @author Kosmo
 * 
 * @param {object} state board state
 * 
 * @returns {string} position FEN notation
 */
const generateFen = (state) => {
  let fen = ''

  for (let i = 0; i < 8; i++) {
    let count_free_squares = 0;
    for (let j = 0; j < 8; j++) {
      if (isSquareEmpty([i, j], state.pieces_colocation)) {
        count_free_squares++
      }
      else {
        if (count_free_squares > 0) {
          fen += count_free_squares
          count_free_squares = 0
        }
        fen += state.pieces_colocation[i][j]
      }
    }
    if (count_free_squares > 0) {
      fen += count_free_squares
    }
    fen += '/'
  }
  fen += ' '
  if (state.turn === 1) {
    fen += 'b'
  }
  else {
    fen += 'w'
  }
  fen += ' '
  fen += 'KQkq '
  fen += '- '
  fen += '1 '
  fen += parseInt(state.n_move + (state.turn === -1 ? 1 : 0))

  return fen
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
  if (pieces_colocation[new_square[0]][new_square[1]].toUpperCase() !== 'P') {
    move_notation += pieces_colocation[new_square[0]][new_square[1]].toUpperCase()
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
