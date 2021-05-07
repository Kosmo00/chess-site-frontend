import React from 'react'
import PropTypes from 'prop-types'

// chess-site components
import RenderSquare from './BoardComponentComponents/RenderSquare'

const BoardComponent = ({ width, boardState }) => {
  const { legal_moves, pieces_colocation, selected_piece, check_square } = boardState
  const maxWidth = window.innerHeight - 25
  const square = []
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      square.push(RenderSquare(i, j, Math.min(width, maxWidth), check_square,
        legal_moves[i][j], pieces_colocation[i][j], selected_piece))
    }
  }
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap'
    }}>
      {square}
    </div>
  )
}

BoardComponent.propTypes = {
  width: PropTypes.number,
  boardState: PropTypes.object
}

export default React.memo(BoardComponent)
