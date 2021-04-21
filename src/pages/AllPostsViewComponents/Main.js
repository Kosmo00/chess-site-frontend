import React from 'react'
import { Link } from 'react-router-dom'

// react-bootstrap containers
import Card from 'react-bootstrap/Card'
import Media from 'react-bootstrap/Media'

// chess-site HOCs
import WithAside from '../_HOCs/WithAside'

const Main = ({ posts }) => {
  return (
    <WithAside id='all_posts'>
      {posts.map(post => (
        <Link key={post.id} to={`/post/${post.User.nick}/${post.title}`} className='btn mb-3'>
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
      ))}
    </WithAside>
  )
}

export default Main
