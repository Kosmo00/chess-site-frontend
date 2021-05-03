import React, { useContext, useState, useEffect } from 'react'

// chess-site components
import PieceComponent from './PieceComponent'

// chess-site contexts
import { BoardContext } from '../../BoardSection'

const SquareComponent = ({ color, posX, posY, width }) => {

  const boardContext = useContext(BoardContext)
  const { boardState, boardDispatch } = boardContext

  const { pieces_colocation, legal_moves } = boardState

  const [background, setBackground] = useState(color)

  useEffect(() => {
    if(legal_moves[posX][posY] && pieces_colocation[posX][posY] !== ''){
      setBackground(`radial-gradient(${color} 50%, lightgreen 100%`)
    }
    else if(legal_moves[posX][posY]){
      setBackground(`radial-gradient(${color} 5%, green 15%, ${color} 20%)`)
    }
    else{
      setBackground(color)
    }
  }, [color, legal_moves[posX][posY], posX, posY, pieces_colocation[posY][posX]])

  const movePieceEvent = () => {
    boardDispatch({ type: 'event', value: 'mouse up' })
    boardDispatch({ type: 'press square', value: { posX: posX, posY: posY } })
  }

  const handleMouseDown = () => {
    boardDispatch({ type: 'event', value: 'click' })
    boardDispatch({ type: 'press square', value: { posX: posX, posY: posY } })
  }

  return (
    <div
      onDrop={ev => {
        ev.preventDefault()
        movePieceEvent()
      }}
      onDragOver={ev => ev.preventDefault()}
      onMouseDown={() => handleMouseDown()}
      style={{
        background: background,
        width: width,
        height: width
      }}>
      {
        pieces_colocation[posX][posY] !== ''
        && <PieceComponent square_piece={pieces_colocation[posX][posY]} width={width} posX={posX} posY={posY} />
      }
    </div>
  )
}

export default SquareComponent
