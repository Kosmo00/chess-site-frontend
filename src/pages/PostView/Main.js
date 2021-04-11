import React from 'react'

// react-bootstrap components
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// chess-site components
import Commentary from './components/Commentary'

const Main = ({ post, commentaries }) => {
  return (
    <Container id='publication' fluid>
      <Row className='justify-content-center'>
        <Col xs='10' md='12'>
          <Card className="mt-5">
            <Card.Header>
              <Card.Title as='h2'>
                {post.title}
              </Card.Title>
              <Card.Subtitle>
                {post.createdAt}
              </Card.Subtitle>
            </Card.Header>
            <Card.Body>
              {post.game}
            </Card.Body>
          </Card>
        </Col>
      </Row>
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
    </Container>
  )
}

export default Main
