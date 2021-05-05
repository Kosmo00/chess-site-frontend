import React from 'react'
import PropTypes from 'prop-types'

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

NotationComponent.propTypes = {
  height: PropTypes.number
}

export default React.memo(NotationComponent)
