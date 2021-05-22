import React from 'react'
import { Link } from 'react-router-dom'

// react-bootstrap containers
import Card from 'react-bootstrap/Card'
import Media from 'react-bootstrap/Media'

const Post = ({ post }) => {
  return (
    <Link to={`/post/${post.User.nick}/${post.title}`} className='btn mb-3'>
      <Card>
        <Card.Body>
          <Media>
            <Media.Body className='text-left'>
              <h4>{post.title}</h4>
              <p className='text-justify'>{post.game}</p>
            </Media.Body>
          </Media>
        </Card.Body>
      </Card>
    </Link>
  )
}

export default Post
