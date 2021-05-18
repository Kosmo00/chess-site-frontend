import React from 'react'

import PieceComponent from './PieceComponent'

const SquarePieceSelectionComponent = ({ background, width, piece, posX, posY, action }) => {
  return (
    <div
      className='d-flex align-items-center justify-content-center'
      style={{
        background: background,
        width: width,
        height: width
      }}
      onClick={() => action(piece)}
    >
      {
        piece
        && <PieceComponent square_piece={piece} width={width} posX={posX} posY={posY} />
      }
    </div>
  )
}

export default SquarePieceSelectionComponent
