import React, { useContext } from 'react'

// chess-site components
import PieceComponent from './PieceComponent'

// chess-site contexts
import { BoardContext } from '../../BoardSection'

const SquareComponent = ({ color, posX, posY, width }) => {

  const boardContext = useContext(BoardContext)
  const { boardState, boardDispatch } = boardContext

  const { pieces_colocation, legal_moves } = boardState

  const movePieceEvent = () => {
    boardDispatch({ type: 'event', value: 'mouse up' })
    boardDispatch({ type: 'press square', value: { posX: posX, posY: posY } })
  }

  return (
    <div
      onDrop={ev => {
        ev.preventDefault()
        movePieceEvent()
      }}
      onDragOver={ev => ev.preventDefault()}
      onMouseDown={() => movePieceEvent()}
      style={{
        backgroundColor: legal_moves[posX][posY] ? 'skyblue' : color,
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
