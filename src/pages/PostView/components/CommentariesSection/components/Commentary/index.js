import React from 'react'

// react-bootstrap components
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Media from 'react-bootstrap/Media';

const Commentary = ({ body }) => {

  return (
    <Row className='mt-3 justify-content-center'>
      <Col xs='10' md='12'>
        <Card>
          <Media className="m-2">
            <img
              width={64}
              height={64}
              className="mr-4"
              src="props.profile"
              alt="User Profile"
            />
            <Media.Body>
              {body}
            </Media.Body>
          </Media>
        </Card>
      </Col>
    </Row>
  )
}

export default Commentary

