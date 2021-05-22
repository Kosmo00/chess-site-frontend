import React from 'react'

// react-bootstrap 
import Badge from 'react-bootstrap/Badge'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

// chess-site components
import PostsContainer from '../AllPostsViewComponents/PostsContainer'

const Main = ({ post_counter, user }) => {
  console.log(user)
  return (
    <Container fluid className="mt-5">
      <Row>
        <Col className='mt-5' xs={{ offset: 1, span: 10 }} xl={{ offset: 1, span: 4 }}>
          <Card>
            <Card.Body>
              <h3>{user.nick} <Badge pill className='badge-primary'>{post_counter} posts</Badge></h3>
              <p className='font'>
                name: {user.name} {user.trainer && <Badge pill className='badge-success'>trainer</Badge>}
              </p>
              <img
                height={100}
                width={100}
                src='/assets/chess-pieces/white_king.svg'
                alt='Profile'
                className='rounded-circle border'
              />
            </Card.Body>
          </Card>
        </Col>
        <Col className='mt-5' xs={{ offset: 1, span: 10 }} xl={{ offset: 0, span: 7 }}>
          <h2>Posts</h2>
          <PostsContainer posts={user.Posts} />
        </Col>
      </Row>
    </Container>
  )
}

export default Main
