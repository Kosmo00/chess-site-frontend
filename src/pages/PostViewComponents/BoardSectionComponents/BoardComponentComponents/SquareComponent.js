import React from 'react'

const SquareComponent = ({ color, children, posX, posY, width, height }) => {
  return (
    <div style={{
      backgroundColor: color,
      width: width,
      height: width
    }}>
      {children}
    </div>
  )
}

export default SquareComponent
