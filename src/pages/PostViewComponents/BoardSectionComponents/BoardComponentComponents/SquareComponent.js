import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// chess-site components
import PieceComponent from './PieceComponent'

// chess-site contexts
import { BoardContext } from '../../BoardSection'

const SquareComponent = ({ color, posX, posY, width, is_checked, piece, is_selected, is_legal }) => {

  const boardContext = useContext(BoardContext)
  const { boardState, boardDispatch } = boardContext

  /*const { pieces_colocation, legal_moves, selected_piece, check_square } = boardState
  const allow_move = legal_moves[posX][posY]
  const atacked_piece = pieces_colocation[posX][posY]
  // Get the selected piece data
  const posSPieceX = selected_piece === null ? null : selected_piece[0]
  const posSPieceY = selected_piece === null ? null : selected_piece[1]
  // Get the checked king square data
  const pos_c_piece_x = check_square === null ? null : check_square[0]
  const pos_c_piece_y = check_square === null ? null : check_square[1]
*/
  const [background, setBackground] = useState(color)


  useEffect(() => {
    if (is_legal && piece !== '') {
      setBackground(`radial-gradient(${color} 50%, #4CC054 100%`)
    }
    else if (is_legal) {
      setBackground(`radial-gradient(${color} 5%, #2EAA36 15%, ${color} 20%)`)
    }
    else if (is_selected) {
      setBackground(`radial-gradient(${color} 50%, #4B64A4 100%`)
    }
    else if (is_checked) {
      setBackground(`radial-gradient(${color} 50%, red 100%`)
    }
    else {
      setBackground(color)
    }
  }, [color, is_legal, piece, is_selected, is_checked])

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
    if (!is_selected && ((boardState.turn === 1)===(/[A-Z]/.test(piece)))) {
      boardDispatch({ type: 'event', value: 'drag' })
      boardDispatch({ type: 'press square', value: { posX: posX, posY: posY } })
    }
  }
  console.log('asd')
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
        piece
        && <PieceComponent square_piece={piece} width={width} posX={posX} posY={posY} />
      }
    </div>
  )
}

SquareComponent.propTypes = {
  color: PropTypes.string.isRequired,
  posX: PropTypes.number.isRequired,
  posY: PropTypes.number.isRequired,
  width: PropTypes.number
}

export default SquareComponent
