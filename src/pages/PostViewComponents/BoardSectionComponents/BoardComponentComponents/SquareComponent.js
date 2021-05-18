import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// chess-site components
import PieceComponent from './PieceComponent'
import CoronationComponent from './CoronationComponent'

// chess-site contexts
import { BoardContext } from '../../BoardSection'

const SquareComponent = ({ color, posX, posY, width, is_checked, piece, is_selected, is_legal }) => {

  const boardContext = useContext(BoardContext)
  const { boardState, boardDispatch } = boardContext

  const [background, setBackground] = useState(color)

  const coronate = (piece) => {
    boardDispatch({ type: 'coronate', value: { posX: posX, posY: posY, piece: piece } })
  }

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
    if (!is_selected && ((boardState.turn === 1) === (/[A-Z]/.test(piece)))) {
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
        piece
        && <PieceComponent square_piece={piece} width={width} posX={posX} posY={posY} />
      }
      {piece === 's' && <CoronationComponent width={width} is_white_piece={/[A-Z]/.test(piece)} action={coronate} />}
      {piece === 'S' && <CoronationComponent width={width} is_white_piece={/[A-Z]/.test(piece)} action={coronate} />}
    </div>
  )
}

SquareComponent.propTypes = {
  color: PropTypes.string.isRequired,
  posX: PropTypes.number.isRequired,
  posY: PropTypes.number.isRequired,
  width: PropTypes.number,
  is_checked: PropTypes.bool.isRequired,
  is_legal: PropTypes.bool.isRequired,
  is_selected: PropTypes.bool.isRequired,
  piece: PropTypes.string.isRequired
}

export default SquareComponent
