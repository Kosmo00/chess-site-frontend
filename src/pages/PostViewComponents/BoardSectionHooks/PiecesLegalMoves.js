import { prepareLegalMoves } from './BoardSectionReducer'

const legal_movements = {
  standart_chess: {
    pawnMoves: (state) => {
      let { selected_piece, pieces_colocation, legal_moves } = state
      const color_piece = getColorOfPiece(selected_piece, pieces_colocation)
      let direction = 1
      let initial_position = 1
      if (color_piece === 'W') {
        direction = -1
        initial_position = 6
      }
      if (isInBoard(selected_piece, 1 * direction, 1)) {
        const square_color_piece = getColorOfPiece(selected_piece, pieces_colocation, 1 * direction, 1)
        if (square_color_piece !== color_piece && square_color_piece !== undefined) {
          legal_moves[selected_piece[0] + 1 * direction][selected_piece[1] + 1] = true
        }
      }
      if (isInBoard(selected_piece, 1 * direction, -1)) {
        const square_color_piece = getColorOfPiece(selected_piece, pieces_colocation, 1 * direction, -1)
        if (square_color_piece !== color_piece && square_color_piece !== undefined) {
          legal_moves[selected_piece[0] + 1 * direction][selected_piece[1] - 1] = true
        }
      }
      let square_color_piece = getColorOfPiece(selected_piece, pieces_colocation, 1 * direction, 0)
      if (square_color_piece === undefined) {
        legal_moves[selected_piece[0] + 1 * direction][selected_piece[1]] = true
        square_color_piece = getColorOfPiece(selected_piece, pieces_colocation, 2 * direction, 0)
        if (square_color_piece === undefined && initial_position === selected_piece[0]) {
          legal_moves[selected_piece[0] + 2 * direction][selected_piece[1]] = true

        }
      }
      return legal_moves
    },
    knigthMoves: (state) => {
      let { selected_piece, pieces_colocation, legal_moves } = state
      const color_piece = getColorOfPiece(selected_piece, pieces_colocation)

      for (let i = -2; i < 3; i++) {
        for (let j = -2; j < 3; j++) {
          if (Math.abs(i) === Math.abs(j) || i === 0 || j === 0) {
            continue;
          }
          if (!isInBoard(selected_piece, i, j) || color_piece === getColorOfPiece(selected_piece, pieces_colocation, i, j)) {
            continue;
          }
          legal_moves[selected_piece[0] + i][selected_piece[1] + j] = true
        }
      }
      return legal_moves
    },
    bishopMoves: (state) => {
      let { selected_piece, pieces_colocation, legal_moves } = state
      const color_piece = getColorOfPiece(selected_piece, pieces_colocation)
      for (let j = -1; j < 2; j += 2) {
        for (let k = -1; k < 2; k += 2) {
          for (let i = 1; i < 8; i++) {
            const in_board = isInBoard(selected_piece, i * j, i * k)

            if (!in_board) {
              break;
            }
            const square_empty = isSquareEmpty(selected_piece, pieces_colocation, i * j, i * k)
            const square_color_piece = getColorOfPiece(selected_piece, pieces_colocation, i * j, i * k)
            if (square_color_piece !== color_piece) {
              legal_moves[selected_piece[0] + i * j][selected_piece[1] + i * k] = true
            }
            if (!square_empty) {
              break
            }
          }
        }
      }
      return legal_moves
    },
    rookMoves: (state) => {
      let { selected_piece, pieces_colocation, legal_moves } = state
      const color_piece = getColorOfPiece(selected_piece, pieces_colocation)
      for (let j = -1; j < 2; j += 2) {
        for (let i = 1; i < 8; i++) {
          const in_board = isInBoard(selected_piece, i * j, 0)
          if (!in_board) {
            break;
          }
          const square_empty = isSquareEmpty(selected_piece, pieces_colocation, i * j, 0)
          const square_color_piece = getColorOfPiece(selected_piece, pieces_colocation, i * j, 0)
          if (square_color_piece !== color_piece) {
            legal_moves[selected_piece[0] + i * j][selected_piece[1] + 0] = true
          }
          if (!square_empty) {
            break
          }
        }
        for (let i = 1; i < 8; i++) {
          const in_board = isInBoard(selected_piece, 0, i * j)
          if (!in_board) {
            break;
          }
          const square_empty = isSquareEmpty(selected_piece, pieces_colocation, 0, i * j)
          const square_color_piece = getColorOfPiece(selected_piece, pieces_colocation, 0, i * j)
          if (square_color_piece !== color_piece) {
            legal_moves[selected_piece[0]][selected_piece[1] + i * j] = true
          }
          if (!square_empty) {
            break
          }
        }
      }
      return legal_moves
    },
    queenMoves: (state) => {
      state.legal_moves = legal_movements.standart_chess.bishopMoves(state)
      state.legal_moves = legal_movements.standart_chess.rookMoves(state)

      return state.legal_moves
    },
    kingMoves: (state) => {
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
    },
    comprobateCheck: (state) => {
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
    },
    validateLegalMovements: (state) => {
      let { selected_piece, pieces_colocation, legal_moves } = state

      const color_piece = getColorOfPiece(selected_piece, pieces_colocation)
      let king_position = null

      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          const color_square_piece = getColorOfPiece([i, j], pieces_colocation)
          if (/[k, K]/.test(pieces_colocation[i][j]) && color_square_piece === color_piece) {
            king_position = [i, j]
          }
        }
      }

      let simulated_legal_movements = null

      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          if (legal_moves[i][j]) {
            const last_position = pieces_colocation[i][j]
            pieces_colocation[i][j] = pieces_colocation[selected_piece[0]][selected_piece[1]]
            pieces_colocation[selected_piece[0]][selected_piece[1]] = ''
            simulated_legal_movements = getAllColorLegalMoves(state)
            if (simulated_legal_movements[king_position[0]][king_position[1]]) {
              legal_moves[i][j] = false
            }
            pieces_colocation[selected_piece[0]][selected_piece[1]] = pieces_colocation[i][j]
            pieces_colocation[i][j] = last_position
          }
        }
      }
      return legal_moves
    }
  }
}

const getColorOfPiece = (piece, board, plusXAxis = 0, plusYAxis = 0) => {
  if (/[A-Z]/.test(board[piece[0] + plusXAxis][piece[1] + plusYAxis])) {
    return 'W'
  }
  else if (/[a-z]/.test(board[piece[0] + plusXAxis][piece[1] + plusYAxis])) {
    return 'B'
  }
}

const isSquareEmpty = (piece, board, plusXAxis, plusYAxis) => {
  return board[piece[0] + plusXAxis][piece[1] + plusYAxis] === ''
}

const isInBoard = (piece, plusXAxis, plusYAxis) => {
  return piece[0] + plusXAxis < 8 && piece[0] + plusXAxis >= 0 &&
    piece[1] + plusYAxis < 8 && piece[1] + plusYAxis >= 0
}

const buildArrayOfLegalMoves = () => {
  let legal_moves = []

  for (let i = 0; i < 8; i++) {
    legal_moves[i] = []
    for (let j = 0; j < 8; j++) {
      legal_moves[i][j] = false
    }
  }

  return legal_moves
}

const getAllColorLegalMoves = (state) => {
  const { selected_piece, pieces_colocation } = state
  const color_piece = getColorOfPiece(selected_piece, pieces_colocation)
  let legal_moves = buildArrayOfLegalMoves()
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

export default legal_movements