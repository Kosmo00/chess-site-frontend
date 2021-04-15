import React from 'react'

// chess-site components
import PostSection from './PostSection'
import CommentariesSection from './CommentariesSection'

// chess-site HOCs
import WithAside from '../_HOCs/WithAside'

const Main = ({ post, commentaries }) => {

  return (
    <WithAside id='publication'>
      <PostSection post={post} />
      <CommentariesSection commentaries={commentaries} />
    </WithAside>
  )
}

export default Main
