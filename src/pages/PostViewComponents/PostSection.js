import React from 'react'
import PropTypes from 'prop-types'

// react-bootstrap components
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const propTypes = {
  post: PropTypes.object.isRequired
}

const PostSection = ({ post }) => {
  return (
    <section id='post'>
      <Row className='justify-content-center'>
        <Col xs={10} lg={12}>
          <Card>
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
    </section>
  )
}

PostSection.propTypes = propTypes

export default PostSection
