import legal_movements from '../movements'

const queenMovements = (state) => {
  state.legal_moves = legal_movements.bishopMoves(state)
  state.legal_moves = legal_movements.rookMoves(state)

  return state.legal_moves
}

export default queenMovements