import React from 'react'
import PropTypes from 'prop-types'

// chess-site components
import SquareComponent from './SquareComponent'

const RenderSquare = (posX, posY, width, check_square, is_legal, piece, piece_selected) => {
  const is_checked = check_square !== null ? (check_square[0] === posX && check_square[1] === posY ? true : false) : false
  const is_selected = piece_selected !== null ? (piece_selected[0] === posX && piece_selected[1] === posY ? true : false) : false
  const color = (posX + posY) % 2 ? 'sandybrown' : 'antiquewhite'
  width -= width % 8

  return <SquareComponent
    key={posX * 8 + posY}
    posX={posX}
    posY={posY}
    color={color}
    is_checked={is_checked}
    is_legal={is_legal}
    piece={piece}
    is_selected={is_selected}
    width={width / 8}
  />
}

RenderSquare.propTypes = {
  posX: PropTypes.number.isRequired,
  posY: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  check_square: PropTypes.array,
  is_legal: PropTypes.bool.isRequired,
  piece: PropTypes.string.isRequired,
  piece_selected: PropTypes
}

export default RenderSquare