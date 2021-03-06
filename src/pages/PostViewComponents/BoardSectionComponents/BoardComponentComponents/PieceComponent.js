import React, { useState } from 'react'
import PropTypes from 'prop-types'

const PieceComponent = ({ square_piece, width }) => {

  const [opacity, setOpacity] = useState(1)

  const renderPiece = () => {
    const DIR = '/assets/chess-pieces/'
    switch (square_piece) {
      case 'r': return `${DIR}black_rook.svg`
      case 'n': return `${DIR}black_knight.svg`
      case 'b': return `${DIR}black_bishop.svg`
      case 'q': return `${DIR}black_queen.svg`
      case 'k': return `${DIR}black_king.svg`
      case 'p': return `${DIR}black_pawn.svg`
      case 'R': return `${DIR}white_rook.svg`
      case 'N': return `${DIR}white_knight.svg`
      case 'B': return `${DIR}white_bishop.svg`
      case 'Q': return `${DIR}white_queen.svg`
      case 'K': return `${DIR}white_king.svg`
      case 'P': return `${DIR}white_pawn.svg`
      default: return ''
    }
  }

  return (
    <img
      className='piece'
      src={renderPiece()}
      alt={square_piece}
      width={width}
      height={width}
      style={{ cursor: 'grab', opacity: opacity }}
      onDrag={() => {
        setOpacity(0)
      }}
      onDragEnd={() => {
        setOpacity(1)
      }}
      draggable={true}
    />
  )
}

PieceComponent.propTypes = {
  square_piece: PropTypes.string.isRequired,
  width: PropTypes.number
}

export default React.memo(PieceComponent)
