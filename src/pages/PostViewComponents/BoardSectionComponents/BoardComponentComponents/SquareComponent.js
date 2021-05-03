import React, { useContext, useState, useEffect } from 'react'

// chess-site components
import PieceComponent from './PieceComponent'

// chess-site contexts
import { BoardContext } from '../../BoardSection'

const SquareComponent = ({ color, posX, posY, width }) => {

  const boardContext = useContext(BoardContext)
  const { boardState, boardDispatch } = boardContext

  const { pieces_colocation, legal_moves, selected_piece } = boardState
  const allow_move = legal_moves[posX][posY]
  const own_piece = pieces_colocation[posX][posY]

  const [background, setBackground] = useState(color)

  useEffect(() => {
    if (allow_move && own_piece !== '') {
      setBackground(`radial-gradient(${color} 50%, lightgreen 100%`)
    }
    else if (allow_move) {
      setBackground(`radial-gradient(${color} 5%, green 15%, ${color} 20%)`)
    }
    else {
      setBackground(color)
    }
  }, [color, own_piece, allow_move])

  const handleDrop = (ev) => {
    ev.preventDefault()
    boardDispatch({ type: 'event', value: 'mouse up' })
    boardDispatch({ type: 'press square', value: { posX: posX, posY: posY } })
  }

  const handleMouseDown = () => {
    boardDispatch({ type: 'event', value: 'click' })
    boardDispatch({ type: 'press square', value: { posX: posX, posY: posY } })
  }
  const handleDrag = () => {
    if (selected_piece === null) {
      boardDispatch({ type: 'event', value: 'drag' })
      boardDispatch({ type: 'press square', value: { posX: posX, posY: posY } })
    }
  }

  return (
    <div
      onDrop={ev => handleDrop(ev)}
      onDragOver={ev => {
        ev.preventDefault()
      }}
      onDrag={() => handleDrag()}
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
