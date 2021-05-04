import React, { useContext, useState, useEffect } from 'react'

// chess-site components
import PieceComponent from './PieceComponent'

// chess-site contexts
import { BoardContext } from '../../BoardSection'

const SquareComponent = ({ color, posX, posY, width }) => {

  const boardContext = useContext(BoardContext)
  const { boardState, boardDispatch } = boardContext

  const { pieces_colocation, legal_moves, selected_piece, check_square } = boardState
  const allow_move = legal_moves[posX][posY]
  const atacked_piece = pieces_colocation[posX][posY]
  // Get the selected piece data
  const posSPieceX = selected_piece === null ? null : selected_piece[0]
  const posSPieceY = selected_piece === null ? null : selected_piece[1]
  // Get the checked king square data
  const pos_c_piece_x = check_square === null ? null : check_square[0]
  const pos_c_piece_y = check_square === null ? null : check_square[1]

  const [background, setBackground] = useState(color)


  useEffect(() => {
    if (allow_move && atacked_piece !== '') {
      setBackground(`radial-gradient(${color} 50%, #4CC054 100%`)
    }
    else if (allow_move) {
      setBackground(`radial-gradient(${color} 5%, #2EAA36 15%, ${color} 20%)`)
    }
    else if (posX === posSPieceX && posY === posSPieceY) {
      setBackground(`radial-gradient(${color} 50%, #4B64A4 100%`)
    }
    else if (posX === pos_c_piece_x && posY === pos_c_piece_y) {
      setBackground(`radial-gradient(${color} 50%, red 100%`)
    }
    else {
      setBackground(color)
    }
  }, [color, atacked_piece, allow_move, posSPieceX, posSPieceY, posX, posY, pos_c_piece_x, pos_c_piece_y])

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
      className='d-flex align-items-center justify-content-center'
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
