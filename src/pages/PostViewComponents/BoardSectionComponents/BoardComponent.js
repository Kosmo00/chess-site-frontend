import React from 'react'

// chess-site components
import SquareComponent from './BoardComponentComponents/SquareComponent'

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

export default BoardComponent
