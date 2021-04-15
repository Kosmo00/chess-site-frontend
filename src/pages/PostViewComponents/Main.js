import React from 'react'

// react-bootstrap components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// chess-site components
import PostSection from './PostSection'
import CommentariesSection from './CommentariesSection'
import SiteAside from '../_components/SiteAside'

const Main = ({ post, commentaries }) => {

  return (
    <Container id='publication' fluid className='mt-5'>
      <Row>
        <Col lg={9} xl={{ span: 8, offset: 1 }} className='mt-5'>
          <PostSection post={post} />
          <CommentariesSection commentaries={commentaries} />
        </Col>
        <Col lg={3} className='mt-5'>
          <SiteAside />
        </Col>
      </Row>
    </Container>
  )
}

export default Main
