import React from 'react'

// react-bootstrap components
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// chess-site components
import Commentary from './components/Commentary'

const CommentariesSection = ({ commentaries }) => {
  return (
    <section className='mt-5' id='comentaries'>
        <Row className='justify-content-center'>
          <Col xs='10' md='12'>
            <h4>Commentaries</h4>
          </Col>
        </Row>

        {commentaries.map(commentary => (
          <Commentary key={commentary.id} {...commentary} />
        ))}
      </section>
  )
}

export default CommentariesSection

