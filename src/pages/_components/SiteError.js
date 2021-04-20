import React from 'react'

// react-bootstrap components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

function SiteError() {
  return (
    <Container fluid className='vh-100 d-flex align-items-center justify-content-center'>
      <Row className='d-flex flex-column text-center'>
        <div className='display-4'>Ups</div>
        <div className='display-1'> An error was ocurred... </div>
        <div className='display-3'> Try reload</div>
      </Row>
    </Container>
  )
}

export default SiteError
