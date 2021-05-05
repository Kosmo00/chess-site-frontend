import React from 'react'
import PropTypes from 'prop-types'

// chess-site components
import SquareComponent from './SquareComponent'

const RenderSquare = (posX, posY, width) => {
  const color = (posX + posY) % 2 ? 'sandybrown' : 'antiquewhite'
  width -= width % 8 + 32
  return <SquareComponent
    key={posX * 8 + posY}
    posX={posX}
    posY={posY}
    color={color}
    width={width / 8}
  />
}

RenderSquare.propTypes = {
  posX: PropTypes.number.isRequired,
  posY: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
}

export default RenderSquare