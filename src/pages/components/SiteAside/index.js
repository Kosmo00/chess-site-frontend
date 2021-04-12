import React from 'react'

// react-bootstrap components
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

// chess-site components
import SiteAds from './components/SiteAds'

const SiteAside = () => {
  return (
    <Row className='justify-content-center'>
      <Col xs={10} lg={12}>
        <SiteAds />
      </Col>
    </Row>
  )
}

export default SiteAside
