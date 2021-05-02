import React, { useContext } from 'react'

// chess-site components
import PieceComponent from './PieceComponent'

// chess-site contexts
import { BoardContext } from '../../BoardSection'

const SquareComponent = ({ color, posX, posY, width }) => {

  const boardContext = useContext(BoardContext)
  const { boardState, boardDispatch } = boardContext

  return (
    <div
      onDrop={ev => {
        ev.preventDefault()
        boardDispatch({ type: 'press square', value: { posX: posX, posY: posY } })
      }}
      onDragOver={ev => ev.preventDefault()}
      onMouseDown={() => boardDispatch({ type: 'press square', value: { posX: posX, posY: posY } })}
      style={{
        backgroundColor: color,
        width: width,
        height: width
      }}>
      {
        boardState.pieces_colocation[posX][posY] !== ''
        && <PieceComponent square_piece={boardState.pieces_colocation[posX][posY]} width={width} posX={posX} posY={posY} />
      }
    </div>
  )
}

export default SquareComponent
