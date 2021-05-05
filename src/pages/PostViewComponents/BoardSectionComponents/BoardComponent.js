import React from 'react'
import PropTypes from 'prop-types'

// chess-site components
import RenderSquare from './BoardComponentComponents/RenderSquare'

const BoardComponent = ({ width }) => {
  const maxWidth = window.innerHeight - 25
  const square = []
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      square.push(RenderSquare(i, j, Math.min(width, maxWidth)))
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
  width: PropTypes.number
}

export default React.memo(BoardComponent)
