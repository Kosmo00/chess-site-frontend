import React from 'react'
import PropTypes from 'prop-types'

// react-bootstrap components
import Card from 'react-bootstrap/Card'

// chess-site components
import NotationBuilder from './NotationComponentComponents/NotationBuilder'

const NotationComponent = ({ height }) => {
  return (
    <Card style={{ height: height }}>
      <Card.Header>
        Datos del juego
      </Card.Header>
      <Card.Body style={{ overflowY: 'scroll' }}>
        <NotationBuilder />
      </Card.Body>
    </Card>
  )
}

NotationComponent.propTypes = {
  height: PropTypes.number
}

export default React.memo(NotationComponent)
