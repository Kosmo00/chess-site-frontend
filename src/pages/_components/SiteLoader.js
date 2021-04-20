import React from 'react'

import { PulseLoader } from 'react-spinners'

// react-bootstrap components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

function SiteLoader() {
  return (
    <Container fluid className='vh-100 d-flex align-items-center justify-content-center'>
      <Row>
        <PulseLoader color='purple' size='3rem' />
      </Row>
    </Container>
  )
}

export default SiteLoader
