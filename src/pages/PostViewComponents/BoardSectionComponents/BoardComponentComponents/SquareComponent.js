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
      className='d-flex align-items-center justify-content-center'
      onMouseDown={() => boardDispatch({ type: 'press square', value: { posX: posX, posY: posY } })}
      style={{
        backgroundColor: color,
        width: width,
        height: width
      }}>
      {
        boardState.pieces_colocation[posX][posY] !== ''
        && <PieceComponent square_piece={boardState.pieces_colocation[posX][posY]} width={width} />
      }
    </div>
  )
}

export default SquareComponent
