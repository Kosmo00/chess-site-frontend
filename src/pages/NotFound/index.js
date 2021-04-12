import React from 'react'

// react-bootstrap components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const NotFound = () => {
  return (
    <Container fluid className='vh-100 d-flex align-items-center justify-content-center'>
      <Row>
        <p className='display-4'>Ups
          <span className='display-1'> 404</span>
          <span className='display-3'> Not Found</span>
        </p>
      </Row>
    </Container>
  )
}

export default NotFound
