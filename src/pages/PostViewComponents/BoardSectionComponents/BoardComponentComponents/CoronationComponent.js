import React from 'react'

import Modal from 'react-bootstrap/Modal'

import SquarePieceSelectionComponent from './SquarePieceSelectionComponent'

const CoronationComponent = ({ width, is_white_piece, action }) => {
  return (
    <Modal
      style={{ width: width * 6 }}
      scrollable show onHide={() => { action(is_white_piece ? 'Q' : 'q') }}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ fontSize: width / 2 }}>
          Select a piece
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='d-flex justify-content-center' style={{ height: width + 35 }}>
        <SquarePieceSelectionComponent
          width={width}
          background={'sandybrown'}
          posX={0}
          posY={0}
          piece={is_white_piece ? 'Q' : 'q'}
          action={action}
        />
        <SquarePieceSelectionComponent
          width={width}
          background={'antiquewhite'}
          posX={1}
          posY={0}
          piece={is_white_piece ? 'R' : 'r'}
          action={action}
        />
        <SquarePieceSelectionComponent
          width={width}
          background={'sandybrown'}
          posX={2}
          posY={0}
          piece={is_white_piece ? 'B' : 'b'}
          action={action}
        />
        <SquarePieceSelectionComponent
          width={width}
          background={'antiquewhite'}
          posX={3}
          posY={0}
          piece={is_white_piece ? 'N' : 'n'}
          action={action}
        />
      </Modal.Body>
    </Modal>
  )
}

export default CoronationComponent
