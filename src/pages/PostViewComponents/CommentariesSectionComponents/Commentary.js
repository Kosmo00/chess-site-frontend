import React from 'react'

// react-bootstrap components
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Media from 'react-bootstrap/Media';

const Commentary = ({ body, User }) => {
  return (
    <Row className='mt-3 justify-content-center'>
      <Col xs='10' lg='12'>
        <Card>
          <Media className="m-2">
            <img
              width={64}
              height={64}
              className='mr-4'
              src='props.profile'
              alt='User Profile'
            />
            <Media.Body>
              <h5>{User.nick}</h5>
              <p>{body}</p>
            </Media.Body>
          </Media>
        </Card>
      </Col>
    </Row>
  )
}

export default Commentary

