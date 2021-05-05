import React from 'react'

// react-bootstrap components
import Card from 'react-bootstrap/Card'

const NotationComponent = ({ height }) => {
  return (
    <Card style={{ height: height }}>
      <Card.Header>
        Datos del juego
      </Card.Header>
      <Card.Body>
        Juego
      </Card.Body>
    </Card>
  )
}

export default React.memo(NotationComponent)
