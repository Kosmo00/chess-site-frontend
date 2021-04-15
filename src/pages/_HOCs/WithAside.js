import React from 'react'

// react-bootstrap components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// chess-site components
import SiteAside from '../_components/SiteAside'

const WithAside = ({ children, id }) => {

  return (
    <Container fluid id={id}>
      <Row>
        <Col lg={9} xl={{ span: 8, offset: 1 }} className='mt-5'>
          {children}
        </Col>
        <Col lg={3} className='mt-5'>
          <SiteAside />
        </Col>
      </Row>
    </Container>
  )
}

export default WithAside