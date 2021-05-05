import React from 'react'
import PropTypes from 'prop-types'

// react-bootstrap components

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const WithCenterContainer = ({ children }) => {
  return (
    <div>
      <Container fluid className='vh-100 d-flex align-items-center'>
        <Row className='vw-100 justify-content-center d-flex align-items-center'>
          {children}
        </Row>
      </Container>
    </div>
  )
}

WithCenterContainer.propTypes = {
  children: PropTypes.element.isRequired
}

export default WithCenterContainer
