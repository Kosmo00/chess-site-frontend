import React from 'react'

// react-bootstrap components
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Media from 'react-bootstrap/Media';

const Commentary = ({ body, User, children, margin_left }) => {
  return (
    <Row className='my-3 justify-content-center'>
      <Col xs={margin_left ? '10' : '12'} lg='12' className={`ml-n${margin_left}`}>
        <Card>
          <Media className='m-2'>
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
              {children}
            </Media.Body>
          </Media>
        </Card>
      </Col>
    </Row>
  )
}

export default Commentary

